<template>
  <div class="details-projects-content">
    <div class="card">
      <div
        class="project-image vld-parent"
        ref="projectContainer"
        :style="{
          backgroundImage: `url(${imgUrl ||
            'https://www.poynter.org/wp-content/uploads/2021/08/mmp_illustration_sunset_showcase_red_1920x1080-1500x844.jpeg'})`,
        }"
      >
        <loading
          v-model:active="isLoading"
          :is-full-page="false"
          :background-color="'#ffffff'"
          :color="'#000000'"
        ></loading>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ project.title }}</h5>
        <p class="card-text">{{ project.description }}</p>
        <p class="card-text"></p>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Project",
  data() {
    return {
      imgUrl: "",
      isLoading: true,
    };
  },
  components: {
    Loading,
  },
  props: {
    project: Object,
  },
  methods: {
    async downloadPicture() {
      var storageRef = firebase.storage().ref();
      var ppRef = storageRef.child(
        `/${this.project.userId}/projects//${this.project.id}/project.jpg`
      );
      const that = this;
      await ppRef
        .getDownloadURL()
        .then((url) => {
          this.imgUrl = url;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.isLoading = false));
    },
    stopLoading() {
      this.isLoading = false;
    },
  },
  created() {
    this.downloadPicture();
  },
};
</script>

<style lang="scss">
.details-projects-content {
  display: inline-block;
  flex: 0 1 0;
}

.card-body {
  color: black;
  min-width: 25rem;
  font-family: $f-w;
  font-style: normal;
  word-break: break-word;
}

h5 {
  font-size: xx-large;
  font-weight: bolder;
  font-family: $f-o;
}

.project-image {
  height: 15rem;
  margin: 0.4rem;
  border-radius: 0.3rem;
  border: 1px solid white;
  background-size: cover;
  background-position: center;
}
</style>
