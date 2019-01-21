using Newtonsoft.Json;

namespace PizzaGhostPizzeria.Models {

    /// <summary>
    /// a pizza ingredient / addition 🧀
    /// </summary>
    public class PizzaAddition {
        [JsonProperty ("id")]
        public int Id { get; set; }

        [JsonProperty ("name")]
        public string Name { get; set; }

        [JsonProperty ("icon")]
        public string Icon { get; set; }
    }

}