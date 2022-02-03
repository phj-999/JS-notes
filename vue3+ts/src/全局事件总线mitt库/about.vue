<template>
  <div @click="btnClick">点击</div>
</template>

<script>
import emitter from './eventbus';

export default {
methods: {
    btnClick(){
        console.log('dianjile');
        emitter.emit('foo',{name:"why",age:'18818283'})
    }
},
}
</script>

<style>

</style>