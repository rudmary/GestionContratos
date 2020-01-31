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
    public class UsersController : ControllerBase
    {
        private MyDBContext _context;

        public UsersController(MyDBContext context)
        {
            _context = context;
        }


        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostUsers([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.user.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.ID }, user);
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.user.LastAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // GET: api/Users/5
        [HttpGet]
        public async Task<IActionResult> GetUser([FromBody] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.user.SingleAsync(x => x.ID == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}

//using WebApi.Services;
