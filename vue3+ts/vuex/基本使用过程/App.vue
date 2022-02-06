<template>
  <div>
    <h2>{{ $store.state.counter }}</h2>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    increment() {
      this.$store.commit("decrement");
    },
  },
};
</script>

<style></style>
