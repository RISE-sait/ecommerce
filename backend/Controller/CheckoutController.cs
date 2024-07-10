using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;

namespace backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController() : ControllerBase
    {
        readonly static string? envMode = Environment.GetEnvironmentVariable("ENV_MODE");

        private readonly string domain = envMode == "production" ? "https://k-sports.vercel.app" : "http://localhost:3000";

        [HttpGet()]
        public IActionResult GetData(string orderId, string email)
        {
            try
            {

                Console.WriteLine("Email: " + email);

                var sessionService = new SessionService();
                var session = sessionService.Get(orderId);

                Console.WriteLine("Email2: " + session.CustomerEmail);

                if (session.CustomerEmail != email)
                {
                    return Unauthorized("Unauthorized");
                }

                var metadata = session.Metadata;

                foreach (var kvp in metadata)
                {
                    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
                }

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
                List<CheckoutProduct> checkoutProducts = checkoutRequest.CheckoutProducts;
                string email = checkoutRequest.Email;

                DateTime deliveryDate = DateTime.UtcNow.AddDays(7);

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
                    SuccessUrl = $"{domain}/paymentsuccess?orderID={{CHECKOUT_SESSION_ID}}",
                    CancelUrl = $"{domain}/paymentfailed",
                    Metadata = new Dictionary<string, string>
                {
                    { "deliverDate", deliveryDate.ToString("o") }
                }

                };

                var service = new SessionService();
                Session session = await service.CreateAsync(options);

                return new JsonResult(new { url = session.Url });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { error = ex.Message });
            }
        }
    }

    public class CheckoutProduct
    {
        public required PriceData PriceData { get; set; }
        public long Quantity { get; set; }
    }

    public class PriceData
    {
        public required string Currency { get; set; }
        public required ProductData ProductData { get; set; }
        public long UnitAmount { get; set; }
    }

    public class ProductData
    {
        public required string Name { get; set; }
    }
}