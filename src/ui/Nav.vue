<template
  ><nav>
    <span>
      <router-link to="/test">Test Area</router-link>
      <router-link to="/portofolios">All Portofolios</router-link>
      <router-link to="/aboutus">About Us</router-link>
      <router-link to="/contact">Contact</router-link>
    </span>
    <span>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/"><img src="https://i.imgur.com/MGp2X3f.png" class="logo"></router-link>
    </span>
  </nav></template>

<script>
export default {};
</script>

<style scoped>

nav {
  height: 60px;
  border-bottom: 1px solid black;
  background-color: rgb(255, 255, 255);
  color: black;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  vertical-align: middle;
}

a {
  text-decoration: none;
  color: inherit;
  background: none;
  padding: 6px;
  border-radius: 10px;
  margin: 0 5px;
}
a .logo {
  border:none;
}

span {
  margin: auto 10px;
}
.logo {
  height: 30px;
  border: none;
}

a:hover,
a:active,
a.router-link-active {
  background-color: khaki;
}
</style>
