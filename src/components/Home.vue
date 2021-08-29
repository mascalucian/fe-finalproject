<template>
  <div id="wrapper">

  <div class="bigheader">
    <div class="h1div upup">
      <h1>Welcome to</h1>
      <img src="https://i.imgur.com/MGp2X3f.png" class="biglogo" />
      
    </div>
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
    <div class="firstflex up">
            <div>
              <img src="../ui/img/porto.png" class="portosize">
            </div>
            <div>
              <h1 class="title">Your favourite recruitment platform!</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <div>
      <Landing />
    </div>
    <div class="h1div">
      <h2 class="title">Here are our Top 3 picks</h2>
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
    <div id="conditional-screen">
      <div v-if="!isLoggedin">
        Create an account!
      </div>
      <div v-if="isLoggedin && !getHasPortofolio">
        Create your portofol.io now!
      </div>
      <div v-if="isLoggedin && getHasPortofolio">
        Update your portofol.io now!
      </div>
    </div>
  </div>
</template>

<script>
import FeaturedPortfolio from "../ui/FeaturedPortfolio.vue";
import Landing from "../ui/Landing.vue";
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../config/db";

export default {
  name: "Home",
  components: {
    Landing,
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
      ["allPortofolios", "isLoggedin", "getHasPortofolio"] // -> this.someGetter
    ),
  },
  created() {
    db.collection("portofolios")
      .orderBy("visits")
      .limitToLast(3)
      .onSnapshot((snapshotChange) => {
        this.featuredPortofolios = [];
        snapshotChange.forEach((doc) => {
          this.featuredPortofolios.push(doc.data());
        });
      });
    this.unsubscribe = db
      .collection("portofolios")
      .orderBy("visits")
      .limitToLast(3)
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
  methods: {
    methodThatForcesUpdate() {
      // ...
      this.$forceUpdate(); // Notice we have to use a $ here
      console.log("hehe. Rerendered!");
    },
  },
  unmounted() {
    this.unsubscribe;
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
.upup {
  margin-top: -340px;
}
.up {
  margin-top: -40px;
}
.bigheader {
  background-image: url('https://startup.info/wp-content/uploads/2021/02/simon-matzinger-320332-unsplash-scaled.jpg');
  background-position-y: -250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom  : 2px solid darkorange;
 padding-bottom : 1.5em;  
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

  font-family: "Montserrat", sans-serif;
}
h2 {
  padding-top: 15px;
  margin-bottom: -10px;
}
.h1div {
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #2c3e50;
  margin-bottom: 40px;
}

@media screen and (max-width: 900px) {
  .biglogo {
    width: 80vw;
    padding-top: 20px;
    padding-bottom: 70px;
    margin-bottom: 10px;
  }
}
.portosize {
  width: 40px;
}
.firstflex {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
.jobpicdim {
  height: 198px;
}
.titledescr {
  display: flex;
  justify-content: center;
  align-items: center;
}
.description {
  margin-bottom: 25px;
}
.btn-primary {
  background-color: orange;
  border-color: orange;
  margin: 3px;
}
.btn-primary:hover {
  background-color: black;
  border-color: black;
}
.btn-primary:focus {
  background-color: black;
  border-color: black;
}
h2 {
  margin-top: 20px;
}
h4 {
  margin-top: 20px;
  text-shadow: 1px 1px darkorange;
}
.text-primary {
  color: orange !important;
}
.description {
  background-color: rgba(165, 100, 14, 0.103);
  border-radius: 20px;
  padding: 4px;
}
@media screen and (max-width:600px) {
  .firstflex {
    flex-direction: column;
  }
}
</style>
