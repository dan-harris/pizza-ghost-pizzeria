using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace PizzaGhostPizzeria {
    public class Program {
        /// <summary>
        /// constants for env var settings
        /// </summary>
        public const string ASPNETCORE_ENVIRONMENT_VAR = "ASPNETCORE_ENVIRONMENT";
        public const string ENV_SETTINGS_FILENAME = "env.json";

        /// <summary>
        /// set the default environment variable
        /// </summary>
        private static string _environment = "dev";

        /// <summary> 
        /// start web server
        /// </summary>
        public static void Main (string[] args) {
            CreateWebHostBuilder (args).Build ().Run ();
        }

        /// <summary>
        /// web host builder
        /// </summary>
        public static IWebHostBuilder CreateWebHostBuilder (string[] args) =>
            WebHost.CreateDefaultBuilder (args)
            .UseEnvironment (_environment)
            .UseStartup<Startup> ();

        /// <summary>
        /// load the environment value from json file
        /// </summary>
        public static void SetEnvironment () {
            var currentDirectoryPath = Directory.GetCurrentDirectory ();
            var envSettingsPath = Path.Combine (currentDirectoryPath, ENV_SETTINGS_FILENAME);
            if (File.Exists (envSettingsPath)) {
                var envSettings = JObject.Parse (File.ReadAllText (envSettingsPath));
                _environment = envSettings[ASPNETCORE_ENVIRONMENT_VAR].ToString ();
            }
        }
    }
}