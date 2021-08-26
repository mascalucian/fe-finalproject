<template
  ><div>
    <main>
      <h1>Oops!</h1>
      <p>We couldn't find what you were looking for on our website.</p>
      <div>
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
  padding: 1rem 3rem;
  main {
    h1 {
      font-size: 3rem;
      font-family: $f-o;
      text-transform: uppercase;
    }
    font-family: $f-w;
    font-size: 1.5rem;
    height: 30rem;
    background-color: white;
    border-radius: 45px;
    padding: 3rem 2rem;
    border: 1px solid black;
    background-image: url("https://coloringonly.com/images/imgcolor/1533174721-laugh-the-annoying-orange-a4.jpg");
    background-size: 200px;
    background-repeat: no-repeat;
    background-position: 90% 90%;
    div {
      padding-top: 5rem;
    }
    a {
      width: auto;
      cursor: pointer;
      background-color: $o;
      color: $w;
      padding: 1rem 2rem;
      border-radius: 30px;
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
</style>
