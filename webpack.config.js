const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const options = require("./.eslintrc");

module.exports = {
  entry: "./auto-complete-ui/index.ts",
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "auto-complete-ui")
  },
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, "auto-complete-ui"),
    open: true,
    compress: true,
    hot: true,
    port: 3000
  },
  plugins: [new ESLintPlugin(options), new HTMLWebpackPlugin()]
};
