const cluster = require('cluster');
const http = require('http');
const os = require('os');
/**计算cpu个数 */
const cpus = os.cpus().length

if (cluster.isMaster) {
    console.log(`主进程 ${pross.pid} 正在运行`);
    //衍生工作进程
    for (let index = 0; index < array.cpus; index++) {
      cluster.fork()
    }
}else{
    //工作进程可以共享任何tcp链接
    //此处共享的是一个http服务器
    http.createServer((req,res)=>{
        res.writeHead(200,{'Content-type':'text-html;charset=utf-8'})
        res.write('hello')
        res.end()
    }).listen(8000)

    console.log(`工作进程 ${process.pid}已经启动`);
}