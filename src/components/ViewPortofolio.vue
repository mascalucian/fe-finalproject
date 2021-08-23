<template>
  <div v-if="currentPortofolio">
    <div class="content background-image">
      <!-- <p>View portofolio works!</p>
      <div id="cover">
        <img src="../assets/images/cover.png" />
      </div> -->
      <div class="header">
        <i class="fas fa-laptop-code fa-10x"></i>
        <h1 class="name">
          {{ currentPortofolio.firstName }}
          {{ currentPortofolio.lastName }}
        </h1>

        <div class="occupation">
          {{ currentPortofolio.title }}
        </div>
      </div>
      <a href="#about" class="more-details"
        >More details
        <br />
        <strong>⌄</strong>
      </a>
      <div id="about"></div>
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
    <!-- <div id="about">Dummy text</div> -->
  </div>

  <h1 v-else style="color:red;">
    Portofolio does not exist
  </h1>
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
    };
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
    const initialUserId = this.$route.params.id;
    this.getPortofolio(initialUserId);
  },
  unmounted() {
    if (this.currentPortofolio) {
      this.unsubscribe();
    }
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
/* body {
  background-image: url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1907&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  color: #1b150d;
} */
html {
  scroll-behavior: smooth;
}
.background-image {
  background-image: url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1907&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  color: #1b150d;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
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
  margin-top: auto;
  text-decoration: none;
  font-weight: bolder;
  font-size: 17px;
  color: $w;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
