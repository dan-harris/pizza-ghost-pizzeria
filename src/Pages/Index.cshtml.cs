using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json.Linq;
using PizzaGhostPizzeria.Models;
using PizzaGhostPizzeria.Services;
using static PizzaGhostPizzeria.Constants;

namespace PizzaGhostPizzeria.Pages {

    public class IndexModel : PageModel {

        /// <summary>
        /// current order based on customer id (if we have it)
        /// </summary>
        /// <value></value>
        public PizzaGhostPizzeria.Models.Order Order { get; set; }

        /// <summary>
        /// state object for client initial state
        /// (let's us preload client side with modifiable state)
        /// </summary>
        public JObject InitialState = new JObject ();

        private readonly OrderService _orderService;

        private readonly IdentityService _identityService;

        public IndexModel (OrderService orderService, IdentityService identityService) {
            _orderService = orderService;
            _identityService = identityService;
        }

        public async Task OnGetAsync () {
            // populate data
            Order = await _orderService.GetOrderByCustomerId (_identityService.CustomerId);
            // set initial state
            InitialState["order"] = JObject.FromObject (Order);
        }
    }
}