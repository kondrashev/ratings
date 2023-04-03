// @ts-nocheck
const path = require("path");
require("babel-polyfill");

module.exports = {
  entry: ["babel-polyfill", "./client/App.js"],
  devtool: "sourcemaps",
  cache: true,
  mode: "development",
  output: {
    path: __dirname,
    filename: "./static/built/bundle.js",
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, "."),
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.(css|sass)$/,
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
