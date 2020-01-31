using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SGContrato.Models;

namespace SGContrato.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRolController : ControllerBase
    {
        private readonly MyDBContext _context;

        public UserRolController(MyDBContext context)
        {
            _context = context;
        }

        // GET: api/UserRol
        [HttpGet]
        public IEnumerable<UserRol> GetUserRol()
        {
            return _context.userRol;
        }

        // GET: api/UserRol/5
        [HttpGet("{id}")]
        public IActionResult GetUserRol([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userRol = _context.userRol.Where(x => x.userID == id).Include(x => x.rol).ToList();

            if (userRol == null)
            {
                return NotFound();
            }

            return Ok(userRol);
        }


        // POST: api/UserRol
        public async Task<IActionResult> PostUserRol([FromBody] UserRol userRol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            _context.userRol.Add(userRol);
            await _context.SaveChangesAsync();

            return Ok(userRol);
        }




    }
}