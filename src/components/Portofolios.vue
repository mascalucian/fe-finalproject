<template>
  <div class="bg"></div>
  <div class="h1div">
    <h1>All the listings on</h1>
    <img src="https://i.imgur.com/MGp2X3f.png" class="biglogo" />
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

<style scoped lang="scss">
.bg {
  width: 100%;
  height: 10rem;
  background-image: $bg-i-o;
  background-position: center;
}
.all {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex-grow: 1;
  padding-top: 5%;
  padding-bottom: 10%;
  background-color: $w;
}
.each {
  flex: 1 0 30%;
}
h1 {
  text-align: center;
  font-size: 3rem;
  margin: 2% 0 0 0;
  font-family: "Montserrat", sans-serif;
  display: block;
  width: 100%;
  color: black;
}
.h1div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1 1 auto;
  border-bottom: 5px solid black;
  border-top: 5px solid black;
}

.biglogo {
  max-width: 70%;
  object-fit: contain;
}
@media screen and (max-width: 900px) {
  .biglogo {
    max-width: 90%;
  }
}
</style>
