<template>
  <div>
      provide和inject的使用
      <br/>
      <span>此例子是App.vue传递name和age到此homecontent子组件</span>
      <span>父子和子孙组件用的 兄弟不能用</span>
      name是{{name}}
      age是{{age}}
  </div>
</template>

<script>
export default {
inject:['name','age']
}
</script>

<style>

</style>