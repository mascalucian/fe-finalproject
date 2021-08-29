<template>
  <div
    class="wrapper"
    v-bind:style="{ 'background-image': 'url(' + this.coverPicture + ')' }"
  >
    <div class="content" v-if="currentPortofolio">
      <div class="header">
        <div class="header-image">
          <!-- <i class="fas fa-laptop-code fa-10x "></i> -->
          <img class="header-image-img " v-bind:src="this.profilePicture" />
        </div>

        <h1 class="header-name">
          {{ currentPortofolio.firstName }}
          {{ currentPortofolio.lastName }}
        </h1>

        <div class="header-occupation">
          {{ currentPortofolio.title }}
        </div>
        <div class="header-socials-wrapper">
          <a
            class="header-socials"
            v-for="social in currentPortofolio.socials"
            v-bind:key="social"
            :href="social.url"
            target="_blank"
          >
            <i
              class="fab "
              :class="{
                'fa-facebook-square fa-3x': social.socialType == 'facebook',
                'fa-instagram fa-3x': social.socialType == 'instagram',
                'fa-linkedin fa-3x': social.socialType == 'linkedin',
                'fa-youtube fa-3x': social.socialType == 'youtube',
                'fa-twitter fa-3x': social.socialType == 'twitter',
              }"
              :style="[
                social.socialType == 'facebook'
                  ? { color: '#fdfdfd' }
                  : social.socialType == 'instagram'
                  ? { color: '#fdfdfd' }
                  : social.socialType == 'linkedin'
                  ? { color: '#fdfdfd' }
                  : social.socialType == 'youtube'
                  ? { color: '#fdfdfd' }
                  : social.socialType == 'twitter'
                  ? { color: '#fdfdfd' }
                  : '',
              ]"
            ></i>
          </a>
        </div>
        <button
          type="button"
          class="btn btn-light"
          v-on:click="downloadResume()"
        >
          Get resume
        </button>
        <router-link
          type="button"
          class="btn btn-light"
          v-if="
            this.isLoggedin && this.$route.params.id == this.loggedInUser.uid
          "
          v-bind:to="'/portofolios/manage'"
        >
          Edit
        </router-link>
      </div>
      <button class="more-details">
        More details
        <i class="fas fa-chevron-down"></i>
      </button>
      <div class="details">
        <h1 class="details-tagline text">{{ currentPortofolio.tagline }}</h1>
        <div class="details-about text">
          <br />{{ currentPortofolio.about }} <br />
        </div>
        <!-- </div>
        <div class="test"> -->
        <div
          class="details-projects-title text"
          v-if="getProjectsForPortofolio.length > 0"
        >
          <div class="card-deck">
            <Project
              :project="project"
              v-for="project in getProjectsForPortofolio"
              v-bind:key="project.id"
            />
          </div>
        </div>
        <div v-else>
          <h5 style="color:red">No projects found!</h5>
        </div>
        <div class="details-contact text">
          <a class="text" v-bind:href="'mailto:' + currentPortofolio.email">{{
            currentPortofolio.email
          }}</a>
          <p>{{ currentPortofolio.phoneNumber }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Don't forget to add a loader spinner!
import { db } from "../config/db";
import { mapGetters } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import firebase from "firebase/app";
import Project from "../ui/Project.vue";
// import "firebase/firestore";

export default {
  data() {
    return {
      currentPortofolio: undefined,
      projects: [],
      unsubscribe: undefined,
      isLoading: false,
      fullPage: true,
      profilePicture: "",
      coverPicture: "",
      downloadUrl: "",
      loading: undefined,
    };
  },
  components: {
    Project,
  },
  methods: {
    async getPortofolio(userId) {
      if (this.projects.length > 0) this.projects = [];
      await db
        .collection("portofolios")
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.currentPortofolio = doc.data();
            const visited = window.sessionStorage.getItem(userId);
            // console.log(visited);
            if (visited || this.loggedInUser.uid === userId) return;
            window.sessionStorage.setItem(userId, "visited");
            var porRef = db.collection("portofolios").doc(userId);
            porRef
              .update({
                visits: firebase.firestore.FieldValue.increment(1),
              })
              .then(() => {
                // console.log(visited);
              });
          } else {
            this.$router.push({ name: "NotFound" });
            return;
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
      if (!this.currentPortofolio) {
        this.loader.hide();
        return;
      }
      await this.getStorageData(userId);
      await this.getProjects(userId);
      this.loader.hide();
      this.$emit("getPortofolioID", userId);
    },
    async getProjects(userId) {
      this.$store.dispatch("bindProjects", { payload: userId });
      this.unsubscribe = db
        .collection("projects")
        .where("userId", "==", userId)
        .onSnapshot((snapshot) => {
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
    async getStorageData(userId) {
      var storageRef = firebase.storage().ref();
      var profilePicRef = storageRef.child(userId + "/profile_picture.jpg");
      var coverPicRef = storageRef.child(userId + "/cover_picture.jpg");
      await profilePicRef
        .getDownloadURL()
        .then((url) => {
          this.profilePicture = url;
          console.log(url);
        })
        .catch((error) => {
          alert("Error getting profile picture ", error);
        });
      await coverPicRef
        .getDownloadURL()
        .then((url) => {
          this.coverPicture = url;
          console.log(url);
        })
        .catch((error) => {
          alert("Error getting profile picture ", error);
        });
    },
    downloadResume() {
      const userId = this.$route.params.id;
      var storageRef = firebase.storage().ref();
      var resumeRef = storageRef.child(userId + "/resume.pdf");

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
          alert("Can't get resume ", error);
        });
    },
    saveOrOpenBlob(blob) {
      var fileName =
        this.currentPortofolio.firstName +
        "_" +
        this.currentPortofolio.lastName +
        "_" +
        "Resume.pdf"; ///Interpoleaza cu numele din portofolio
      var tempEl = document.createElement("a");
      document.body.appendChild(tempEl);
      tempEl.style = "display: none";
      const url = window.URL.createObjectURL(blob);
      tempEl.href = url;
      tempEl.download = fileName;
      tempEl.click();
      window.URL.revokeObjectURL(url);
    },
    methodThatForcesUpdate() {
      // ...
      this.$forceUpdate(); // Notice we have to use a $ here
      // ...
    },
  },
  computed: {
    ...mapGetters(["getProjectsForPortofolio", "isLoggedin", "loggedInUser"]),
  },
  created() {
    // this.loading = true;

    const initialUserId = this.$route.params.id;
    this.getPortofolio(initialUserId);
  },
  mounted() {
    this.loader = this.$loading.show({
      backgroundColor: "none",
    });
  },
  unmounted() {
    if (this.currentPortofolio) {
      // this.loading = false;
      this.unsubscribe();
    }
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
.wrapper {
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  background-color: black;
  width: 100%;
  min-height: 100vh;
}

html {
  scroll-behavior: smooth;
  overflow: auto;
}

.wrapper {
  position: absolute;
  background-image: url("https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1907&q=80");
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  background-attachment: fixed;
  color: #1b150d;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  width: 100%;
}
.content {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  color: $w;
  padding-top: 4%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );
  // width: 98.8vw;
  // max-width: 100%;
}

.header {
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  align-items: center;
  background-color: rgba(gray, 0.5);
  padding: 20px;
  border-radius: 30px;

  &-image {
    border-radius: 50%;
    border: 1px solid $w;
    width: 300px;
    height: 300px;
    display: inline-block;
    position: relative;
    overflow: hidden;

    &-img {
      left: -10px;
      width: 320px;
      height: 320px;
      position: absolute;
      display: block;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  &-name {
    top: auto;
    margin-top: 7%;
    margin-bottom: 0;
    font-size: $huge;
    font-weight: 400;
  }
  &-occupation {
    font-size: $big;
    font-family: "Raleway";
    padding: 0.35em 2.75em 0.35em 2.75em;
    margin: 1.25em 1.5em 0.5em 1.5em;
    border-top: 1px solid $w;
    border-bottom: 1px solid $w;
  }
  &-socials {
    padding-top: 1em;
    padding-bottom: 1em;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.2);
    }
  }
}

.fas {
  color: $w;
  /* width: 100px; */
}
.btn {
  background-color: transparent;
  font-weight: bolder;
  font-size: 0.8em;
  color: $w;
  margin: 0.5em;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
  }
}
.more-details {
  background-color: transparent;
  border: none;
  margin-top: auto;
  text-decoration: none;
  font-weight: bolder;
  font-size: 1em;
  color: $w;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
  &:hover {
    cursor: pointer;
  }
}

.text {
  font-family: "Raleway", sans-serif;
  font-size: $medium;
  color: $w;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  // width: 100vw;
  // max-width: 100%;
  &-tagline {
    font-size: $huge;
    margin: 2em 0 0.25em 0;
  }
  &-about {
    padding: 0 5% 0 5%;
    margin: 1em 0 3em 0;
    // padding: 0 5% 0 5%;
    text-align: center;
  }
  &-projects-title {
    font-weight: 700;
  }
  &-projects-content {
    font-style: italic;
    font-weight: 400;
  }

  &-contact {
    padding: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  a {
    text-decoration: none;
  }
}
.card {
  background-color: rgba($s-5, 0.8);
  width: 24em;
  border-radius: 30px;
  &-img-top {
    border-radius: 30px 30px 10px 10px;
  }
  &-title {
    font-size: $medium;
  }
  &-text {
    font-size: $small;
  }
  &-deck {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
}

.card-deck {
  width: 100%;
}

.details-projects-content {
  flex: 0 1 0;
}

.header-socials {
  display: inline-block !important;
  padding: 1rem;
}
</style>
