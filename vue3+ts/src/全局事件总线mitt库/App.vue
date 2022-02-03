<template>
  <div id="header">
    <home/>
    <about/> 
 
  </div>
</template>

<script>
import About from './about.vue';
import Home from "./Home.vue";

export default {
  data() {
    return {
 
    };
  },
  components: {
    Home,
    About,
  },

};
</script>

<style></style>
