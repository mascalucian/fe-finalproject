<template>
  <div v-if="currentPortofolio">
    <p>View portofolio works!</p>
    <h4>
      Currently viewing: {{ currentPortofolio.firstName }}
      {{ currentPortofolio.lastName }}'s portofolio.
    </h4>
    <div v-if="projects.length > 0">
      <p>Projects:</p>
      <span v-for="project in projects" v-bind:key="project.id">
        {{ project.description }}
      </span>
    </div>
    <div v-else>
      <h5 style="color:red">No projects found!</h5>
    </div>
  </div>
  <h1 v-if="!currentPortofolio" style="color:red;">
    Portofolio does not exist
  </h1>
</template>

<script>
import { db } from "../config/db";
export default {
  data() {
    return {
      currentPortofolio: undefined,
      projects: [],
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
      await db
        .collection("projects")
        .where("userId", "==", userId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            this.projects.push(doc.data());
            console.log(this.projects);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
  },
  created() {
    const initialUserId = this.$route.params.id;
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        if (toParams.id && toParams.id !== previousParams) {
          this.getPortofolio(toParams.id);
        }
      }
    );
    this.getPortofolio(initialUserId);
  },
};
</script>

<style scoped></style>
