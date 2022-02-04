<template>
  <div>{{state.counter}}</div>
</template>

<script>
export default {
setup(props) {
    const state = reactive({
        counter:100
    })

    const increment=()=>{
        state.counter++
    }
    
    return{
        state
    }
}
}
</script>

<style>

</style>