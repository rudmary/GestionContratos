using AspNetCore.Security.CAS;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SGContrato.Models;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SGContrato
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string CasPolicy = "_casPolicy";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            // Configuracion de CAS para autenticacion
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.LoginPath = new PathString("/Login/login");
                    options.LogoutPath = new PathString("/logout");
                    options.AccessDeniedPath = new PathString("/access-denied");
                    options.Cookie.Name = "gContracts.AspNetCore";
                    options.Cookie.HttpOnly = false;

                    //options.Events = new CookieAuthenticationEvents
                    //{
                    //    // Add user roles to the existing identity.  
                    //    // This example is giving every user "User" and "Admin" roles.
                    //    // You can use services or other logic here to determine actual roles for your users.
                    //    OnSigningIn = context =>
                    //    {
                    //        // Use `GetRequiredService` if you have a service that is using DI or an EF Context.
                    //        // var username = context.Principal.Identity.Name;
                    //        // var userSvc = context.HttpContext.RequestServices.GetRequiredService<UserService>();
                    //        // var roles = userSvc.GetRoles(username);

                    //        // Hard coded roles.
                    //        var roles = new[] { "Admin", "ContractAdmin", "Consultor", "UAS" };

                    //        // `AddClaim` is not available directly from `context.Principal.Identity`.
                    //        // We can add a new empty identity with the roles we want to the principal. 
                    //        var identity = new ClaimsIdentity();

                    //        foreach (var role in roles)
                    //        {
                    //            identity.AddClaim(new Claim(ClaimTypes.Role, role));
                    //        }

                    //        context.Principal.AddIdentity(identity);

                    //        return Task.FromResult(0);
                    //    }
                    //};
                })
                .AddCAS(options =>
                {
                    options.CasServerUrlBase = Configuration["CasBaseUrl"];   // Set in `appsettings.json` file.
                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.ForwardSignOut = $"{Configuration["CasBaseUrl"]}logout";
                    //options.SaveTokens = true;
                });

            //services.AddCors();

            services.AddCors(options =>
            {
                options.AddPolicy(CasPolicy,
                builder =>
                {
                    builder.WithOrigins(Configuration["CasBaseUrl"],
                                        $"{Configuration["CasBaseUrl"]}logout");
                });


            });


            //Conection to OracleDB
            //var connection = @"User Id=SYSTEM;Password=admin;Data Source=localhost:1521/xe";
            var connection = @"User Id=sgcontratos;Password=sgcontratos;Data Source=oradb-dev-nodo01:1521/xe";
            services.AddDbContext<MyDBContext>(option => option.UseOracle(connection));

            services.AddControllers().AddNewtonsoftJson();

            //services.AddControllers().AddJsonOptions(option => options.JsonSerializerOptions.Converters.Add(new IntToStringConverter()));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseCors(CasPolicy);

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            // Usando Autenticacion de CAS
            app.UseAuthentication();
            app.UseCors(CasPolicy);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            

            //app.UseCors( builder => {
            //    builder.AllowAnyOrigin()
            //           .AllowAnyHeader();
            //});

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(200);
                }
            });
        }
    }
}
