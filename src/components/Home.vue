<template>
  <div>
    <h1>Featured on portofol.io</h1>
    <FeaturedPortfolio fname="Lucian" lname="Masca" />
    <div>
      <FeaturedPortfolio
        v-for="portofolio in allPortofolios"
        v-bind:key="portofolio.id"
        :fname="portofolio.firstName"
        :lname="portofolio.lastName"
      />
    </div>
  </div>
</template>

<script>
import FeaturedPortfolio from "../ui/FeaturedPortfolio.vue";
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../config/db";
export default {
  name: "Home",
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

<style scoped></style>
