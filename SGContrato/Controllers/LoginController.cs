using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace SGContrato.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [AllowAnonymous]
        [Route("login")]
        public async Task Login(string returnUrl)
        {
            if (returnUrl == null)
            {
                //returnUrl = "https://localhost:5001";
                returnUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}";
            }
            var props = new AuthenticationProperties { RedirectUri = returnUrl };
            await HttpContext.ChallengeAsync("CAS", props);

        }
    }
    
}