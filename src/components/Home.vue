<template>
  <div class="h1div">
  <h1>Welcome to </h1>
  <img src="https://i.imgur.com/MGp2X3f.png" class="biglogo">
  </div>
  <div class="h1div">
  <h1>Here are our Top 3 picks: </h1>
  </div>
    <div class="all">
      <FeaturedPortfolio
        v-for="portofolio in allPortofolios"
        v-bind:key="portofolio"
        :fname="portofolio.firstName"
        :lname="portofolio.lastName"
        :title="portofolio.title"
        :about="portofolio.about"
        :idd="portofolio.userId"
        :imgURL="url"
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

<style scoped>
.all {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.each {
flex: 1 0 30%;
}
h1 {
 text-align: center;
 align-content: center;
 align-items: center;
 font-size: 40px;
 margin-bottom: -20px;
 
}
.h1div {
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media screen and (max-width: 900px) {
  .biglogo {
    width: 80vw;
    padding-top: 20px;
    padding-bottom: 60px;
  }
}
</style>
