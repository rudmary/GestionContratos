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
    public class TipoController : ControllerBase
    {
        private readonly MyDBContext _context;

        public TipoController(MyDBContext context)
        {
            _context = context;
        }

        // GET: api/Tipo
        [HttpGet]
        public IEnumerable<Tipo> GetTipo()
        {
            return _context.Tipo;
        }

        // GET: api/Tipo/5
        [HttpGet("{id}")]
        public IActionResult GetTipo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var seccion = _context.Seccion.Single(s => s.seccionID == id);

            var tipos = _context.Entry(seccion)
                .Collection(s => s.tipos)
                .Query()
                .ToList();

            if (tipos == null)
            {
                return NotFound();
            }

            return Ok(tipos);
        }

        // PUT: api/Tipo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipo([FromRoute] int id, [FromBody] Tipo tipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tipo.tipoID)
            {
                return BadRequest();
            }

            _context.Entry(tipo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tipo
        [HttpPost]
        public async Task<IActionResult> PostTipo([FromBody] Tipo tipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Tipo.Add(tipo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTipo", new { id = tipo.tipoID }, tipo);
        }

        // DELETE: api/Tipo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tipo = await _context.Tipo.FindAsync(id);
            if (tipo == null)
            {
                return NotFound();
            }

            _context.Tipo.Remove(tipo);
            await _context.SaveChangesAsync();

            return Ok(tipo);
        }

        private bool TipoExists(int id)
        {
            return _context.Tipo.Any(e => e.tipoID == id);
        }
    }
}