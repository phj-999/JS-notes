const path = require('path');

module.exports={
    mode:'development',
    devtool:'source-map',
    entry:'main.js',
    output,
    devServe:{
        //一些资源没从webpack找到 就从contentBase里面来找 一般是public 因为里面有图标之类的
        // 开发阶段用这个  打包阶段用copywebpackplugin
        contentBase:"./public",
        hot:true, //打开HMR 热更新
        host:'0.0.0.0',
        prot: 7777, //端口
    },
    module,
    plugin
}