const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  devtool: "eval-cheap-module-source-map",

  optimization: {
    minimize: false
  },

  output: {
    filename: "./assets/js/build/bundle.[name].js"
  },

  watch: true
});