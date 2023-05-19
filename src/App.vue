<template >
  
  
  <RouterView/>
</template>



<script >
import {RouterView } from 'vue-router';
import { useStore } from 'vuex';
export default {
  name: "App",
  components: {  RouterView},
  
  setup(){
    const store = useStore()
    store.dispatch('getToken')
  }

}


</script>

<style>
.container{
  overflow: hidden;
}
</style>
