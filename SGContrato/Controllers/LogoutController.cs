using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace SGContrato.Controllers
{
    [EnableCors("_casPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class LogoutController : Controller
    {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        public LogoutController(ILogger<LogoutController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }
        
        public async Task<IActionResult> Logout()
        {
            // Removes the user's auth cookie for this site and domain. 
            await HttpContext.SignOutAsync();

            // Do a full CAS logout.  
            // This removes the user's CAS auth cookie from the CAS domain.
            var redirectPath = $"{_configuration["CasBaseUrl"]}logout";
            var result = new { url = redirectPath };
            //return Redirect(redirectPath);
            return Json(result);
        }
    }
}