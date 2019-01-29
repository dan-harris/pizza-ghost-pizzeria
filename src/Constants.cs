namespace PizzaGhostPizzeria {

    /// <summary>
    /// app-wide constant values
    /// </summary>
    public static class Constants {

        /// <summary>
        /// various pizza icon options
        /// </summary>
        public static class PizzaIcons {
            public const string VEGAN = "VEGAN";
            public const string PEPPERONI = "PEPPERONI";
            public const string SUPREME = "SUPREME";
        }

        /// <summary>
        /// various pizza addition icon options
        /// </summary>
        public static class PizzaAdditionIcons {
            public const string BANANAS = "BANANAS";
            public const string CHILLI = "CHILLI";
            public const string GARLIC = "GARLIC";
            public const string CAPSICUM = "CAPSICUM";
            public const string AVOCADO = "AVOCADO";
            public const string POTATOES = "POTATOES";
        }

        /// <summary>
        /// custom cookie keys
        /// </summary>
        public static class CookieKeys {
            public const string CUSTOMER_ID = "cust-id";
        }

        /// <summary>
        /// client state keys
        /// (generally used to stamp client state into client global variables)
        /// </summary>
        public static class ClientStateKeys {
            public const string INITIAL_STATE = "INITIAL_STATE";
            public const string GLOBAL_STATE = "GLOBAL_STATE";
        }

    }

}