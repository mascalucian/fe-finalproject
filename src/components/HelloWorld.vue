d<template>
  <div class="hello">
    <h1 v-for="portofolio in allPortofolios" v-bind:key="portofolio.id">
      {{ portofolio.firstName }} {{ portofolio.lastName }}
    </h1>
    <h1>
      Test corner!
    </h1>
    <div class="auth-test">
      <form
        @submit.prevent="switchTab ? register() : login()"
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
      <div v-if="getErrorMessage" class="error">
        <p>{{ getErrorMessage }}</p>
      </div>
      <div class="auth-status" v-if="isLoggedin">
        <h3>You are currently logged in!</h3>
        <small>Your user data:</small>
        <div>
          <p>UserId: {{ loggedInUser.uid }}</p>
          <p>Email: {{ loggedInUser.email }}</p>
        </div>
        <button @click="logout()">Logout</button>
      </div>
      <button @click="downloadResume()">
        Download your resume
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../config/db";

export default {
  name: "HelloWorld",
  data() {
    return {
      username: "",
      password: "",
      switchTab: false,
      unsubscribe: undefined,
      downloadUrl: "",
    };
  },
  computed: {
    //ai nevoie doar de allPortofolios, il poti folosi apoi in v-for portofolio in allPortofolios
    ...mapGetters(
      [
        "allPortofolios",
        "isLoggedin",
        "loggedInUser",
        "loadingData",
        "getErrorMessage",
      ] // -> this.someGetter
    ),
  },
  methods: {
    downloadResume() {
      var storageRef = firebase.storage().ref();
      var resumeRef = storageRef.child(`/${this.loggedInUser.uid}/resume.pdf`);

      resumeRef
        .getDownloadURL()
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'

          // This can be downloaded directly:
          var xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            var blob = xhr.response;
            this.saveOrOpenBlob(blob);
          };
          this.downloadUrl = url;
          xhr.open("GET", url);
          xhr.send();
        })
        .catch((error) => {
          // Handle any errors
        });
    },
    saveOrOpenBlob(blob) {
      var fileName = "Resume.pdf"; ///Interpoleaza cu numele din portofolio
      var tempEl = document.createElement("a");
      document.body.appendChild(tempEl);
      tempEl.style = "display: none";
      const url = window.URL.createObjectURL(blob);
      tempEl.href = url;
      tempEl.download = fileName;
      tempEl.click();
      window.URL.revokeObjectURL(url);
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
      this.$store.commit("setSnackBarBackground", "#adff2f"); //how to change color!
      this.$store.dispatch("callSnackBar", {
        payload: "Login successful!", //Your message!!
      });
      setTimeout(() => {
        this.$router.push({ name: "Home" });
        console.log("TIMEOUT");
      }, 5000);
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
      }
    },
    logout() {
      this.$store.dispatch("signOut");
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          this.$store.dispatch("callSnackBar", {
            payload: "Logged out!", //culoare default
          });
        }
      });
    },
    methodThatForcesUpdate() {
      // ...
      this.$forceUpdate(); // Notice we have to use a $ here
      console.log("hehe. Rerendered!");
    },
  },
  //Mai jos -> incarci portofoliile
  created() {
    this.$store.dispatch("bindPortofolios");
    this.unsubscribe = db.collection("portofolios").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          this.methodThatForcesUpdate();
        }
        if (change.type === "modified") {
          this.methodThatForcesUpdate();
        }
        if (change.type === "removed") {
          this.methodThatForcesUpdate();
        }
      });
    });
  },
  mounted() {
    // for (let i = 0; i < 1; i++) {
    // //   this.$store.dispatch("addPortofolio", { payload: portofolio });
    // // }
    // let portofolio = {
    //   firstName: "Mihai",
    //   lastName: "CCCCC",
    //   title: "SQL Developer",
    //   tagline: "I'm just a dummy portofolio!",
    //   photo: "",
    //   coverPhoto: "",
    //   about:
    //     "Mihai Popescu is an SQL Server Performance Tuning Expert and independent consultant with over 17 years of hands-on experience. He holds a Masters of Science degree and numerous database certifications.",
    //   socials: [{ socialType: "facebook", url: "facebook.com" }],
    //   email: "bumbum@bum.com",
    //   phoneNumber: "0760403030",
    // };
    // setTimeout(() => {
    //   this.$store.dispatch("updatePortofolio", {
    //     payload: portofolio,
    //     id: "GKekFwCupv3wfxb3Vhv3",
    //   });
    // }, 5000);
    setTimeout(() => {}, 5000);
  },
  unmounted() {
    this.unsubscribe();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

h1 {
  color: $o;
}

.error {
  background-color: pink;
  color: red;
  display: inline-block;
  border-radius: 12px;
  padding: 7px;
}
</style>
