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
    public class ContratoController : ControllerBase
    {
        private readonly MyDBContext _context;

        public ContratoController(MyDBContext context)
        {
            _context = context;
        }

        // GET: api/Contrato
        [HttpGet]
        public IEnumerable<Contrato> Getcontrato()
        {
            return _context.contrato;
        }

        // GET: api/Contrato/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContrato([FromRoute] int id)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            Contrato contrato;
            
            contrato = await _context.contrato.Include( g => g.garantias).SingleOrDefaultAsync(c => c.ID == id);
            
            if (contrato == null)
            {
                return NotFound();
            }

            return Ok(contrato);
        }

        private async Task CrearOEditarGarantia(List<Garantia> garantia)
        {   
            /*
            garantia.ForEach(x =>
            {
                if (x.ID == 0) _context.Update(x);
                //else _context.Entry(x).State = EntityState.Modified;
            });
            */
            List<Garantia> nuevaGarantia = garantia.Where(x => x.ID == 0).ToList();
            List<Garantia> modificarGarantia = garantia.Where(x => x.ID != 0).ToList();
            if(nuevaGarantia.Any())
            {
                await _context.AddRangeAsync(nuevaGarantia);
            }
            if (modificarGarantia.Any())
            {
                //await _context.AddRangeAsync(modificarGarantia);
                _context.UpdateRange(modificarGarantia);
            }
        }

        // PUT: api/Contrato/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContrato([FromRoute] int id, [FromBody] Contrato contrato)
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
                await CrearOEditarGarantia(contrato.garantias);
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

        // Metodo para crear un nuevo contrato
        // POST: api/Contrato
        [HttpPost]
        public async Task<IActionResult> PostContrato([FromBody] Contrato contrato)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.contrato.Add(contrato);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContrato", new { id = contrato.ID }, contrato);
        }

        // DELETE: api/Contrato/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContrato([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contrato = await _context.contrato.FindAsync(id);
            if (contrato == null)
            {
                return NotFound();
            }

            _context.contrato.Remove(contrato);
            await _context.SaveChangesAsync();

            return Ok(contrato);
        }

        private bool ContratoExists(int id)
        {
            return _context.contrato.Any(e => e.ID == id);
        }
    }
}