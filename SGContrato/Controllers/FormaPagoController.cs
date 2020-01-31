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
    public class FormaPagoController : ControllerBase
    {
        private readonly MyDBContext _context;

        public FormaPagoController(MyDBContext context)
        {
            _context = context;
        }

        // Select * from Acta
        // GET: api/Acta
        [HttpGet]
        public IEnumerable<FormaPago> GetActa()
        {
            return _context.formaPago;
        }

        // Select * from FormaPago where contratoId=1
        // GET: api/FormaPago/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFormaPago([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contrato contrato;

            contrato = await _context.contrato.Include(m => m.formaPago).SingleOrDefaultAsync(c => c.ID == id);

            if (contrato == null)
            {
                return NotFound();
            }

            return Ok(contrato);
        }

        // PUT: api/FormaPago/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFormaPago([FromRoute] int id, [FromBody] FormaPago formaPago)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != formaPago.ID)
            {
                return BadRequest();
            }

            _context.Entry(formaPago).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FormaPagoExists(id))
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

        // POST: api/FormaPago
        [HttpPost]
        public async Task<IActionResult> PostFormaPago([FromBody] FormaPago formaPago)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.formaPago.Add(formaPago);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFormaPago", new { id = formaPago.ID }, formaPago);
        }

        // DELETE: api/FormaPago/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFormaPago([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var formaPago = await _context.formaPago.FindAsync(id);
            if (formaPago == null)
            {
                return NotFound();
            }

            _context.formaPago.Remove(formaPago);
            await _context.SaveChangesAsync();

            return Ok(formaPago);
        }

        private bool FormaPagoExists(int id)
        {
            return _context.formaPago.Any(e => e.ID == id);
        }
    }
}
