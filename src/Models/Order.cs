using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace PizzaGhostPizzeria.Models {

    /// <summary>
    /// a total order for a customer 😲
    /// </summary>
    public class Order {
        [JsonProperty ("id")]
        public int? Id { get; set; }

        [JsonProperty ("customerId")]
        public int CustomerId { get; set; }

        [JsonProperty ("pizzaOrders")]
        public List<PizzaOrder> PizzaOrders { get; set; }

        [JsonProperty ("total")]
        private decimal Total { get; set; }

        public JObject toJson () {
            return JObject.FromObject (this);
        }
    }

}