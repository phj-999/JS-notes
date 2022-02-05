<template>
  
</template>

<script>
export default {
setup(){

}
render(h) {
    return (
        <div>
        <h2>hello,world</h2>
        <div className='content'>
        {//this.$slots.default拿到插槽
            this.$slots.default ?this.$slots.default({name:'why'})
         :<span>我是默认</span>
        }
        </div>
        </div>
    )
},
}
</script>

<style>

</style>