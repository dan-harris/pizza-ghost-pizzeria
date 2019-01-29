const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}, argv = {}) => {
  const isProd = argv.mode === "production";

  const config = {
    mode: argv.mode || "development", // we default to development when no 'mode' arg is passed
    // entry: pathsToObject(
    //   glob.sync("./**/*.ts*", { ignore: "./node_modules/**/*" })
    // ),
    entry: {
      core: "./src-client/core/core.ts",
      ["page-home"]: "./src-client/pages/home/home.page.ts",
      ["page-order"]: "./src-client/pages/order/order.page.ts",
      ["page-order-checkout"]:
        "./src-client/pages/order-checkout/order-checkout.page.ts",
      ["partial-header"]: "./src-client/partials/header/header.partial.ts",
      ["partial-logo"]: "./src-client/partials/logo/logo.partial.ts"
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "./wwwroot/client-dist"),
      publicPath: "/client-dist/"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            // isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader"
          ]
        },
        {
          test: /\.ts?$/,
          use: "ts-loader",
          exclude: /node_modules/
        }
      ]
    }
  };

  if (!isProd) {
    config.devtool = "eval-source-map";
  }

  return config;
};

function pathsToObject(paths = []) {
  return paths.reduce((newObject, path) =>
    newObject
      ? { ...newObject, [getPathName(path)]: path }
      : { [getPathName(path)]: path }
  );
}

function getPathName(path = "") {
  return path.split("/").slice(-1)[0];
}
