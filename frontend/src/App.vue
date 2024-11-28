<template>
  <Shortner></Shortner>
</template>

<script>
import Shortner from './components/ShortnerComponent.vue';

export default {
  name: 'App',
  components: {
    Shortner
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
