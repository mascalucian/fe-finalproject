<template>
<div class="alll">
  <nav class="navMenu">
    
      <router-link to="/test" id="home"><a >Home</a></router-link>
      <router-link to="/portofolios" id="portos"><a >Portofolios</a></router-link>
      <router-link to="/aboutus" id="about"><a >About</a></router-link>
      <router-link to="/contact" id="contact"><a >Contact</a></router-link>
    
      <router-link to="/login" id="login"><a >Login</a></router-link>
      <router-link to="/register" id="register" ><a>Register</a></router-link>
      <router-link to="/" id="logoid"><a ><img src="https://i.imgur.com/MGp2X3f.png" class="logo"></a></router-link>
    
    <!-- <div class="dot"></div> -->
  </nav>
</div>
</template>

<script>
export default {
  methods: {
    goToPortofolio(portofolioId) {
      return portofolioId;
    },
  },
};
</script>

<style scoped>



@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.navMenu {
  display: inline-block;
 

  margin-top: 20px;
  margin-left: 50%;
  width: 100vw;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background: darkorange;
  font-family: "Montserrat", sans-serif;
}
.logo {
  height: 50px;
   vertical-align: middle;
}
#home {
  margin-left: 2vw;
  vertical-align: middle;
}
#portos {
  margin-left: 1vw;
  vertical-align: middle;
}
#about {
  margin-left: 6.3vw;
  vertical-align: middle;
}
#contact {
  margin-left:1.3vw;
  vertical-align: middle;
}
#login {
  margin-left: 43vw;
  vertical-align: middle;
  position: fixed;
  z-index: 10;
}
#register {
  margin-left: 1vw;
  vertical-align: middle;
}
#logoid {
margin-left: 4vw;

}

 a {
  color: #f6f4e6;
  text-decoration: none;
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 500;
  display: inline-block;
  width: 80px;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

 a:hover {
  color: #fddb3a;
}
a:active, a.router-link-active  {
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
  margin-left:200px;
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
