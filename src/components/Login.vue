<template>
  <div id="wrapper">
    <div
      :class="[{ 'right-panel-active': rightPanelActive }, 'container']"
      id="container"
      v-if="registered == false"
    >
      <div class="form-container sign-up-container">
        <Form v-slot="{ handleSubmit }" :validation-schema="registerSchema">
          <form action="#" @submit.prevent="handleSubmit($event, register)">
            <h1>Create Account</h1>
            <div class="latimeinput">
              <label for="emailR">Your email *</label>
              <Field id="emailR" name="email" v-model="username" />
              <ErrorMessage name="email" />
            </div>

            <div class="latimeinput">
              <label for="passwordR">Your password *</label>
              <Field
                type="password"
                id="passwordR"
                name="password"
                v-model="password"
              />
              <ErrorMessage name="password" />
            </div>

            <div class="latimeinput">
              <label for="emailConfirm">Confirm your password *</label>
              <Field
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Re-Type Password"
                v-model="passwordConfirm"
              />
              <ErrorMessage name="passwordConfirm" />
            </div>

            <button type="submit">Sign Up</button>
            <button
              id="mobile-button"
              v-on:click="togglePanelActive"
              type="button"
            >
              Sign In
            </button>
          </form>
        </Form>
      </div>
      <div class="form-container sign-in-container">
        <Form v-slot="{ handleSubmit }" :validation-schema="loginSchema">
          <form action="#" @submit.prevent="handleSubmit($event, login)">
            <h1>Sign in</h1>

            <div class="latimeinput">
              <label for="email">Your email *</label>
              <Field id="emailL" name="email" v-model="username" />
              <ErrorMessage name="email" />
            </div>

            <div class="latimeinput">
              <label for="password">Your password *</label>
              <Field
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                v-model="password"
              />
              <ErrorMessage name="password" />
            </div>

            <!-- <a href="#">Forgot your password?</a> -->
            <button type="submit" :disabled="isLoggedin">Sign in</button>
            <button
              id="mobile-button"
              v-on:click="togglePanelActive"
              type="button"
            >
              Sign Up
            </button>
          </form>
        </Form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!⚡</h1>
            <p>Already a portofol.io member?</p>
            <button v-on:click="togglePanelActive" class="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!🍊</h1>
            <p>Don't have an account yet?</p>
            <button
              v-on:click="togglePanelActive"
              :disabled="isLoggedin"
              class="ghost"
              id="signUp"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p></p>
      <!-- fara css nu apar router-linkurile (probabil intra sub header) -->
      <div class="centering">
        <div class="bigcontainer">
          <img
            src="https://www.freeiconspng.com/uploads/orange-check-tick-icon-14.png"
          />
          <h1>Account successfully created!</h1>
          <h3>What are you looking for?</h3>

          <div class="everyone">
            <div class="individual">
              <h2>For Recruiters</h2>
              <button class="btnindividual" role="button">
                <router-link to="/portofolios" style="color:white"
                  >View Portofol.ios</router-link
                >
              </button>
            </div>
            <div class="individual">
              <h2>For Workers</h2>
              <button class="btnindividual" role="button">
                <router-link to="/portofolios/manage" style="color:white"
                  >Create your Portofol.io</router-link
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../config/db";
import { mapGetters } from "vuex";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  data() {
    let registered = false;
    const loginSchema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(6)
        .max(25),
    });
    const registerSchema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(6)
        .max(25),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    });
    return {
      username: "",
      password: "",
      passwordConfirm: "",
      rightPanelActive: false,
      loginSchema,
      registerSchema,
      registered,
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },

  computed: {
    ...mapGetters(
      ["isLoggedin", "getErrorMessage"] // -> this.someGetter
    ),
  },
  methods: {
    togglePanelActive() {
      this.rightPanelActive = !this.rightPanelActive;
    },
    async login() {
      await this.$store.dispatch("signIn", {
        username: this.username,
        password: this.password,
      });
      console.log("Finished");
      if (!this.isLoggedin) {
        return;
      }
      this.$store.commit("setSnackBarTimeout", 2500);
      this.$store.commit("setSnackBarBackground", "#adff2f"); //how to change color!
      this.$store.dispatch("callSnackBar", {
        payload: "Login successful!", //Your message!!
      });
      setTimeout(() => {
        if (this.$route.params.returnUrl)
          this.$router.push({ path: this.$route.params.returnUrl });
        else this.$router.push({ name: "Home" });
      }, 2000);
    },
    async register() {
      await this.$store.dispatch("signUp", {
        username: this.username,
        password: this.password,
      });
      if (this.isLoggedin) {
        this.$store.commit("setSnackBarBackground", "#adff2f");
        this.$store.dispatch("callSnackBar", {
          payload: "Registration successful!",
        });
        this.registered = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
  box-sizing: border-box;
}

#wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  background: #f6f5f7;
  padding: 5% 13%;
  background-image: url("https://thumbs.dreamstime.com/z/vector-black-white-seamless-pattern-oranges-monochrome-repeating-background-citrus-fruit-leaves-flowers-twigs-fresh-145852606.jpg");
  background-position: center;
  background-size: cover;
}

#container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  min-height: 550px;
  width: 100%;
  height: 100%;
}
.centering {
  display: flex;
  justify-content: center;
}
.bigcontainer {
  margin-top: 140px;
  width: 50vw;
  min-width: 440px;
  background-color: rgba(255, 140, 0, 0.247);
  border-radius: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
input {
  background-color: #eee;
  border: none;
  padding: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
}

h1 {
  text-align: center;
  padding: 2px;
}
.bigcontainer img {
  width: 100px;
  margin-bottom: 20px;
  margin-top: 30px;
}
.everyone {
  display: flex;
  justify-content: space-around;
}
.btnindividual {
  background-image: linear-gradient(
    92.88deg,
    darkorange 9.16%,
    orange 43.89%,
    orange 64.72%
  );
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
  font-family: "Inter UI", "SF Pro Display", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  font-size: 16px;
  font-weight: 500;
  height: 4rem;
  padding: 0 1.6rem;
  text-align: center;
  text-shadow: rgba(255, 255, 255, 0.25) 0 3px 8px;
  transition: all 0.5s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.btnindividual:hover {
  box-shadow: darkorange 0 1px 30px;
  transition-duration: 0.1s;
}

@media (min-width: 768px) {
  .btnindividual {
    padding: 0 2.6rem;
  }
}
.individual {
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.latimeinput {
  position: relative;
  width: 100%;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  margin-top: 20px;
  border-radius: 20px;
  border: 1px solid darkorange;
  background-color: darkorange;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 2rem;
  height: 100%;
  text-align: center;

  form {
    padding: 0;
  }
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
  [role="alert"] {
    bottom: -7%;
  }
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, rgb(224, 123, 0), orange);
  background: linear-gradient(to right, rgb(224, 123, 0), orange);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
[role="alert"] {
  color: rgb(143, 27, 27);
  position: absolute;
  display: block;
  text-align: center;
  font-family: "Oswald", sans-serif;
  text-transform: uppercase;
  padding: 0.1rem;
  text-decoration: underline;
  bottom: -0.26rem;
  width: 100%;
}
label {
  text-align: left;
  float: left;
  margin: 0.5rem 0;
}

#mobile-button {
  display: none;
  margin-top: 20px;
  border-radius: 20px;
  border: 1px solid $sh;
  background-color: $sh;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  z-index: 100;
}

@media screen and (max-width: 600px) {
  #container {
    min-width: 100% !important;
    overflow: hidden;
  }

  #wrapper {
    padding: 10% 2%;
  }

  .sign-in-container {
    right: 0;
    width: 100%;
    z-index: 2;
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 100%;
    width: 100%;
  }

  .container.right-panel-active .sign-up-container {
    display: flex;
    transform: translateX(-100%);
    z-index: 5;
    animation: show 0.6s;
  }

  .overlay {
    display: none;
  }

  #mobile-button {
    display: inline-block;
  }
}
</style>
