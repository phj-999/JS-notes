<template>
  <div>
    <nav-bar>
      <template v-slot:left>
          <button>我是左边</button>
      </template>
      <template v-slot:center>
          <header>我是中间</header>
      </template>
      <template v-slot:right>
          <button>我是左边</button>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
export default {
  components: { NavBar },
};
</script>

<style></style>
