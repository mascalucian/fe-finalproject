<template>
  <p>Portofolios works!</p>
  <p>All portofolios will be displayed here</p>
  <h1>Featured on portofol.io</h1>
    <div class="all">
      <FeaturedPortfolio
        v-for="portofolio in allPortofolios"
        v-bind:key="portofolio.id"
        :fname="portofolio.firstName"
        :lname="portofolio.lastName"
        :title="portofolio.title"
        :about="portofolio.about"
      />
    </div>
</template>

<script>
import FeaturedPortfolio from "../ui/FeaturedPortfolio.vue";
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../config/db";
export default {
  name: "Portofolios",
  components: {
    FeaturedPortfolio,
  },
  data() {
    return {
      unsubscribe: undefined,
    };
  },
  computed: {
    //ai nevoie doar de allPortofolios, il poti folosi apoi in v-for portofolio in allPortofolios
    ...mapGetters(
      ["allPortofolios"] // -> this.someGetter
    ),
  },
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
  methods: {
    methodThatForcesUpdate() {
      // ...
      this.$forceUpdate(); // Notice we have to use a $ here
      console.log("hehe. Rerendered!");
    },
  },
  unmounted() {
    this.unsubscribe();
  },
};
</script>

<style scoped>
.all {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.each {
flex: 1 0 30%;
}
</style>
