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
    public class ActaController : ControllerBase
    {
        private readonly MyDBContext _context;

        public ActaController(MyDBContext context)
        {
            _context = context;
        }

        // Select * from Acta
        // GET: api/Acta
        [HttpGet]
        public IEnumerable<Acta_Entrega_Recepcion> GetActa()
        {
            return _context.acta;
        }

        // Select * from Acta where contratoId=1
        // GET: api/Acta/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActa([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contrato contrato;

            contrato = await _context.contrato.Include(m => m.actas).SingleOrDefaultAsync(c => c.ID == id);

            if (contrato == null)
            {
                return NotFound();
            }

            return Ok(contrato);
        }

        private async Task CrearOEditarActa(List<Acta_Entrega_Recepcion> acta)
        {
            List<Acta_Entrega_Recepcion> nuevaActa = acta.Where(x => x.ID == 0).ToList();
            List<Acta_Entrega_Recepcion> modificarActa = acta.Where(x => x.ID != 0).ToList();
            if (nuevaActa.Any())
            {
                await _context.AddRangeAsync(nuevaActa);
            }
            if (modificarActa.Any())
            {
                _context.UpdateRange(modificarActa);
            }
        }

        // PUT: api/Acta/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActa([FromRoute] int id, [FromBody] Contrato contrato)
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
                await CrearOEditarActa(contrato.actas);
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

        // POST: api/Acta
        [HttpPost]
        public async Task<IActionResult> PostActa([FromBody] Acta_Entrega_Recepcion acta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.acta.Add(acta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActa", new { id = acta.ID }, acta);
        }

        // DELETE: api/Acta/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActa([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var acta = await _context.acta.FindAsync(id);
            if (acta == null)
            {
                return NotFound();
            }

            _context.acta.Remove(acta);
            await _context.SaveChangesAsync();

            return Ok(acta);
        }

        private bool ContratoExists(int id)
        {
            return _context.acta.Any(e => e.ID == id);
        }
    }
}
