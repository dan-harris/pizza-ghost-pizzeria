using System;

namespace PizzaGhostPizzeria {

    /// <summary>
    /// scattershot of utils 🖖
    /// </summary>
    public static class Utils {

        private static Random _random = new Random ();

        /// <summary>
        /// what it says on the box (random number 4 digits long 🎩)
        /// </summary>
        /// <returns></returns>
        public static int GenerateRandomNo () {
            return _random.Next (0, 9999);
        }

    }
}