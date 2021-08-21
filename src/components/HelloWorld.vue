<template>
  <div class="hello">
    <h1 v-for="portofolio in allPortofolios" v-bind:key="portofolio.name">
      {{ portofolio.firstName }} {{ portofolio.lastName }}
    </h1>
    <h1>
      Test corner!
    </h1>
    <div class="auth-test">
      <form
        @submit.prevent="
          switchTab ? register(username, password) : login(username, password)
        "
        v-if="!isLoggedin"
      >
        <div>
          <button
            @click="switchTab = false"
            type="button"
            v-bind:class="{ selected: !switchTab }"
          >
            Login
          </button>
          <button
            @click="switchTab = true"
            type="button"
            v-bind:class="{ selected: switchTab }"
          >
            Register
          </button>
        </div>
        <div class="form-field">
          <label>
            Username:
          </label>
          <input type="text" name="username" v-model="username" />
        </div>
        <div class="form-field">
          <label>
            Password:
          </label>
          <input type="password" name="password" v-model="password" />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      <div v-if="loadingData">
        Loading...
      </div>
      <div class="auth-status" v-if="isLoggedin">
        <h3>You are currently logged in!</h3>
        <small>Your user data:</small>
        <div>
          <p>UserId: {{ loggedInUser.uid }}</p>
          <p>Email: {{ loggedInUser.email }}</p>
          <p>Your last visit : {{ loggedInUser.metadata.lastSignInTime }}</p>
          <p>Created At: {{ loggedInUser.metadata.creationTime }}</p>
        </div>
        <button @click="logout()">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "HelloWorld",
  data() {
    return {
      username: "",
      password: "",
      switchTab: false,
    };
  },
  computed: {
    ...mapGetters(
      ["allPortofolios", "isLoggedin", "loggedInUser", "loadingData"] // -> this.someGetter
    ),
  },
  methods: {
    async login(username, password) {
      console.log("LOADING");
      await this.$store.dispatch("signIn", {
        username: this.username,
        password: this.password,
      });
      console.log("FINISHED");
    },
    register(username, password) {
      this.$store.dispatch("signUp", {
        username: this.username,
        password: this.password,
      });
    },
    logout() {
      this.$store.commit("logout");
    },
  },
  created() {
    this.$store.dispatch("bindPortofolios");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.selected {
  background-color: #42b983;
}
</style>
