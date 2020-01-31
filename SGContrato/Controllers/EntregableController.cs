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
    public class EntregableController : ControllerBase
    {
        private readonly MyDBContext _context;

        public EntregableController(MyDBContext context)
        {
            _context = context;
        }

        // Select * from Entregable
        // GET: api/Entregable
        [HttpGet]
        public IEnumerable<Entregable> Getentregable()
        {
            return _context.entregable;
        }

        // select * 
        // GET: api/Entregable/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEntregable([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contrato contrato;

            contrato = await _context.contrato.Include(m => m.entregables).SingleOrDefaultAsync(c => c.ID == id);

            if (contrato == null)
            {
                return NotFound();
            }

            return Ok(contrato);
        }

        private async Task CrearOEditarEntregable(List<Entregable> entregable)
        {
            List<Entregable> nuevoEntregable = entregable.Where(x => x.ID == 0).ToList();
            List<Entregable> modificarEntregable = entregable.Where(x => x.ID != 0).ToList();
            if (nuevoEntregable.Any())
            {
                await _context.AddRangeAsync(nuevoEntregable);
            }
            if (modificarEntregable.Any())
            {
                _context.UpdateRange(modificarEntregable);
            }
        }

        // PUT: api/Contrato/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntregable([FromRoute] int id, [FromBody] Contrato contrato)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contrato.ID)
            {
                return BadRequest();
            }

            _context.Entry(contrato).State = EntityState.Modified;

            try
            {
                await CrearOEditarEntregable(contrato.entregables);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContratoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            //return NoContent();
            return Ok(contrato);
        }

        // POST: api/Entregable
        [HttpPost]
        public async Task<IActionResult> PostEntregable([FromBody] Entregable entregable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.entregable.Add(entregable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntregable", new { id = entregable.ID }, entregable);
        }

        // DELETE: api/Entregable/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntregable([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entregable = await _context.entregable.FindAsync(id);
            if (entregable == null)
            {
                return NotFound();
            }

            _context.entregable.Remove(entregable);
            await _context.SaveChangesAsync();

            return Ok(entregable);
        }

        private bool ContratoExists(int id)
        {
            return _context.contrato.Any(e => e.ID == id);
        }
    }
}