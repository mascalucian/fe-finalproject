<template>
      <div class="portfolioo eachh">
        <div class="infoboxx  shadow">
          <h2 class="h22" id="name">{{ fname }} {{ lname }}</h2>
          <h4 class="h44" id="title">{{title}}</h4>
          <p class="pp">{{about}}</p>
          <div class="containerr">
          <div class="centerr">
          <router-link :to='`/portofolios/${idd}`'>
          <button class="btnn">
                <svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
                <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
                <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
                </svg>
                <span>VIEW MORE</span>
          </button>
          </router-link>
          </div>
          </div>
        </div>
        <div><img :src='`${imgURL}`' class="avatar" /></div>
      </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { db } from "../config/db";
export default {
  name: "FeaturedPortfolio",
  props: {
    fname: String,
    lname: String,
    title: String,
    about: String,
    idd: String,
  },
  data() {
    return {
      imgURL:""
    }
  },
  methods: {
    getpp(){
         var storageRef = firebase.storage().ref();
         var ppRef = storageRef.child(`/${this.idd}/profile_picture.jpg`);
         var linku=ppRef.getDownloadURL().then (url=> {
           console.log("A mers "+url);
          this.imgURL=url;
        }).catch(function(error) {
          // Handle any errors here
        });
    }

  },
  created() { 
    this.getpp();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
.alll {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 40px;
}
.eachh{
  flex: 0 1 33%;  box-sizing: border-box;
}
.maincontainerr {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.portfolioo {
  
  padding: 10px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
}
.portfolioo .avatar {
  border-radius: 50%;
  display: block;
  width: 146px;
  height: 146px;
  object-fit: cover;
  margin: auto;
  margin-top: 40px;
}
.portfolioo .avatar2 {
  margin-top: -10px;
}
.portfolioo .infoboxx {
  margin-top: -73px;
  width: 90%;
  min-width: 400px;
  height: 400px;
  background-image: url("https://wallpaperaccess.com/full/888745.jpg");
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 25%;
  border-bottom-right-radius: 25%;
}
.portfolioo .infoboxcenter {
  margin-top: -78px;
  width: 90%;
  height: 400px;
  background-image: url("https://wallpaperaccess.com/full/888745.jpg");
}
#name {
  margin-top: 20px;
    font-family: "Montserrat", sans-serif;
}
#title {
    margin-top: -20px;
      font-family: "Montserrat", sans-serif;
}
.pp {
    padding: 25px;
    height:140px;
    overflow:hidden;
      font-family: "Montserrat", sans-serif;
}
@import url('https://fonts.googleapis.com/css?family=Lato:100&display=swap');

.containerr {

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
    font-family: "Montserrat", sans-serif;
  justify-content: center;
}

.centerr {
  width: 180px;
  height: 60px;
  position: absolute;
}

.btnn {
  width: 180px;
  height: 60px;
  cursor: pointer;

  background: transparent;
  border: 1px solid #ffffff;
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

.btnn:hover {
  transition: 1s ease-in-out;
  background: #f4690e;
}

.btnn:hover svg {
  stroke-dashoffset: -480;
}

.btnn span {
  color: white;
  font-size: 18px;
  font-weight: 100;
}

.h44{ 
  padding: 10px;
  font-size: 20px;
}





</style>
