<template
  ><div>
    <main>
      <h1>Oops!</h1>
      <p>We couldn't find what you were looking for on our website.</p>
      <div id="button-wrapper">
        <router-link to="/">Go back to Home Page</router-link>
      </div>
    </main>
  </div></template
>

<script>
export default {};
</script>

<style scoped lang="scss">
div {
  height: 100%;
  padding: 2% 10%;
  main {
    h1 {
      font-size: 3rem;
      font-family: $f-o;
      text-transform: uppercase;
    }
    margin: auto;
    font-family: $f-w;
    font-size: 1.5rem;
    height: 90%;
    background-color: white;
    border-radius: 45px;
    padding: 3rem 2rem;
    border: 1px solid black;
    background-image: url("https://coloringonly.com/images/imgcolor/1533174721-laugh-the-annoying-orange-a4.jpg");
    background-size: 200px;
    background-repeat: no-repeat;
    background-position: 90% 90%;
    #button-wrapper {
      padding: 0 !important;
      margin-top: 15%;
      margin-bottom: 18%;
      display: inline-block;
      width: 100%;
      height: auto;
    }
    a {
      white-space: nowrap;
      width: 100%;
      cursor: pointer;
      background-color: $o;
      color: $w;
      padding: 2% 5%;
      border-radius: 3rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
      &:hover,
      :active,
      :focus-visible {
        background-color: $sh;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.26);
      }
    }
  }
}

@media screen and (max-width: 600px) {
  div {
    padding: 1%;
  }

  #button-wrapper {
    margin-top: 25%;
  }
}
</style>
