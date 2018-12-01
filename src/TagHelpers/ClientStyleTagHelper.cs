using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace PizzaGhostPizzeria.TagHelpers {

    [HtmlTargetElement("style", Attributes = "client-style")]
    public class ClientStyleTagHelper : TagHelper {

        public string ClientStyle { get; set; }

        private readonly string _clientStylesheetPath = "client-dist";

        private readonly IHostingEnvironment _env;

        public ClientStyleTagHelper(IHostingEnvironment env) {
            _env = env;
        }

        /// <summary>
        /// set the href attribute with the client-app style sheet location
        /// </summary>
        public override void Process(TagHelperContext context, TagHelperOutput output) {
            // load css styles from dist
            string stylesheetPath = Path.Combine(this._env.WebRootPath, $"{this._clientStylesheetPath}/{this.ClientStyle}.css");
            string stylesheetContent = File.ReadAllText(stylesheetPath);
            // inline styles as html content
            output.Content.SetHtmlContent(stylesheetContent);
        }

    }
}