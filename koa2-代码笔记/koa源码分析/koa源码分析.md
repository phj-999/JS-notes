const koa  = require("koa"); 
koa  具体做的额事情
调用了Application的类  构造器里面有
    proxy: boolean;
    proxyIpHeader: string;
    maxIpsCount: number;
    middleware: Application.Middleware<StateT, ContextT>[];
    subdomainOffset: number;
    env: string;
    context: Application.BaseContext & ContextT;
    request: Application.BaseRequest;
    response: Application.BaseResponse;
    silent: boolean;
    keys: Keygrip | string[];

app.listen(8000,()=>{...})
app.listen的具体做的事情
    listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): Server;
    listen(port: number, hostname?: string, listeningListener?: () => void): Server;
    listen(port: number, backlog?: number, listeningListener?: () => void): Server;
    listen(port: number, listeningListener?: () => void): Server;
    listen(path: string, backlog?: number, listeningListener?: () => void): Server;
    listen(path: string, listeningListener?: () => void): Server;
    listen(options: ListenOptions, listeningListener?: () => void): Server;
    listen(handle: any, backlog?: number, listeningListener?: () => void): Server;
    listen(handle: any, listeningListener?: () => void): Server;

    app.use中间件
    push在middleware中   callback这个函数执行后的返回值   就是handlerequest  

    handlerequest把req res给了ctx  返回了新的ctx fn  这个fn来自一个闭包  组合了所有的中间件的闭包  const fn =  compose（this.middleware）  即就是新的handlerequest next是一个dispaatch函数· 
    中间件返回一个promise
