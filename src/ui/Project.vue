<template>
  <div class="details-projects-content">
    <div class="card">
      <img
        class="card-img-top"
        src="../assets/images/tst.jpg"
        alt="Card image cap"
      />
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
export default {
  name: "Project",
  props: {
    project: Object,
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
}

h5 {
  font-size: xx-large;
  font-weight: bolder;
  font-family: $f-o;
}
</style>
