const path = require('path');
const  {CleanWebpackPlugin}  = require('clean-webpack-plugin');

module.exports={
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'./build'),
        filname:"bundle.js"
    },
    module:{},
    plugins:[
       new CleanWebpackPlugin()
    ]
}