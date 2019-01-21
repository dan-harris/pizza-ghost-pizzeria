using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json.Linq;
using PizzaGhostPizzeria.Models;
using PizzaGhostPizzeria.Services;
using static PizzaGhostPizzeria.Constants;

namespace PizzaGhostPizzeria.Pages {

    public class OrderIndexModel : PageModel {

        /// <summary>
        /// list of pizzas that are able to be ordered
        /// </summary>
        /// <value></value>
        public List<Pizza> Pizzas = new List<Pizza> ();

        /// <summary>
        /// current order based on customer id (if we have it)
        /// </summary>
        /// <value></value>
        public Order Order;

        /// <summary>
        /// state object for client initial state
        /// (let's us preload client side with modifiable state)
        /// </summary>
        public JObject InitialState = new JObject ();

        private readonly PizzaService _pizzaService;

        private readonly OrderService _orderService;

        public OrderIndexModel (PizzaService pizzaService, OrderService orderService) {
            _pizzaService = pizzaService;
            _orderService = orderService;
        }

        public async Task OnGetAsync () {
            // populate data
            Pizzas = await _pizzaService.GetPizzas ();
            Order = await _orderService.GetOrderByCustomerId ();
            // set initial state
            InitialState["order"] = JObject.FromObject (Order);
            if (!Request.Cookies.ContainsKey ("cust")) Response.Cookies.Append ("cust", "1234", new CookieOptions { Expires = DateTime.Now.AddHours (1) });
        }

    }
}