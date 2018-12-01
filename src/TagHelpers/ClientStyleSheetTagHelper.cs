using Microsoft.AspNetCore.Razor.TagHelpers;

namespace PizzaGhostPizzeria.TagHelpers {

    [HtmlTargetElement ("link", Attributes = "client-style")]
    public class ClientStyleSheetTagHelper : TagHelper {

        public string ClientStyle { get; set; }

        private readonly string _clientStylesheetPath = "client-dist";

        /// <summary>
        /// set the href attribute with the client-app style sheet location
        /// </summary>
        public override void Process (TagHelperContext context, TagHelperOutput output) {
            output.Attributes.SetAttribute ("rel", "stylesheet");
            output.Attributes.SetAttribute ("href", $"{this._clientStylesheetPath}/{this.ClientStyle}.css");
        }

    }
} 