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
    public class RolController : ControllerBase
    {
        private readonly MyDBContext _context;

        public RolController(MyDBContext context)
        {
            _context = context;
        }

        // GET: api/Rol
        [HttpGet]
        public IEnumerable<Rol> GetRol()
        {
            return _context.rol;
        }

        // GET: api/Rol/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRol([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rol = await _context.rol.FindAsync(id);

            if (rol == null)
            {
                return NotFound();
            }

            return Ok(rol);
        }

        // PUT: api/Rol/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRol([FromRoute] int id, [FromBody] Rol rol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rol.ID)
            {
                return BadRequest();
            }

            _context.Entry(rol).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(rol);
        }

        // POST: api/Rol
        [HttpPost]
        public async Task<IActionResult> PostRol([FromBody] Rol rol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.rol.Add(rol);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRol", new { id = rol.ID }, rol);
        }

        // DELETE: api/Rol/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRol([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rol = await _context.rol.FindAsync(id);
            if (rol == null)
            {
                return NotFound();
            }

            _context.rol.Remove(rol);
            await _context.SaveChangesAsync();

            return Ok(rol);
        }

        private bool RolExists(int id)
        {
            return _context.rol.Any(e => e.ID == id);
        }
    }
}

