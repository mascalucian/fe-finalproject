<template>
  <div class="alll">
    <nav class="navMenu">
      <div id="left">
        <router-link to="/test">Home</router-link>
        <router-link to="/portofolios">Portofolios</router-link>
        <router-link to="/aboutus">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>

      <div id="right">
        <router-link v-if="!isLoggedin" to="/login">Login</router-link>
        <router-link
          to="/portofolios/manage/"
          v-if="isLoggedin"
          :class="{ 'create-edit-button': !getHasPortofolio, 'edit-button': getHasPortofolio}"
        >
          {{ getHasPortofolio ? "Edit Portofol.io" : "Create Portofol.io" }}
        </router-link>
        <a v-if="isLoggedin" @click="logOut()">
          Logout
        </a>
        <router-link to="/" id="logoid"
          ><img src="https://i.imgur.com/Jwuropl.png" class="logo"
        /></router-link>
      </div>

      <div class="dot"></div>
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

nav {
  display: flex;
  background-image: linear-gradient(#F9AB2F, #F4690E);
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
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
  background-color: red;
  border-radius: 40px;
  opacity: 40%;
  background-blend-mode: color-burn;
  padding: 0.1rem 0.5rem;
  &.router-link-active {
    display: none;
  }
}
.edit-button:hover {
  opacity: 100%;
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
