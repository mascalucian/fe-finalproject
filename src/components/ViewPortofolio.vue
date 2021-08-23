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
        <div v-if="!show" class="header">
          <i class="fas fa-laptop-code fa-10x"></i>
          <h1 class="name">
            {{ currentPortofolio.firstName }}
            {{ currentPortofolio.lastName }}
          </h1>

          <div class="occupation">
            {{ currentPortofolio.title }}
          </div>
        </div>
        <button
          @click="
            animate;
            show = !show;
          "
          v-if="!show"
          class="more-details"
        >
          More details
          <!-- <br /> -->
          <i class="fas fa-chevron-down"></i>
        </button>
        <div
          :class="{ 'fadeInUp animated': animated, delay: 500 }"
          @animationend="animated = false"
          v-if="show"
          id="about"
        >
          <button
            @click="
              show = !show;
              animate;
            "
            class="more-details"
          >
            <i class="fas fa-chevron-up"></i>

            <!-- <br /> -->
            Go back
          </button>
          <!-- <div class="test">AIA E COAE</div> -->
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
        </div>
      </div>
      <!-- <div id="about">Dummy text</div> -->
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
      show: false,
      loading: false,
      // animationObject: {
      //   classes: "fadeInUp",
      //   delay: 5000,
      //   duration: 5000,
      // },
    };
  },
  methods: {
    animate() {
      this.animated = true;
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
.test {
  height: 100vh;
  max-height: 100%;
  background-color: $w;
}

html {
  scroll-behavior: smooth;
  overflow: auto;
}

.background-image {
  background-image: url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1907&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  color: #1b150d;
  width: 100vw;
  max-width: 100%;
  height: 93.5vh;
  max-height: 100%;
}
.content {
  display: flex;
  /* flex-flow: column; */
  flex-direction: column;
  align-content: center;
  align-items: center;
  color: $w;
}
.header {
  display: flex;
  /* flex-flow: column; */
  flex-direction: column;
  flex: 0 1 auto;
  align-items: center;
  margin: 25px;
  .name {
    top: auto;
    margin-top: 10%;
    margin-bottom: 0;
    font-size: 70px;
    font-weight: 400;
  }
  .occupation {
    font-size: 40px;
    font-family: "Raleway";
    padding: 0.25em 2.75em 0.25em 2.75em;
    margin: 0.5em;
    border-top: 1px solid $w;
    border-bottom: 1px solid $w;
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
  // margin-top: 360px;
  &:hover {
    cursor: pointer;
  }
}

// .more-details:hover {
//   cursor: pointer;
// }
</style>
