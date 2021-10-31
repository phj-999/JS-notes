/**
 * ts终端 tsc-init
 * 
*/

"include":["xxx.ts","xxx111.ts"]  //编译那些ts文件生成js
"exclude":["1.ts","2.ts"]  // 除了【】中的文件全部编译成js
"files":["111.ts"]  //编译只会生成 111.ts文件

"compilerOptions": {
"removeComments": true,  //编译成js的时候去掉注释
"strict":true   //表示代码编写必须严格按照ts规范来写
"noImplicitAny": true,   //允许你的注解类型any 不用特意标明  (意思是true时候any不用特意声明 不会报错 fasle不声明any则会报错)
"strictNullChecks": true, //true表示不允许null值出现比如xx=null会报错 fasle允许有null值出现 比如xx=null不会报错 
"outDir": "./build",  //  输出文件地址
"rootDir": "./src",  // 打包源文件地址
"sourceMap":true    //改成true 部署之前开启 开发时候不开启 编译后能生成一个xxx.js.map 文件  排查错误有用 能显示出ts哪里错了
"noUnusedLocals": true,  //开启后  没使用的变量就提示
"noUnusedParameters": true,      //没用的方法就提示
}