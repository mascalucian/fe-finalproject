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
body {
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
  margin-top: 80px;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 1310px) {
  #view {
    margin-top: 160px;
  }
}

@media screen and (max-width: 600px) {
  #view {
    margin-top: 120px;
  }
}
</style>
