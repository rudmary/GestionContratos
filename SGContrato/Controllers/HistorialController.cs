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
    public class HistorialController : ControllerBase
    {
        private readonly MyDBContext _context;
        public HistorialController(MyDBContext context)
        {
            _context = context;
        }

        // Select * from Historial
        // GET: api/Historial
        [HttpGet]
        public IEnumerable<Historial> GetHistorial()
        {
            return _context.historial;
        }

        // Select * from Historial where contratoId=1
        // GET: api/Historial/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHistorial([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contrato contrato;

            contrato = await _context.contrato.Include(m => m.historial).SingleOrDefaultAsync(c => c.ID == id);

            if (contrato == null)
            {
                return NotFound();
            }

            return Ok(contrato);
        }

        // PUT: api/Historial/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHistorial([FromRoute] int id, [FromBody] Contrato contrato)
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
                await _context.AddRangeAsync(contrato.historial);
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

        private bool ContratoExists(int id)
        {
            return _context.informe.Any(e => e.ID == id);
        }
    }
}