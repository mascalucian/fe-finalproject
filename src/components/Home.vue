<template>
  <p>Home works!</p>
  <div>
        <h1>Featured on portofol.io</h1>
    </div>
  <FeaturedPortfolio fname="Lucian" lname="Masca"/>
    
  <FeaturedPortfolio v-for="portofolio in allPortofolios" v-bind:key="portofolio.id" fname="portofolio.firstName" lname="portofolio.lastName" />
</template>

<script>
import FeaturedPortfolio from '../ui/FeaturedPortfolio.vue'
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../config/db";
export default {
  name: "Home",
  components: {
    FeaturedPortfolio
  },
  computed: {
    //ai nevoie doar de allPortofolios, il poti folosi apoi in v-for portofolio in allPortofolios
    ...mapGetters(
      [
        "allPortofolios"
      ] // -> this.someGetter
    ),
  },
  created() {
    this.$store.dispatch("bindPortofolios");
  }
  }
</script>

<style scoped></style>
