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
          {
            //给浏览器加前缀
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
      {
        test: /\.(jpg|png|gift|svg|webp)$/,
        use: {
          loader: "file-loader",
          options: { name: "img/[name]_[hash:6].[ext]",
         // outputPath:'img' 
        },
        },
      },
    //   {
    //     test: /\.(jpg|png|gift|svg|webp)$/,
    //     use: {
    //       loader: "url-loader",
    //       options: {
    //         name: "img/[name]_[hash:6].[ext]",
    //         //outputPath:'img' ,
    //         //只对<100kb的进行base64编码,>100kb的不进行编码因为会变慢
    //         limit: 100 * 1024,
    //       },
    //     },
    //   },
    
    
    /**
     * webpack5的写法 这样上面的loader都不需要安装了
     * */
      {
        test: /\.(jpg|png|gift|svg|webp)$/,
       type:'asset',
       generator:{
        filename: "img/[name]_[hash:6][ext]"
       },
       parser:{
           dataUrlCondition:{
               maxSize:100*1024
           }
       }
      },
    ],
  },
};
