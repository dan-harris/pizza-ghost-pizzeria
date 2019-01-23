using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Razor.TagHelpers;
using PizzaGhostPizzeria.Models;
using static PizzaGhostPizzeria.Constants;

namespace PizzaGhostPizzeria.Services {

    public class PizzaService {

        /// <summary>
        /// mock data return of available pizzas to order
        /// </summary>
        /// <typeparam name="Pizza"></typeparam>
        /// <returns></returns>
        private List<Pizza> _pizzas = new List<Pizza> ();

        /// <summary>
        /// mock data return of available pizza toppings to order
        /// </summary>
        /// <typeparam name="PizzaAddition"></typeparam>
        /// <returns></returns>
        private List<PizzaAddition> _pizzaAdditions = new List<PizzaAddition> ();

        public PizzaService () {
            // create a list of available pizzas
            _pizzas.AddRange (Data.Pizzas);
            // create a list of available toppings
            _pizzaAdditions.AddRange (Data.PizzaAdditions);
        }

        /// <summary>
        /// query our 'db' for available pizzas 🥡
        /// </summary>
        /// <returns></returns>
        public async Task<List<Pizza>> GetPizzas () {
            await Task.Delay (200);
            return await Task.FromResult (_pizzas);
        }

        /// <summary>
        /// query our 'db' for available pizza additions / toppings
        /// </summary>
        /// <returns></returns>
        public async Task<List<PizzaAddition>> GetPizzaAdditions () {
            await Task.Delay (200);
            return await Task.FromResult (_pizzaAdditions);
        }

    }
}