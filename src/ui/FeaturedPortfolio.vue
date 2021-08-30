<template>
  <div class="portfolioo eachh vld-parent">
    <div class="infoboxx  shadow">
      <div class="image-wrapper vld-parent">
        <loading
          v-model:active="isLoading"
          :is-full-page="false"
          :background-color="'none'"
        ></loading>
        <img :src="`${imgURL}`" class="avatar" v-if="imgURL" />
      </div>
      <h2 class="h22" id="name">{{ fname }} {{ lname }}</h2>
      <h4 class="h44" id="title">{{ title }}</h4>
      <p class="pp">{{ about }}</p>
      <div class="containerr">
        <div class="centerr">
          <router-link :to="`/portofolios/${idd}`">
            <button class="btnn">
              <svg
                width="180px"
                height="60px"
                viewBox="0 0 180 60"
                class="border"
              >
                <polyline
                  points="179,1 179,59 1,59 1,1 179,1"
                  class="bg-line"
                />
                <polyline
                  points="179,1 179,59 1,59 1,1 179,1"
                  class="hl-line"
                />
              </svg>
              <span>VIEW MORE</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
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
      imgURL: "",
      isLoading: true,
    };
  },
  components: {
    Loading,
  },
  methods: {
    getpp() {
      var storageRef = firebase.storage().ref();
      var ppRef = storageRef.child(`/${this.idd}/profile_picture.jpg`);
      var linku = ppRef
        .getDownloadURL()
        .then((url) => {
          console.log("A mers " + url);
          this.imgURL = url;
        })
        .catch(function(error) {})
        .finally(() => (this.isLoading = false));
    },
  },
  created() {
    this.getpp();
  },
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
.eachh {
  flex: 0 1 33%;
}
.image-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  min-height: 40px !important;
  justify-content: center;
}
.maincontainerr {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

h2 {
  margin: 5% 5%;
}
h4 {
  display: block;
  width: 100%;
  margin: 5% 5%;
  text-align: center;
}
.portfolioo {
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
  max-width: 30rem;
  flex-grow: 0.5;
  margin-top: 10rem;
  height: 450px !important;
  flex: 1 1 auto;
}
.portfolioo .avatar {
  border-radius: 50%;
  display: block;
  width: 146px;
  height: 146px;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  background-image: url("https://wallpaperaccess.com/full/888745.jpg");
}
.portfolioo .avatar2 {
  margin-top: -10px;
}
.portfolioo .infoboxx {
  background-image: url("https://wallpaperaccess.com/full/888745.jpg");
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 25%;
  border-bottom-right-radius: 25%;
  height: 100%;
  width: 100%;
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
  text-align: center;
}
#title {
  margin-top: -20px;
  font-family: "Montserrat", sans-serif;
}
.pp {
  position: relative;
  margin: 5% 8%;
  flex-grow: 1;
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
  margin-top: 0;
  text-align: justify;
  text-indent: 3rem;
  max-height: 25rem;
}

.pp:before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(transparent 80%, rgb(254, 208, 114));
}
@import url("https://fonts.googleapis.com/css?family=Lato:100&display=swap");
.containerr {
  display: flex;
  font-family: "Montserrat", sans-serif;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
}
.centerr {
  width: 180px;
  height: 60px;
  margin-bottom: 10%;
  margin-top: auto;
}
.btnn {
  position: relative;
  width: 180px;
  height: 60px;
  cursor: pointer;
  background: transparent;
  border: 1px solid #fff;
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
  color: white;
}
.btnn:hover svg {
  stroke-dashoffset: -480;
}
.btnn span {
  color: black;
  font-size: 18px;
  font-weight: 100;
}
.h44 {
  padding: 10px;
  font-size: 20px;
}
@media screen and (max-width: 700px) {
  .portfolioo {
    width: 90%;
    flex-grow: 1;
  }
}
</style>
