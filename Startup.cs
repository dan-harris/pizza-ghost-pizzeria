using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PizzaGhostPizzeria.Middleware;
using PizzaGhostPizzeria.Services;
using PizzaGhostPizzeria.TagHelpers;

namespace PizzaGhostPizzeria {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        public void ConfigureServices (IServiceCollection services) {
            services.AddMvc ().SetCompatibilityVersion (CompatibilityVersion.Version_2_1);

            services.Configure<RazorPagesOptions> (options => options.RootDirectory = "/src/Pages");
            services.Configure<RouteOptions> (options => options.LowercaseUrls = true);

            // add our mock services
            services.AddSingleton<PizzaService> ();
            services.AddSingleton<OrderService> ();

            // add other services
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor> ();
            services.AddScoped<IdentityService> ();

        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        public void Configure (IApplicationBuilder app, IHostingEnvironment env) {

            if (env.IsEnvironment ("dev")) {
                app.UseWebpackDevMiddleware (new WebpackDevMiddlewareOptions {
                    ProjectPath = Directory.GetCurrentDirectory (),
                        HotModuleReplacement = true
                });
                app.UseDeveloperExceptionPage ();
            } else {
                app.UseHsts ();
            }

            app.UseMiddleware<CustomerIdentityMiddleware> ();

            app.UseHttpsRedirection ();
            app.UseStaticFiles ();
            app.UseMvc ();
        }
    }
}