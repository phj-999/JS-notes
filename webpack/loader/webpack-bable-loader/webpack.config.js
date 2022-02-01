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
 //初始写法
      // {
      //   test:/\.js$/,
      //   use:{
      //     loader:"babel-loader",
      //     options:{
      //       // plugins:[
      //       //   "@babel/plugin-transform-arrow-functions",
      //       //   "@babel/plugin-transform-blovk-scoping"
      //       // ]
      //     presets:[
      //       "@babel/preset-env"
      //     ]
          
      //     }
      //   }
      // },
      // 如果创建了 babel.config.json 里面是
      // module.exports={
      //     presets:[
      //         "@babel/preset-env"
      //     ]
      // }
      
      // 那么webpack.config.js里面就可以在use里面直接写babel-loader 
      {
        test:/\.js$/,
        use:"babel-loader"
      }
      
    ],
  },
};
