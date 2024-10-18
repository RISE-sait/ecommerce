using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controller
{

    [Route("api/[controller]")]
    [ApiController]
    public class WordsController(DataContext context) : ControllerBase
    {
        [HttpGet()]
        public IActionResult GetData(string? keywords, string? contains)
        {
            try
            {

                var query = context.ProductRelatedWords.AsQueryable();

                if (!string.IsNullOrWhiteSpace(contains))
                {
                    query = query.Where(prw =>
                        prw.Products.Any(p => EF.Functions.Like(p.ItemName, "%" + contains + "%")));
                }
                
                var keywordsHashSet =
                    new HashSet<string>(keywords?.Split(',').Select(w => w.Trim()) ?? Array.Empty<string>());

                var wordsWithCounts = query.Select(prw => new
                    {
                        prw.Word,
                        ProductCount = keywordsHashSet.Count == 0
                            ? prw.Products.Count
                            : prw.Products.Count(p =>
                                keywordsHashSet.All(keyword =>
                                    p.ProductRelatedWords.Any(rw =>
                                        rw.Word == keyword))
                            )
                    })
                    .Where(wc => wc.ProductCount > 0);

                return Ok(wordsWithCounts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}