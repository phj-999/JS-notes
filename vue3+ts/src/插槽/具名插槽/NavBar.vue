<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style>
.nav-bar {
  display: flex;
}
.left .right .center {
  height: 44px;
}
.left .right {
  width: 80px;
  background-color: red;
}
.center {
  flex: 1;
  text-align: center;
  background-color: blue;
}
</style>