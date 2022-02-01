const path = require("path");

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
      {
        test: /\.(eot|ttf|woff2?)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "font/[name]_[hash:6].[ext]",
          },
        },
      },
    ],
  },
};
