<template>
  <div id="header">
    <home></home>
  </div>
</template>

<script>
import Home from "./Home.vue";

export default {
  data() {
    return {};
  },
  components: {
    Home,
  },
  provide: {
    name: "why",
    age: "1242112",
  },
};
</script>

<style></style>
