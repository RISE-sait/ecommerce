using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;

namespace backend.Controller
{

    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController() : ControllerBase
    {
        private static readonly string? EnvMode = Environment.GetEnvironmentVariable("ENV_MODE");

        private readonly string _domain = EnvMode == "production" ? "https://k-sports.vercel.app" : "http://localhost:3000";

        [HttpGet()]
        public IActionResult GetData(string orderId, string email)
        {
            try
            {

                var sessionService = new SessionService();
                var session = sessionService.Get(orderId);

                if (session.CustomerEmail != email)
                {
                    return Unauthorized("Unauthorized");
                }

                var metadata = session.Metadata;

                var deliveryDate = Convert.ToDateTime(metadata["deliverDate"]);
                var productsUnformatted = sessionService.ListLineItems(orderId);

                var products = productsUnformatted.Select(p => new
                {
                    price = p.AmountTotal,
                    name = p.Description,
                    quantity = p.Quantity
                });

                return new JsonResult(new
                {
                    products,
                    deliveryDate
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        public class CheckoutRequest
        {
            public required List<CheckoutProduct> CheckoutProducts { get; set; }
            public required string Email { get; set; }
        }

        [HttpPost()]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] CheckoutRequest checkoutRequest)

        {
            try
            {
                var checkoutProducts = checkoutRequest.CheckoutProducts;
                var email = checkoutRequest.Email;

                var deliveryDate = DateTime.UtcNow.AddDays(7);

                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes =
                [
                    "card",
                ],
                    LineItems = checkoutProducts.Select(p => new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = p.PriceData.UnitAmount * 100,
                            Currency = p.PriceData.Currency,
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = p.PriceData.ProductData.Name,
                            },
                        },
                        Quantity = p.Quantity,
                    }).ToList(),
                    Mode = "payment",
                    CustomerEmail = email,
                    SuccessUrl = $"{_domain}/paymentsuccess?orderID={{CHECKOUT_SESSION_ID}}",
                    CancelUrl = $"{_domain}/paymentfailed",
                    Metadata = new Dictionary<string, string>
                {
                    { "deliverDate", deliveryDate.ToString("o") }
                }

                };

                var service = new SessionService();
                var session = await service.CreateAsync(options);

                return new JsonResult(new { url = session.Url });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { error = ex.Message });
            }
        }
    }

    public abstract record CheckoutProduct
    {
        public required PriceData PriceData { get; set; }
        public long Quantity { get; set; }
    }

    public abstract record PriceData
    {
        public required string Currency { get; set; }
        public required ProductData ProductData { get; set; }
        public long UnitAmount { get; set; }
    }

    public abstract record ProductData
    {
        public required string Name { get; set; }
    }
}