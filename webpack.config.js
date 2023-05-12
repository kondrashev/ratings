// @ts-nocheck
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
require("babel-polyfill");

module.exports = {
  entry: ["babel-polyfill", "./client/App.jsx"],
  devtool: "sourcemaps",
  cache: true,
  mode: "development",
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "bundle.js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./static/template/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@styles": path.resolve(__dirname, "client/styles"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|eot|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: { modules: true },
          },
        ],
      },
    ],
  },
};
