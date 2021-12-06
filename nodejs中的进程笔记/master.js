const childProcess = require('child_process');
const child = childProcess.fork('./child.js')
/**
 * 接收紫禁城发来的消息
 */
child.on('message',(msg)=>{
    console.log(`来自子进程：${msg}`);
})
child.send('来自master')