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
      core: "./src-client/shared/core/core.ts",
      ["polyfills-base"]: "./src-client/shared/polyfills/polyfills-base.ts"
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
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader"
          ]
        },
        {
          test: /\.tsx?$/,
          use: "awesome-typescript-loader",
          exclude: /node_modules/
        },
        {
          test: /\.ts?$/,
          use: "awesome-typescript-loader",
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
  return paths.reduce(
    (newObject, path) =>
      newObject
        ? { ...newObject, [getPathName(path)]: path }
        : { [getPathName(path)]: path }
  );
}

function getPathName(path = "") {
  return path.split("/").slice(-1)[0];
}
