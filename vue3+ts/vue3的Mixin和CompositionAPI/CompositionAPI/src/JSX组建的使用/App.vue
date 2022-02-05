<template>
  
</template>

<script>
import Hello from './Hello.vue';
export default {
render(h) {
    return(
        <div>
        <Hello>
        {{//作为插槽内容插入Hello里面
            default: props => <button>{props.name}</button>
        }}
        </Hello>
        </div>
    )
},
}
</script>

<style>

</style>