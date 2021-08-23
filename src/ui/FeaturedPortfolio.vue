<template>
      <div class="portfolio each">
        <div class="infobox">
          <h2 id="name">{{ fname }} {{ lname }}</h2>
          <h4 id="title">{{title}}</h4>
          <p>{{about}}</p>
          <div class="container">
          <div class="center">
          <button class="btn">
                <svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
                <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
                <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
                </svg>
                <span>VIEW MORE</span>
          </button>
          </div>
          </div>
        </div>
        <div><img src="../assets/default.png" class="avatar" /></div>
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
    title: String,
    about: String,
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
  padding: 10px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
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
  height: 500px;
  background-image: url("https://wallpaperaccess.com/full/888745.jpg");
  display: flex;
  flex-direction: column;
  align-items: center;
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
#title {
    margin-top: -20px;
}
p {
    padding: 25px;
    height:140px;
    overflow:hidden;
}
@import url('https://fonts.googleapis.com/css?family=Lato:100&display=swap');

.container {

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
}

.center {
  width: 180px;
  height: 60px;
  position: absolute;
}

.btn {
  width: 180px;
  height: 60px;
  cursor: pointer;
  background: transparent;
  border: 1px solid #91C9FF;
  outline: none;
  transition: 1s ease-in-out;
}

svg {
  position: absolute;
  left: 0;
  top: 0;
  fill: none;
  stroke: #fff;
  stroke-dasharray: 150 480;
  stroke-dashoffset: 150;
  transition: 1s ease-in-out;
}

.btn:hover {
  transition: 1s ease-in-out;
  background: #4F95DA;
}

.btn:hover svg {
  stroke-dashoffset: -480;
}

.btn span {
  color: white;
  font-size: 18px;
  font-weight: 100;
}



</style>
