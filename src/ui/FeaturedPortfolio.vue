<template>
  <div class="all">
    <div class="maincontainer">
      <div class="portfolio">
        <div class="infobox">
          <h2 id="name">{{ fname }} {{ lname }}</h2>
        </div>
        <div><img src="../assets/default.png" class="avatar" /></div>
      </div>
      <!-- <div class="portfolio">
            <div class="infobox infobox2">
                <h2 id="name">
                    da
                </h2>
            </div>
            <div><img src="../assets/default.png" class="avatar avatar2"></div>
        </div>
        <div class="portfolio">
            <div class="infobox">
                <h2 id="name">
                    Balotantu
                </h2>
            </div>
            <div><img src="../assets/default.png" class="avatar"></div>
        </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../config/db";
export default {
  name: "FeaturedPortfolio",
  props: {
    fname: String,
    lname: String,
  },
};
</script>

<style scoped>
.all {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 40px;
}
.maincontainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.portfolio {
  width: 27%;
  height: 510px;
  padding: 10px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: center;
}
.portfolio .avatar {
  border-radius: 50%;
  display: block;
  width: 146px;
  margin: auto;
  margin-top: 40px;
}
.portfolio .avatar2 {
  margin-top: -10px;
}
.portfolio .infobox {
  margin-top: -73px;
  width: 90%;
  height: 450px;
  background-image: url("https://wallpaperaccess.com/full/888745.jpg");
  display: flex;
  flex-direction: column;
}
.portfolio .infoboxcenter {
  margin-top: -78px;
  width: 90%;
  height: 460px;
  background-image: url("https://wallpaperaccess.com/full/888745.jpg");
}
#name {
  margin-top: 90px;
}
</style>
