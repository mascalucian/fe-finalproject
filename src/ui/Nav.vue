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
    </span>
  </nav></template
>

<script>
export default {};
</script>

<style scoped>
nav {
  height: 60px;
  border-bottom: 1px solid black;
  background-color: darkorange;
  color: black;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  vertical-align: middle;
}

a {
  text-decoration: none;
  color: inherit;
  border: 2px solid black;
  background: none;
  padding: 6px;
  border-radius: 10px;
  margin: 0 5px;
}

span {
  margin: auto 10px;
}

a:hover {
  background-color: khaki;
}
</style>
