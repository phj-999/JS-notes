<template>
  <div>
 
  </div>
</template>

<script>
import emitter from './eventbus';

export default {
 created() {
   //监听
   emitter.on('foo',(payload)=>{
     console.log(payload);
   }),
   //监听所有的
   emitter.on('*',(type,payload)=>{
     console.log('*',type,payload);
   })
  //  取消单个监听
   emitter.off('foo',onFoo)  //必须传入函数的引用
   //取消所有监听
   emitter.all.clear()
 },
};
</script>

<style></style>
