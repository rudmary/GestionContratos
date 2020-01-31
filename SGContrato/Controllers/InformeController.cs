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
    public class InformeController : ControllerBase
    {
        private readonly MyDBContext _context;

        public InformeController(MyDBContext context)
        {
            _context = context;
        }

        // Select * from Informe
        // GET: api/Informe
        [HttpGet]
        public IEnumerable<Informe> GetInforme()
        {
            return _context.informe;
        }

        // Select * from Informe where contratoId=1
        // GET: api/Informe/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInforme([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contrato contrato;

            contrato = await _context.contrato.Include(m => m.informes).SingleOrDefaultAsync(c => c.ID == id);

            if (contrato == null)
            {
                return NotFound();
            }

            return Ok(contrato);
        }

        private async Task CrearOEditarInforme(List<Informe> informe)
        {
            List<Informe> nuevoInforme = informe.Where(x => x.ID == 0).ToList();
            List<Informe> modificarInforme = informe.Where(x => x.ID != 0).ToList();
            if (nuevoInforme.Any())
            {
                await _context.AddRangeAsync(nuevoInforme);
            }
            if (modificarInforme.Any())
            {
                _context.UpdateRange(modificarInforme);
            }
        }

        // PUT: api/Informe/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInforme([FromRoute] int id, [FromBody] Contrato contrato)
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
                await CrearOEditarInforme(contrato.informes);
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

        // POST: api/Informe
        [HttpPost]
        public async Task<IActionResult> PostInforme([FromBody] Informe informe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.informe.Add(informe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInforme", new { id = informe.ID }, informe);
        }

    // DELETE: api/Informe/5
    [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInforme([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var informe = await _context.informe.FindAsync(id);
            if (informe == null)
            {
                return NotFound();
            }

            _context.informe.Remove(informe);
            await _context.SaveChangesAsync();

            return Ok(informe);
        }

        private bool ContratoExists(int id)
        {
            return _context.informe.Any(e => e.ID == id);
        }
    }
}
