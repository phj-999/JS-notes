<template>
数组写法
  <h2>home:{{counter}}</h2>
  <h2>home:{{name}}</h2>
  <h2>home:{{height}}</h2>


  对象写法
   <h2>home:{{sCounter}}</h2>
 
</template>

<script>
export default {
  computed:{
      fullname(){
          return 'abc'
      },
      //数组写法 其他的计算属性从mapstate获取  返回一个对象
      ...mapState(['counter','name','height'])
      //或者 对象写法
      ...mapstate({
          sCounter:state=>state.counter
      })
  }
}
</script>

<style>

</style>