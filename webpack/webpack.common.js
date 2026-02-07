const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    core: [
      "./assets/js/src/core.tsx",
      "./assets/scss/src/core.scss"
    ]
  },

  output: {
    filename: "./assets/js/build/bundle.[name].js",
    path: path.resolve(__dirname, ".."),
    publicPath: "/"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      src: path.resolve(__dirname, "../assets/js/src")
    }
  },

  module: {
    rules: [
      // TypeScript / React
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "../client/tsconfig.json")
          }
        },
        exclude: /node_modules/
      },

      // SCSS
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },

      // Images
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "./assets/images/[hash][ext][query]"
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "./assets/js/build/*",
        "./assets/scss/build/*"
      ]
    }),

    new MiniCssExtractPlugin({
      filename: "./assets/scss/build/[name].css"
    })
  ]
};