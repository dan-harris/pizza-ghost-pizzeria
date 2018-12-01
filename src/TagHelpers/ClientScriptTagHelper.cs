using Microsoft.AspNetCore.Razor.TagHelpers;

namespace PizzaGhostPizzeria.TagHelpers {

    [HtmlTargetElement ("script", Attributes = "client-script")]
    public class ClientScriptTagHelper : TagHelper {

        public string ClientScript { get; set; }

        private readonly string _clientScriptPath = "client-dist";

        /// <summary>
        /// set the src attribute with the client-app script location
        /// </summary>
        public override void Process (TagHelperContext context, TagHelperOutput output) {
            output.Attributes.SetAttribute ("src", $"{this._clientScriptPath}/{this.ClientScript}.js");
        }

    }
}