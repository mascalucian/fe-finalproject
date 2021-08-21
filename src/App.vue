<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <FeaturedPortfolio/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import FeaturedPortfolio from './components/FeaturedPortfolio.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    FeaturedPortfolio
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
