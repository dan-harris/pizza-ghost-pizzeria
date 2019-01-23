using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Razor.TagHelpers;
using PizzaGhostPizzeria.Models;
using PizzaGhostPizzeria.Services;
using static PizzaGhostPizzeria.Constants;

namespace PizzaGhostPizzeria.Middleware {

    public class CustomerIdentityMiddleware {

        private readonly RequestDelegate _next;

        public CustomerIdentityMiddleware (RequestDelegate next) {
            _next = next;
        }

        public async Task Invoke (HttpContext httpContext, IdentityService identityService) {

            // set the customer id if current request doesn't have one
            // update identity service with current identity
            if (!httpContext.Request.Cookies.ContainsKey (CookieKeys.CUSTOMER_ID)) {
                var newCustomerId = Utils.GenerateRandomNo ();
                httpContext.Response.Cookies.Append (CookieKeys.CUSTOMER_ID, newCustomerId.ToString ());
                identityService.CustomerId = newCustomerId;
            } else identityService.CustomerId = Convert.ToInt32 (httpContext.Request.Cookies[CookieKeys.CUSTOMER_ID]);

            await _next.Invoke (httpContext);
        }

    }
}