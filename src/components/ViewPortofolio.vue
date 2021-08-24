<template>
  <div class="wrapper">
    <div v-if="loading" class="spring-spinner">
      <div class="spring-spinner-part top">
        <div class="spring-spinner-rotator"></div>
      </div>
      <div class="spring-spinner-part bottom">
        <div class="spring-spinner-rotator"></div>
      </div>
    </div>
    <div v-if="currentPortofolio">
      <div class="content background-image">
        <div class="header">
          <div class="header-image">
            <!-- <i class="fas fa-laptop-code fa-10x "></i> -->
          </div>

          <h1 class="header-name">
            {{ currentPortofolio.firstName }}
            {{ currentPortofolio.lastName }}
          </h1>

          <div class="header-occupation">
            {{ currentPortofolio.title }}
          </div>
          <a
            class="header-socials"
            v-for="social in currentPortofolio.socials"
            v-bind:key="social"
            :href="social.url"
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
        <button class="more-details" v-if="show">
          More details
          <i class="fas fa-chevron-down"></i>
        </button>
        <div id="details">
          <h1 class="tagline text">{{ currentPortofolio.tagline }}</h1>
          <div class="about text">
            About me: <br />{{ currentPortofolio.about }}
          </div>
          <div class="contact text"></div>

          <div v-if="getProjectsForPortofolio.length > 0">
            <p>Projects:</p>
            <span
              v-for="project in getProjectsForPortofolio"
              v-bind:key="project.id"
            >
              {{ project.title }}<br />
            </span>
          </div>
          <div v-else>
            <h5 style="color:red">No projects found!</h5>
          </div>
          <div class="contact">
            {{ currentPortofolio.email }}
            {{ currentPortofolio.phoneNumber }}
          </div>
        </div>
      </div>
    </div>

    <h1 v-if="!currentPortofolio && !loading" style="color:red;">
      Portofolio does not exist
    </h1>
  </div>
</template>

<script>
//Don't forget to add a loader spinner!
import { db } from "../config/db";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      currentPortofolio: undefined,
      projects: [],
      unsubscribe: undefined,
      animated: false,
      show: true,
      loading: false,
    };
  },
  methods: {
    animate() {
      this.animated = true;
    },
    hideButton() {
      window.onscroll = () => {
        if (pageYOffset > 0) {
          this.show = !this.show;
        }
        if (pageYOffset <= 0) {
          this.show = !this.show;
        }
      };
    },
    async getPortofolio(userId) {
      this.loading = true;
      if (this.projects.length > 0) this.projects = [];
      await db
        .collection("portofolios")
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.currentPortofolio = doc.data();
            console.log(this.currentPortofolio);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            this.currentPortofolio = undefined;
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
      if (this.currentPortofolio) await this.getProjects(userId);
      console.log(this.projects);
      this.loading = false;
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
    methodThatForcesUpdate() {
      // ...
      this.$forceUpdate(); // Notice we have to use a $ here
      // ...
    },
  },
  computed: {
    ...mapGetters(["getProjectsForPortofolio"]),
  },
  created() {
    // this.loading = true;
    const initialUserId = this.$route.params.id;
    this.getPortofolio(initialUserId);
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
}
.spring-spinner,
.spring-spinner * {
  box-sizing: border-box;
}

.spring-spinner {
  margin-top: 250px;
  height: 60px;
  width: 60px;
}

.spring-spinner .spring-spinner-part {
  overflow: hidden;
  height: calc(60px / 2);
  width: 60px;
}

.spring-spinner .spring-spinner-part.bottom {
  transform: rotate(180deg) scale(-1, 1);
}

.spring-spinner .spring-spinner-rotator {
  width: 60px;
  height: 60px;
  border: calc(60px / 7) solid transparent;
  border-right-color: #0d6efd;
  border-top-color: #0d6efd;
  border-radius: 50%;
  box-sizing: border-box;
  animation: spring-spinner-animation 3s ease-in-out infinite;
  transform: rotate(-200deg);
}

@keyframes spring-spinner-animation {
  0% {
    border-width: calc(60px / 7);
  }
  25% {
    border-width: calc(60px / 23.33);
  }
  50% {
    transform: rotate(115deg);
    border-width: calc(60px / 7);
  }
  75% {
    border-width: calc(60px / 23.33);
  }
  100% {
    border-width: calc(60px / 7);
  }
}

html {
  scroll-behavior: smooth;
  overflow: auto;
}

.wrapper {
  position: absolute;
  background-image: url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1907&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  color: #1b150d;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
}
.content {
  position: relative;
  display: flex;
  /* flex-flow: column; */
  flex-direction: column;
  align-content: center;
  align-items: center;
  color: $w;
  padding-top: 100px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );
}
.header {
  position: relative;
  display: flex;
  /* flex-flow: column; */
  flex-direction: column;
  flex: 0 1 auto;
  align-items: center;
  // margin: 25px;
  background-color: rgba(gray, 0.5);
  padding: 20px;
  border-radius: 30px;
  &-image {
    border-radius: 50%;
    border: 1px solid $w;
    width: 300px;
    height: 300px;
  }
  &-name {
    top: auto;
    margin-top: 10%;
    margin-bottom: 0;
    font-size: 70px;
    font-weight: 400;
  }
  &-occupation {
    font-size: 40px;
    font-family: "Raleway";
    padding: 0.35em 2.75em 0.35em 2.75em;
    margin: 1.25em;
    border-top: 1px solid $w;
    border-bottom: 1px solid $w;
  }
  &-socials {
    padding: 1em 2.75em 1em 2.75em;
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
.more-details {
  background-color: transparent;
  border: none;
  margin-top: auto;
  text-decoration: none;
  font-weight: bolder;
  font-size: 17px;
  color: $w;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
  &:hover {
    cursor: pointer;
  }
}

#details {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // justify-items: center;
  align-items: center;
  background-color: transparent;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
  // padding-top: 5em;
}
// .more-details:hover {
//   cursor: pointer;
// }
</style>
