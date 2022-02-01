const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { HtmlWebpackPlugin } = require("html-webpack-plugin");
const { DefinePlugin } = require("define-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    // 输出文件路径
    path: path.resolve(__dirname, "./build"),
    // 输出文件名
    filename: "bundle.js",
  },
  module: {
    rules: [
      //字体的打包loader
      // {
      //   test: /\.(eot|ttf|woff2?)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "font/[name]_[hash:6].[ext]",
      //     },
      //   },
      // },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      //最终index.html里面的<title></title>内的内容会变成哈哈
      title: "哈哈",
    }),
    //会查找全局内的 BASE_URL换成./
    new DefinePlugin({
      BASE_URL: "./",
    }),
  ],
};
