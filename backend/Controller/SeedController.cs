using backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[Route("api/[controller]")]
[ApiController]
public class SeedController(DataContext context) : ControllerBase
{
    [HttpGet()]
    public ActionResult Seed()
    {
        try
        {
            DbSeeder.Seed(context);

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}