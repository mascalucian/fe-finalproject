<template>
  <SnackBar />
  <Nav></Nav>
  <div id="view">
    <router-view></router-view>
  </div>
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
html,
body {
  height: 100%;
  overflow: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

#view {
  flex-grow: 1;
  position: relative;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
