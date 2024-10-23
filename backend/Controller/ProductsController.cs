using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(DataContext context) : ControllerBase
    {
        [HttpGet()]
        public async Task<ActionResult> GetProducts(int? limit = null, double? minPrice = null, string? sort = null, double? maxPrice = null, string? contains = null, string? keywords = null)
        {

            try
            {

                IQueryable<Product> query = context.Products;
                
                if (!string.IsNullOrEmpty(contains))
                {
                    query = context.Products.FromSqlInterpolated(@$"
                SELECT * 
                FROM public.""Products""
                WHERE
                    tsvector_concat(
                        setweight(to_tsvector('english', ""ItemName""::text), 'A'),
                        setweight(to_tsvector('english', ""Description""::text), 'B')
                    ) @@ plainto_tsquery('english', {contains})
                ORDER BY
                    ts_rank(
                        tsvector_concat(
                            setweight(to_tsvector('english', ""ItemName""::text), 'A'),
                            setweight(to_tsvector('english', ""Description""::text), 'B')
                        ),
                        plainto_tsquery('english', {contains})
                    ) DESC
            ");
                }
                else
                {
                    query = context.Products;
                }

                // Apply filters based on query parameters
                if (minPrice != null)
                {
                    query = query.Where(p => p.Price >= minPrice);
                }

                if (maxPrice != null)
                {
                    query = query.Where(p => p.Price <= maxPrice);
                }

                if (!string.IsNullOrEmpty(keywords))
                {
                    var keywordsArray = keywords.Split(',')
                        .Select(w => w.Trim())
                        .Where(w => !string.IsNullOrEmpty(w)) // Filter out empty keywords
                        .ToList();

                    query = query.Where(p => keywordsArray.All(keyword =>
                            p.ProductRelatedWords.Any(prw =>
                                prw.Word == keyword)
                    ));
                }

                query = query.Take(limit ?? 10);

                query = string.IsNullOrEmpty(sort) || sort.ToLower().Equals("price_asc")
                    ? query.OrderBy(p => p.Price)
                    : query.OrderByDescending(p => p.Price);

                var products = await query.ToListAsync();

                return new JsonResult(products);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }

}
