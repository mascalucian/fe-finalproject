<template>
  <div
    v-if="getSnackBarMessage"
    :style="{ color: getSnackBarColor, backgroundColor: getSnackBarBackground }"
  >
    {{ getSnackBarMessage }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    //ai nevoie doar de allPortofolios, il poti folosi apoi in v-for portofolio in allPortofolios
    ...mapGetters(
      ["getSnackBarMessage", "getSnackBarColor", "getSnackBarBackground"] // -> this.someGetter
    ),
  },
};
</script>

<style lang="scss" scoped>
div {
  font-size: xx-large;
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 80%;
  border-radius: 30px;
  animation-name: appearance;
  animation-duration: 0.25s;
  padding: 1rem;
  z-index: 1000;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.26);
}

@keyframes appearance {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
