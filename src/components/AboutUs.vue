<template>
  <header>
    <h1>About us</h1>
  </header>
  <main>
    <div class="my-card">
      <img src="http://imgur.com/ua1wx.jpg" />
      <span class="card-content">
        <p>
          Our story starts 1 week ago, during our Frontend Internship when our
          team was chilling at <strong>Templul Manelelor</strong> in Costinești,
          Constanța, Romania. Our Frontend mentor tasked us with creating a
          portfolio website, not individual ones, but rather as a team. We
          thought why not harnessing the power of colaboration and rather then
          design our own portfolio websites, why not create a platform where
          anyone could create and host their portfolio website, free of charge.
        </p>
      </span>
    </div>
    <div class="my-card">
      <img
        src="https://www.funmag.org/wp-content/uploads/2012/09/funny-orange-peel-04.jpg"
      />
      <span class="card-content">
        <p>
          And thus <strong>Portofol.io</strong> got it's start. A free platform
          where anyone cand join and host their own modern professional grade
          portfolio. We're constantly working on adding new features and we'd
          like to take a moment to thank our community for their utmost support.
        </p>
      </span>
    </div>
    <div class="my-card">
      <img
        src="https://ruinmyweek.com/wp-content/uploads/2017/06/funny-pics-to-share-orange-slices-in-a-huddle.jpeg"
      />
      <span class="card-content">
        <p>
          Our project started up as an assignment but we'd never thought to see
          it go to such heights! We are forever endebted to our own friends and
          family for keeping us on the right track and keep this project afloat
          and constantly expanding.
        </p>
        <p style="text-align:right">
          <em>
            The Portofol.io Team
          </em>
        </p>
      </span>
    </div>
  </main>
</template>

<script>
export default {};
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
    margin: auto;
    border: 3px solid rgba(42, 158, 207, 0.45);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1.5rem 5rem;
    border-radius: 100px;
    margin: 3rem 0;
  }
}

main {
  padding: 3rem 6rem;
}
img {
  overflow: hidden;
  height: auto;
  max-width: 30rem;
  object-fit: contain;
  display: inline-block;
  margin: 1rem 0;
  border: 1px solid black;
  flex: 1 1 auto;
}

.card-content {
  min-width: 300px;
  height: 100%;
  display: inline-block;
  font-family: $f-w;
  font-size: 1.5rem;
  text-indent: 4rem;
  text-align: justify;
  overflow: hidden;
  flex: 1 1 0;
  margin: 1rem 2rem;
}

.my-card {
  min-width: 20rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  color: black;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
}

.my-card:nth-child(odd) {
  flex-direction: row;
  background-color: $w;
}

.my-card:nth-child(even) {
  flex-direction: row-reverse;
  background-color: rgb(255, 235, 197);
}

@media screen {
}
</style>
