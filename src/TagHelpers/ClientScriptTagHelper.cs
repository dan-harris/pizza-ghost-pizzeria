using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace PizzaGhostPizzeria.TagHelpers {

    [HtmlTargetElement ("script", Attributes = "client-script")]
    public class ClientScriptTagHelper : TagHelper {

        public string ClientScript { get; set; }

        public bool Inline { get; set; } = false;

        private readonly string _clientScriptPath = "client-dist";

        private readonly IHostingEnvironment _env;

        public ClientScriptTagHelper (IHostingEnvironment env) {
            _env = env;
        }

        /// <summary>
        /// set the src attribute with the client-app script location
        /// </summary>
        public override void Process (TagHelperContext context, TagHelperOutput output) {
            if (!this.Inline) output.Attributes.SetAttribute ("src", $"{this._clientScriptPath}/{this.ClientScript}.js");
            else {
                // load js from dist
                string scriptPath = Path.Combine (this._env.WebRootPath, $"{this._clientScriptPath}/{this.ClientScript}.js");
                string scriptContent = File.ReadAllText (scriptPath);
                // inline js as html content
                output.Content.SetHtmlContent (scriptContent);
            }
        }

    }
}