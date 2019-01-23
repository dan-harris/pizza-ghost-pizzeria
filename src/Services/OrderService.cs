using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Razor.TagHelpers;
using PizzaGhostPizzeria.Models;
using static PizzaGhostPizzeria.Constants;

namespace PizzaGhostPizzeria.Services {

    public class OrderService {

        /// <summary>
        /// mock data persistence of orders
        /// </summary>
        /// <typeparam name="Order"></typeparam>
        /// <returns></returns>
        private List<Order> _orders = new List<Order> ();

        public OrderService () { }

        /// <summary>
        /// 'retrieve' from our stored order list 🥡
        /// </summary>
        /// <returns></returns>
        public async Task<Order> GetOrderById (int id) {
            await Task.Delay (200);
            return await Task.FromResult (_orders.FirstOrDefault (order => order.Id == id));
        }

        /// <summary>
        /// 'retrieve' from our stored order list 🥡
        /// </summary>
        /// <returns></returns>
        public async Task<Order> GetOrderByCustomerId (int customerId) {
            await Task.Delay (200);
            var existingOrder = _orders.FirstOrDefault (order => order.CustomerId == customerId);

            if (existingOrder == null) {
                existingOrder = new Order {
                Id = Utils.GenerateRandomNo (),
                CustomerId = customerId,
                PizzaOrders = new List<PizzaOrder> ()
                };
                _orders.Add (existingOrder);
            }

            return await Task.FromResult (existingOrder);
        }

        /// <summary>
        /// update a 'stored' order in our 'db' 
        /// </summary>
        /// <returns></returns>
        public async Task<Order> UpdateOrderById (Order updateOrder) {
            await Task.Delay (200);
            var existingOrder = _orders.FirstOrDefault (order => order.Id == updateOrder.Id);

            // bail if no order
            if (existingOrder == null) return await Task.FromResult<Order> (null);

            var index = _orders.IndexOf (existingOrder);

            // replace object in list
            if (index != -1) _orders[index] = updateOrder;

            return await Task.FromResult (updateOrder);
        }

    }
}