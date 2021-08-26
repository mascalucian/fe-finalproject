<template
  ><div style="position: relative">
    <header>
      <h1>Contact us!</h1>
    </header>
    <main>
      <div>
        <h3>
          For any business related inquiries, please feel free to contact us at:
        </h3>
        <a href="mailto:business@portofol.io">business@portofol.io</a>
      </div>
      <div>
        <h3>
          Found a bug? Problems with your portofol.io? Contact us at:
        </h3>
        <a href="mailto:support@portofol.io">support@portofol.io</a>
      </div>
      <div>
        <h3>Pay us a visit!</h3>
        <a href="https://goo.gl/maps/VuXacGtsiH7g5cC36" target="_blank"
          >Strada Burlanelor nr. 10, Comuna Udați-Mânzu, Județul Buzău,
          Romania</a
        >
        <div>
          <GoogleMap
            api-key="AIzaSyChAjp5DnMOrs3YFbiR2-RYtjKSiOWkG5E"
            style="width: 100%; height: 500px; margin:auto;"
            :center="center"
            :zoom="13"
          >
            <Marker :options="{ position: center }" />
          </GoogleMap>
        </div>
      </div>
    </main></div
></template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  components: { GoogleMap, Marker },
  data() {
    return {
      map: undefined,
    };
  },
  setup() {
    const center = { lat: 44.98434743235775, lng: 26.949548670858224 };
    return { center };
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: center;
  background-repeat: repeat-x;
  background-image: url("https://media.istockphoto.com/vectors/bright-seamless-pattern-with-orange-slices-vector-id1305791045?b=1&k=6&m=1305791045&s=612x612&w=0&h=7N354TSz_-ZYq5xz7lAisjzcFKiKDJgggbhP3V0BxwM=");
  background-position-y: center;
  border-bottom: 8px solid rgba(42, 158, 207, 0.45);
  h1 {
    display: inline-block;
    font-family: $f-o;
    font-weight: bolder;
    font-size: xxx-large;
    color: $w;
    background-color: $o;
    border: 3px solid rgba(42, 158, 207, 0.45);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1.5rem 5rem;
    border-radius: 100px;
    margin: 5rem 0;
  }
}
main {
  background-color: $o-4;
  padding: 2rem 4rem;
  div {
    background-color: $s-1;
    padding: 1rem;
    border-radius: 40px;
    margin: 1rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    div {
      margin: auto;
      box-shadow: none;
      div {
        border: 3px solid rgba(42, 158, 207, 0.45);
        border-radius: 0;
        padding: 0;
        margin: auto;
        margin-top: -2rem;
      }
    }
    h3 {
      color: black;
      font-family: $f-o;
      border-bottom: 1px solid black;
      margin-bottom: 1rem;
      margin-top: 0.5rem;
      padding: 0 2rem;
      font-size: $big;
      text-align: center;
    }
    a {
      cursor: pointer;
      font-size: $big;
      font-family: $f-w;
      color: $w;
      text-align: center;
      display: block;
      padding: 0.5rem;
      &:hover,
      :active,
      :focus-visible {
        color: $o-6;
      }
    }
  }
}
</style>
