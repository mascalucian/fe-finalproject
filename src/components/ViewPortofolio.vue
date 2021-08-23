<template>
  <div v-if="currentPortofolio">
    <p>View portofolio works!</p>
    <h4>
      Currently viewing: {{ currentPortofolio.firstName }}
      {{ currentPortofolio.lastName }}'s portofolio.
    </h4>
    <div v-if="getProjectsForPortofolio.length > 0">
      <p>Projects:</p>
      <span v-for="project in getProjectsForPortofolio" v-bind:key="project.id">
        {{ project.title }}<br />
      </span>
    </div>
    <div v-else>
      <h5 style="color:red">No projects found!</h5>
    </div>
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

<style scoped></style>
