<template>
  <div class="alll">
    <nav class="navMenu">
      <div id="left">
        <router-link to="/test" id="home">Home</router-link>
        <router-link to="/portofolios" id="portos">Portofolios</router-link>
        <router-link to="/aboutus" id="about">About</router-link>
        <router-link to="/contact" id="contact">Contact</router-link>
      </div>

      <div id="right">
        <router-link to="/login" id="login"><a>Login</a></router-link>
        <router-link to="/register" id="register"><a>Register</a></router-link>
        <router-link to="/" id="logoid"
          ><img src="https://i.imgur.com/MGp2X3f.png" class="logo"
        /></router-link>
      </div>
      <div class="dot"></div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 auto;
  flex-wrap: nowrap;
  height: 80px;
  background: transparent;
  font-family: "Montserrat", sans-serif;
  div {
    display: inline-block;
  }
}

#left {
  display: flex;
  justify-items: flex-start;
  flex: 1 1 auto;
  flex-wrap: wrap;
  flex-direction: row;
  min-width: 270px;
}

#right {
  display: flex;
  justify-items: flex-end;
  align-items: center;
  a {
    margin: 0 0.4rem;
  }
}
.logo {
  height: 80px;
  vertical-align: middle;
  flex: 1 1 80px;
}

#logoid {
  margin: 0;
}

a {
  color: #f6f4e6;
  text-decoration: none;
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 500;
  display: inline-block;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  margin: 0 1rem;
  vertical-align: middle;
  text-align: center;
}

a:hover {
  color: #fddb3a;
}
a:active,
a.router-link-active {
  color: #fddb3a;
}

.dot {
  width: 6px;
  height: 6px;
  background: #fddb3a;
  border-radius: 50%;
  opacity: 0;
  -webkit-transform: translateX(0vw);
  transform: translateX(0vw);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  margin-left: 200px;
  position: absolute;
}

.navMenu a:nth-child(1):hover ~ .dot {
  -webkit-transform: translateX(-6.5vw);
  transform: translateX(-6.5vw);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}

.navMenu a:nth-child(2):hover ~ .dot {
  -webkit-transform: translateX(110px);
  transform: translateX(110px);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}

.navMenu a:nth-child(3):hover ~ .dot {
  -webkit-transform: translateX(200px);
  transform: translateX(200px);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}

.navMenu a:nth-child(4):hover ~ .dot {
  -webkit-transform: translateX(285px);
  transform: translateX(285px);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}
.navMenu a:nth-child(5):hover ~ .dot {
  -webkit-transform: translateX(67.2vw);
  transform: translateX(67.2vw);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}
.navMenu a:nth-child(6):hover ~ .dot {
  -webkit-transform: translateX(73.5vw);
  transform: translateX(73.5vw);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}
.navMenu a:nth-child(7):hover ~ .dot {
  -webkit-transform: translateX(285px);
  transform: translateX(285px);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}
</style>
