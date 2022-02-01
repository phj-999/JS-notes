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
      {
        //所有css结尾的文件都经过css-loader
        test: /\.css$/, //匹配less：/\.less$/
        //  use:[//完整写法
        //    {loader:'css-loader'
        //  }],
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
          {//给浏览器加前缀
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // 可以单独把整个plugin抽离出去成postcss.config.js然后这里就只需要写loader就好了
                plugin: [require("postcss-preset-env")],
              },
            },
          },
        ],
        //语法糖写法
        // loader:'css-loader' //loader写法是use写法的语法糖
      },
    ],
  },
};
