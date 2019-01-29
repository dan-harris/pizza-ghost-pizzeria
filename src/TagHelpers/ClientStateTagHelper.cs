using Microsoft.AspNetCore.Razor.TagHelpers;
using Newtonsoft.Json.Linq;
using static PizzaGhostPizzeria.Constants;

namespace PizzaGhostPizzeria.TagHelpers {

    [HtmlTargetElement ("client-state")]
    public class ClientStateTagHelper : TagHelper {

        public JObject initial { get; set; } = new JObject ();

        public JObject global { get; set; } = new JObject ();

        /// <summary>
        /// set the tag as a script and include initial state as global JS object
        /// </summary>
        public override void Process (TagHelperContext context, TagHelperOutput output) {
            output.TagName = "script";
            output.Content.SetHtmlContent ($@"
            window.{ClientStateKeys.INITIAL_STATE} = {initial};
            window.{ClientStateKeys.GLOBAL_STATE} = {global};            
            ");
            output.TagMode = TagMode.StartTagAndEndTag;
        }

    }
}