<template>
  <div class="topnav" id="myTopnav">
    <nav class="navMenu" id="navv">
      <div id="left">
        <router-link to="/test" class="active">Home</router-link>
        <router-link to="/portofolios">Portofolios</router-link>
        <router-link to="/aboutus">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>

      <div id="right">
        <router-link v-if="!isLoggedin" to="/auth">Login</router-link>

        <router-link
          to="/portofolios/manage/"
          v-if="isLoggedin"
          :class="{
            'create-edit-button': !getHasPortofolio,
            'edit-button': getHasPortofolio,
          }"
        >
          {{ getHasPortofolio ? "Edit Portofol.io" : "Create Portofol.io" }}
        </router-link>
        <a v-if="isLoggedin" @click="logOut()" :class="{ logoutt: isLoggedin }">
          Logout
        </a>
        <router-link to="/" id="logoid"
          ><img src="https://i.imgur.com/Jwuropl.png" class="logo"
        /></router-link>
        <router-link to="/" id="slogo"
          ><img
            src="https://cdn.discordapp.com/attachments/769127565239255061/880137163314970624/or.png"
            class="slogo"
        /></router-link>
      </div>
      <a href="javascript:void(0);" class="icon" v-on:click="myFunction">
        <i class="fa fa-bars"></i>
      </a>

      <!-- <div class="dot"></div> -->
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    async logOut() {
      await this.$store.dispatch("signOut");
    },
    myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
      var y = document.getElementById("myTopnav");
      if (y.className === "topnav responsive") {
        y.className += " marire";
      } else {
        y.className = "topnav";
      }
    },
  },
  computed: {
    ...mapGetters(
      ["isLoggedin", "getHasPortofolio"] // -> this.someGetter
    ),
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.spacing {
  padding: 10px;
}
.marire {
  height: 220px;
  .navMenu {
    height: 220px !important;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  .edit-button {
    margin-left: -2px !important;
  }
  .create-edit-button {
    margin-left: -2px !important;
  }
}
/* Hide the link that should open and close the topnav on small screens */
.topnav .icon {
  display: none;
}
@media screen and (max-width: 1310px) {
  nav {
    height: 160px !important;
  }
  .topnav {
    height: 160px;
  }
  #left {
    padding-left: 20vw !important;
    float: none !important;
  }
  #right {
    padding-right: 2vw !important;
    float: right !important;
  }
  .spacing {
    padding: 50px;
  }
}
@media screen and (max-width: 927px) {
  #logoid {
    display: none;
  }
  .topnav {
    height: 120px;
  }
  .topnav .slogo {
    float: right !important;
    display: block !important;
    padding-right: 20vw !important;
  }
}
.slogo {
  display: none;
  height: 40px;
}

/* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {
    display: none;
  }
  .topnav a.icon {
    float: right;
    display: block;
    position: absolute;
    right: 100px;
    top: 20px;
  }
  .slogo {
    display: block !important;
    position: absolute !important;
    left: 20px !important;
    top: 10px !important;
  }
  .spacing {
    padding: 30px;
  }
}

/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive a.icon {
    position: absolute;
    right: 100px;
    top: 20px;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
  .slogo {
    position: absolute !important;
    left: 20px !important;
    top: 10px !important;
    display: block !important;
  }
  nav {
    height: 120px !important;
  }
  #right {
    float: left !important;
    margin-left: 20vw !important;
    margin-top: -30px;
  }
  .edit-button {
    margin-left: -2px !important;
  }
  .create-edit-button {
    margin-left: -2px !important;
  }
}
.topnav {
  padding-bottom: 35px;
}

nav {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  background-image: linear-gradient(#f9ab2f, #f4690e);
  justify-content: space-between;
  align-items: center;
  flex: 1 0 auto;
  flex-wrap: nowrap;
  height: 80px;
  width: 100vw;

  font-family: "Montserrat", sans-serif;
  div {
    display: inline-block;
  }
}

#left {
  display: block;
  padding: 20px;
  float: left;
  justify-items: flex-start;
  flex: 1 1 auto;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
}

#right {
  padding: 10px;
  display: block;
  float: right;
  justify-items: flex-end;
  align-items: center;
  a {
    margin: 0 0.4rem;
  }
}

.logo {
  padding-left: 3rem;
  height: 50px;
  vertical-align: middle;
  flex: 1 1 80px;
  margin-right: 20px;
}

#logoid {
  margin: 0;
}

a {
  cursor: pointer;
  color: #fff !important;
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
  &:hover,
  &:active,
  &.router-link-active {
    color: black !important;
  }
}

.create-edit-button {
  background-color: limegreen;
  border-radius: 40px;
  padding: 0.1rem 0.5rem;
  &.router-link-active {
    display: none;
  }
}
.edit-button {
  background-color: rgba(255, 255, 255, 0.281);
  border-radius: 40px;
  color: rgba(255, 255, 255, 0.623);
  background-blend-mode: color-burn;
  padding: 0.1rem 0.5rem;
  &.router-link-active {
    display: none;
  }
}
.logoutt:hover {
  color: red;
  &:hover,
  &:active,
  &.router-link-active {
    background-color: red;
    border-radius: 40px;
    color: rgba(255, 255, 255, 0.623);
    background-blend-mode: color-burn;
    padding: 0rem 0.5rem;
    margin-left: -15px;
    margin-top: 15px;
  }
}
.edit-button:hover {
  opacity: 100%;
  background-color: white;
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
  -webkit-transform: translateX(1vw);
  transform: translateX(1vw);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}

.navMenu a:nth-child(3):hover ~ .dot {
  -webkit-transform: translateX(9.2vw);
  transform: translateX(9.2vw);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}

.navMenu a:nth-child(4):hover ~ .dot {
  -webkit-transform: translateX(15.5vw);
  transform: translateX(15.5vw);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}
.navMenu a:nth-child(5):hover ~ .dot {
  -webkit-transform: translateX(61.9w);
  transform: translateX(61.9vw);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}
.navMenu a:nth-child(6):hover ~ .dot {
  -webkit-transform: translateX(68vw);
  transform: translateX(68vw);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}
</style>
