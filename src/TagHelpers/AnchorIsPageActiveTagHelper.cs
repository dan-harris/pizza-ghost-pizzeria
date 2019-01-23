using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace PizzaGhostPizzeria.TagHelpers {

    /// <summary>
    /// adds 'active' class if current asp-page route is active
    /// (original code c/o https://damienbod.com/2018/08/13/is-active-route-tag-helper-for-asp-net-mvc-core-with-razor-page-support/)
    /// </summary>
    [HtmlTargetElement (Attributes = "asp-page-is-active")]
    public class AnchorIsPageActiveTagHelper : TagHelper {
        private readonly IHttpContextAccessor _contextAccessor;

        public AnchorIsPageActiveTagHelper (IHttpContextAccessor contextAccessor) {
            _contextAccessor = contextAccessor;
        }

        private IDictionary<string, string> _routeValues;

        [HtmlAttributeName ("asp-page")]
        public string Page { get; set; }

        /// <summary>Additional parameters for the route.</summary>
        [HtmlAttributeName ("asp-all-route-data", DictionaryAttributePrefix = "asp-route-")]
        public IDictionary<string, string> RouteValues {
            get {
                if (this._routeValues == null)
                    this._routeValues = (IDictionary<string, string>) new Dictionary<string, string> ((IEqualityComparer<string>) StringComparer.OrdinalIgnoreCase);
                return this._routeValues;
            }
            set {
                this._routeValues = value;
            }
        }

        /// <summary>
        /// Gets or sets the view contextfor the current request.
        /// </summary>
        [HtmlAttributeNotBound]
        [ViewContext]
        public ViewContext ViewContext { get; set; }

        public override void Process (TagHelperContext context, TagHelperOutput output) {
            base.Process (context, output);

            if (ShouldBeActive ()) {
                MakeActive (output);
            }

            output.Attributes.RemoveAll ("asp-page-is-active");
        }

        private bool ShouldBeActive () {
            string currentController = string.Empty;
            string currentAction = string.Empty;

            if (ViewContext.RouteData.Values["Controller"] != null) currentController = ViewContext.RouteData.Values["Controller"].ToString ();

            if (ViewContext.RouteData.Values["Action"] != null) currentAction = ViewContext.RouteData.Values["Action"].ToString ();

            if (Page != null) {
                var page = Page.Replace ("/Index", "");
                if (string.IsNullOrEmpty (page)) page = "/";
                if (!string.IsNullOrWhiteSpace (page) && page.ToLower () != _contextAccessor.HttpContext.Request.Path.Value.ToLower ()) return false;
            }

            foreach (KeyValuePair<string, string> routeValue in RouteValues) {
                if (!ViewContext.RouteData.Values.ContainsKey (routeValue.Key) ||
                    ViewContext.RouteData.Values[routeValue.Key].ToString () != routeValue.Value) {
                    return false;
                }
            }

            return true;
        }

        private void MakeActive (TagHelperOutput output) {
            var classAttr = output.Attributes.FirstOrDefault (a => a.Name == "class");
            if (classAttr == null) {
                classAttr = new TagHelperAttribute ("class", "active");
                output.Attributes.Add (classAttr);
            } else if (classAttr.Value == null || classAttr.Value.ToString ().IndexOf ("active") < 0) {
                output.Attributes.SetAttribute ("class", classAttr.Value == null ?
                    "active" :
                    classAttr.Value.ToString () + " active");
            }
        }
    }
}