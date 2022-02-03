<template>
  <div>
    provide和inject的使用
    <br />
    <span>此例子是App.vue传递name和age到此homecontent子组件</span>
    <span>父子和子孙组件用的 兄弟不能用</span>
    <hr />
    name是{{ name }} age是{{ age }}
    <hr />
    这里是app.vue请求来的数据传递过来的{{ http }}
    <hr />
    这里是响应式的http可以被点击等操作，上面的不能，computed包裹http时候返回是一个ref对象
    所以
    {{ http.value }}
  </div>
</template>

<script>
export default {
  inject: ["name", "age", "http"],
};
</script>

<style></style>
