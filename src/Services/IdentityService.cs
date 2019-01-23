using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Razor.TagHelpers;
using PizzaGhostPizzeria.Models;
using static PizzaGhostPizzeria.Constants;

namespace PizzaGhostPizzeria.Services {

    public class IdentityService {

        /// <summary>
        /// current identity customer id
        /// </summary>
        /// <returns></returns>
        private int _customerId;

        /// <summary>
        /// current identity customer id
        /// (resets 'identity' when set)
        /// </summary>
        /// <returns></returns>
        public int CustomerId {
            get { return _customerId; }
            set { _customerId = value; }
        }

        public IdentityService () { }

    }
}