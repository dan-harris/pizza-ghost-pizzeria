using Newtonsoft.Json;

namespace PizzaGhostPizzeria.Models {

    /// <summary>
    /// a pizza 🍕
    /// </summary>
    public class Pizza {
        [JsonProperty ("id")]
        public int Id { get; set; }

        [JsonProperty ("name")]
        public string Name { get; set; }

        [JsonProperty ("icon")]
        public string Icon { get; set; }
    }

}