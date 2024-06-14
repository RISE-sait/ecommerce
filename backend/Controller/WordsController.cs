using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{

    [Route("api/[controller]")]
    [ApiController]
    public class WordsController(DataContext context) : ControllerBase
    {
        private readonly DataContext _context = context;

        [HttpGet()]
        public IActionResult GetData(string? keywords, string? contains)
        {
            try
            {
                string[] words = keywords?.Split(',') ?? [];

                var query = _context.ProductRelatedWords.AsQueryable();

                if (!string.IsNullOrWhiteSpace(contains))
                {
                    query = query.Where(prw => prw.Products.Any(p => p.ItemName.ToLower().Contains(contains.ToLower())));
                }

                var wordsWithCounts = query.Select(prw => new
                {
                    prw.Word,
                    ProductCount = words.Length == 0
                            ? prw.Products.Count
                            : prw.Products.Count(p => words.All(w => p.ProductRelatedWords.Any(rw => rw.Word.ToLower() == w.Trim().ToLower())))
                })
                    .Where(wc => wc.ProductCount > 0)
                    .ToList();

                return Ok(wordsWithCounts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}