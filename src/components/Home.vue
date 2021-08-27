<template>
  <div class="h1div">
    <h1>Welcome to</h1>
    <img src="https://i.imgur.com/MGp2X3f.png" class="biglogo" />
  </div>
  <div class="h1div">
    <h1>Here are our Top 3 picks:</h1>
  </div>
  <div class="all">
    <FeaturedPortfolio
      v-for="portofolio in featuredPortofolios"
      v-bind:key="portofolio"
      :fname="portofolio.firstName"
      :lname="portofolio.lastName"
      :title="portofolio.title"
      :about="portofolio.about"
      :idd="portofolio.userId"
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
      featuredPortofolios: [],
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
    db.collection("portofolios")
      .limit(3)
      .onSnapshot((snapshotChange) => {
        snapshotChange.forEach((doc) => {
          this.featuredPortofolios.push(doc.data());
        });
      });
    // this.$store.dispatch("bindPortofolios");
    // this.unsubscribe = db.collection("portofolios").onSnapshot((snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     if (change.type === "added") {
    //       this.methodThatForcesUpdate();
    //     }
    //     if (change.type === "modified") {
    //       this.methodThatForcesUpdate();
    //     }
    //     if (change.type === "removed") {
    //       this.methodThatForcesUpdate();
    //     }
    //   });
    // });
  },
  methods: {
    methodThatForcesUpdate() {
      // ...
      this.$forceUpdate(); // Notice we have to use a $ here
      console.log("hehe. Rerendered!");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato:100&display=swap");
.all {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.each {
  flex: 1 0 30%;
}
h1 {
  padding-top: 25px;
  text-align: center;
  align-content: center;
  align-items: center;
  font-size: 33px;
  margin-bottom: -20px;
  font-family: "Montserrat", sans-serif;
}
.h1div {
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
}

@media screen and (max-width: 900px) {
  .biglogo {
    width: 80vw;
    padding-top: 20px;
    padding-bottom: 60px;
  }
}
</style>
