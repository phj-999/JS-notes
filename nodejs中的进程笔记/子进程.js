const {exec,spawn} = require('child_process');
const { stdout } = require('process');
/**
 * error:创建子进程如果有错返回error
 * stdout:创建子进程成功
 * stderr:创建子进程是失败
*/
exec ('cat a.js',(error,stdout,stderr)=>{
    if (error) {
        console.log('报错了');
        return
    }
    console.log(`stderr:${stderr}`);
    console.log(`stdout:${stdout}`);
})

const ls = spawn('ls',['-a'],{encoding:'utf-8'})

ls.stdout.on('data',(data)=>{
    console.log(`stdout:${data}`);
})

 ls.stdout.on('data',(data)=>{
    console.log(`stderr:${data}`);
})

 ls.stdout.on('close',(code)=>{
    console.log(`stdout:${code}`);
})

