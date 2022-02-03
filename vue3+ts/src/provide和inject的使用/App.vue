<template>
  <div id="header">
    <home></home>
  </div>
</template>

<script>
import Home from "./Home.vue";
import { computed } from "vue";

export default {
  data() {
    return {
      http: ["此处是请求来的数据"],
    };
  },
  components: {
    Home,
  },
  // provide: {
  //   //此处是自定义的数据直接传
  //   name: "why",
  //   age: "1242112",
  // },
  // provide() {
  //此处的http不是响应式的 不能被button点击改变
  //   return {
  //     name: "why",
  //     age: "1242112",
  //     http: this.http,
  //   };
  // },
  provide() {
    //此处的http是响应式的 可以被button点击操作改变
    return {
      name: "why",
      age: "1242112",
      http: computed(() => this.http),
    };
  },
};
</script>

<style></style>
