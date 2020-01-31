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
    public class MultaController : ControllerBase
    {
        private readonly MyDBContext _context;

        public MultaController(MyDBContext context)
        {
            _context = context;
        }

        // Select * from Multa
        // GET: api/Multa
        [HttpGet]
        public IEnumerable<Multa> GetMulta()
        {
            return _context.multa;
        }

        // Select * from Multa where contratoId=1
        // GET: api/Multa/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMulta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contrato contrato;

            contrato = await _context.contrato.Include(m => m.multas).SingleOrDefaultAsync(c => c.ID == id);

            if (contrato == null)
            {
                return NotFound();
            }

            return Ok(contrato);
        }

        private async Task CrearOEditarMulta(List<Multa> multa)
        {
            List<Multa> nuevaMulta = multa.Where(x => x.ID == 0).ToList();
            List<Multa> modificarMulta = multa.Where(x => x.ID != 0).ToList();
            if (nuevaMulta.Any())
            {
                await _context.AddRangeAsync(nuevaMulta);
            }
            if (modificarMulta.Any())
            {
                _context.UpdateRange(modificarMulta);
            }
        }

        // PUT: api/Multa/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMulta([FromRoute] int id, [FromBody] Contrato contrato)
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
                await CrearOEditarMulta(contrato.multas);
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

            return Ok(contrato);
        }

        // POST: api/Multa
        [HttpPost]
        public async Task<IActionResult> PostMulta([FromBody] Multa multa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.multa.Add(multa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMulta", new { id = multa.ID }, multa);
        }

        // DELETE: api/Multa/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMulta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var multa = await _context.multa.FindAsync(id);
            if (multa == null)
            {
                return NotFound();
            }

            _context.multa.Remove(multa);
            await _context.SaveChangesAsync();

            return Ok(multa);
        }

        private bool ContratoExists(int id)
        {
            return _context.multa.Any(e => e.ID == id);
        }
    }
}
