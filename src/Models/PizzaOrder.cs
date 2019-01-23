using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace PizzaGhostPizzeria.Models {

    /// <summary>
    /// an order for a singular pizza 🍕
    /// </summary>
    public class PizzaOrder {
        [JsonProperty ("id")]
        public int Id { get; set; }

        [JsonProperty ("pizza")]
        public Pizza Pizza { get; set; }

        [JsonProperty ("additions")]
        public List<PizzaAddition> Additions { get; set; }

        [JsonProperty ("total")]
        public decimal Total { get; set; }

        public JObject toJson () {
            return JObject.FromObject (this);
        }
    }

}