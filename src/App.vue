<template>
  <SnackBar />
  <Nav></Nav>
  <router-view></router-view>
</template>

<script>
import Nav from "./ui/Nav.vue";
import SnackBar from "./ui/SnackBar.vue";

export default {
  name: "App",
  components: {
    Nav,
    SnackBar,
  },
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}
</style>
