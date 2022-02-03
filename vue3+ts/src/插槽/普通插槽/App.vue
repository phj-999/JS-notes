<template>
  <div>
    <slot-cpn>
      <button>我是插槽进来的</button>
      <br />woshiwenben
    </slot-cpn>
    <slot-cpn> 989980090 </slot-cpn>
  </div>
</template>

<script>
import SlotCpn from "./SlotCpn.vue";
 

export default {
  components: { SlotCpn },
};
</script>

<style></style>
