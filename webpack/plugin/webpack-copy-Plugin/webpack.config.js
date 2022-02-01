const path = require("path");
const { CopyWebpackPlugin } = require("copy-webpack-plugin");

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
    new CopyWebpackPlugin({
      patterns: [
        {
          //打包的时候复制某个文件
          from: "public",
          to: "build", //  './'为复制到当前目录
          globOptions: {
            ignore: [
              //复制之后忽略的文件
              "**/index.html",
            ],
          },
        },
      ],
    }),
  ],
};
