using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using API.Cache;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly CityContext _context;

        public CitiesController(CityContext context)
        {
            _context = context;
        }

        // GET: api/Cities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> GetCities()
        {
            return await _context.City.ToListAsync();
        }

        //GET: api/Cities/stringQuery
        [HttpGet("{stringQuery}")]
        [Cached(600)]
        public async Task<IActionResult> GetCity(string stringQuery)
        {
            var cityList = await _context.City.ToListAsync();

            cityList = cityList.Where(city => city.Name.ToLower().StartsWith(stringQuery.ToLower())).ToList();

            if(cityList == null)
            {
                return NotFound();
            }

            return Ok(cityList);
        }
    }
}
