using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(DataContext context) : ControllerBase
    {
        private readonly DataContext _context = context;

        [HttpGet()]
        public async Task<ActionResult> GetProducts(int? limit = null, double? minPrice = null, string? sort = null, double? maxPrice = null, string? contains = null, string? keywords = null)
        {

            IQueryable<Product> query = _context.Products;

            // Apply filters based on query parameters
            if (minPrice != null)
            {
                query = query.Where(p => p.Price >= minPrice);
            }

            if (maxPrice != null)
            {
                query = query.Where(p => p.Price <= maxPrice);
            }

            if (!string.IsNullOrEmpty(contains))
            {
                query = query.Where(p => p.ItemName.ToLower().Contains(contains.ToLower()));
            }

            if (!string.IsNullOrEmpty(keywords))
            {
                string[] keywordsArray = keywords.Split(',');

                query = query.Where(p => keywordsArray.All(w =>
                 p.ProductRelatedWords.Any(prw => prw.Word.ToLower() == w.Trim().ToLower())));
            }

            if (limit != null) query = query.Take((int)limit);
            else query = query.Take(10);

            if (!string.IsNullOrEmpty(sort))
            {
                query = sort.ToLower() switch
                {
                    "price_asc" => query.OrderBy(p => p.Price),
                    "price_desc" => query.OrderByDescending(p => p.Price),
                    _ => query
                };
            }

            var products = await query.ToListAsync();

            return new JsonResult(products);
        }

    }

}
