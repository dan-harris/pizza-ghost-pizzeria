using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Newtonsoft.Json.Linq;

namespace PizzaGhostPizzeria.TagHelpers {

    [HtmlTargetElement ("client-state")]
    public class ClientStateTagHelper : TagHelper {

        public JObject state { get; set; }

        private readonly string _clientInitialStateKey = "INITIAL_STATE";

        /// <summary>
        /// set the src attribute with the client-app script location
        /// </summary>
        public override void Process (TagHelperContext context, TagHelperOutput output) {
            output.TagName = "script";
            output.Content.SetHtmlContent ($@"window.{_clientInitialStateKey} = {state}");
            output.TagMode = TagMode.StartTagAndEndTag;
        }

    }
}