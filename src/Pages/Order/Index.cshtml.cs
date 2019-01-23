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
        public Order Order { get; set; }

        /// <summary>
        /// state object for client initial state
        /// (let's us preload client side with modifiable state)
        /// </summary>
        public JObject InitialState = new JObject ();

        private readonly PizzaService _pizzaService;

        private readonly OrderService _orderService;

        private readonly IdentityService _identityService;

        private readonly IAntiforgery _xsrf;

        public OrderIndexModel (PizzaService pizzaService, OrderService orderService, IdentityService identityService, IAntiforgery Xsrf) {
            _pizzaService = pizzaService;
            _orderService = orderService;
            _identityService = identityService;
            _xsrf = Xsrf;
        }

        public string GetAntiXsrfRequestToken () {
            return _xsrf.GetAndStoreTokens (HttpContext).RequestToken;
        }

        public int GetOrderAmountByPizzaId (int pizzaId) {
            var pizzaOrders = Order.PizzaOrders.FindAll (pizzaOrder => pizzaOrder.Pizza.Id == pizzaId);
            return pizzaOrders.Count;
        }

        public async Task OnGetAsync () {
            // populate data
            Pizzas = await _pizzaService.GetPizzas ();
            Order = await _orderService.GetOrderByCustomerId (_identityService.CustomerId);
            // set initial state
            InitialState["order"] = JObject.FromObject (Order);
        }

        public IActionResult OnGetTime () {
            return new ContentResult { Content = DateTime.Now.ToString () };
        }

        public async Task<IActionResult> OnPutOrderAsync ([FromBody] Order order) {
            if (order == null) return new ContentResult { Content = "{}", ContentType = "application/json" };
            // make sure we have the current user
            order.CustomerId = _identityService.CustomerId;
            // update order
            var updatedOrder = await _orderService.UpdateOrderById (order);
            // pass updated data back to client
            return new ContentResult { Content = updatedOrder.toJson ().ToString (), ContentType = "application/json" };
        }

    }
}