<template>
  <div class="background">
    <div class="page-header page-header-small">
      <parallax class="page-header-image"> </parallax>
      <div class="content-center">
        <div class="container">
          <div class="text-center">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              class="btn btn-primary btn-icon btn-round"
            >
              <i class="fab fa-facebook-square"></i>
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              class="btn btn-primary btn-icon btn-round"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              href="https://google.com/"
              target="_blank"
              class="btn btn-primary btn-icon btn-round"
            >
              <i class="fab fa-google-plus"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="section section-about-us">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h2 class="title">Who are we?</h2>
            <div id="column-wrapper">
              <h5 class="description">
                The best free platform where anyone can join and host their own
                modern professional grade portfolio. So what are you waiting
                for? Add your portofol.io to get noticed by recruiters!
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section section-team text-center">
      <div class="container">
        <h2 class="title">Everything in one place</h2>
        <div class="team">
          <div class="row">
            <div class="col-md-4">
              <div class="team-player">
                <img
                  src="https://png.pngtree.com/png-vector/20190420/ourlarge/pngtree-vector-engineer-icon-png-image_969576.jpg"
                  alt="Thumbnail Image"
                  class="rounded-circle img-fluid img-raised jobpicdim"
                />
                <h4><p class="category text-primary title">Tech</p></h4>
                <p class="description">
                  The unique strengths of our IT recruitment and training
                  services are our pro mentors, our proven, customisable
                  training methodology and an ever-growing tech talent network.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="team-player">
                <img
                  src="https://i.pinimg.com/originals/64/34/d7/6434d72ce9e16251c4f41f4e5a146567.png"
                  alt="Thumbnail Image"
                  class="rounded-circle img-fluid img-raised jobpicdim"
                />
                <!-- <h4 class="title">Ryan Tompson</h4> -->
                <h4>
                  <p class="category text-primary title">Medical & Health</p>
                </h4>
                <p class="description">
                  The Health Care Worker is responsible for providing evidence
                  based Health care in accordance with the care plan developed
                  in collaboration with their medical officer and other members
                  of the health care team.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="team-player">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7UclyLMrFOmR4JMiJmH-m2rymahRvQ4PkZZI4vUgN-k3-gK1xTtQSIueITAdtQhpr4iw&usqp=CAU"
                  alt="Thumbnail Image"
                  class="rounded-circle img-fluid img-raised jobpicdim"
                />
                <h4><p class="category text-primary title">Law & Legal</p></h4>
                <p class="description">
                  Lawyers are certified professionals who advise and represent
                  natural and juristic persons in legal matters. They counsel
                  clients and represent them in criminal and civil court
                  proceedings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.portosize {
  width: 40px;
}
.firstflex {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}

#column-wrapper {
  background-color: rgba(165, 100, 14, 0.103);
  border-radius: 20px;
  padding: 4px;
  width: 100%;
}

.text-center {
  padding-top: 30px;
}
.jobpicdim {
  height: 198px;
}
.background {
  /* background-image: linear-gradient(#CF8A91, #FFF3B8); */
  background-image: url("https://wallpaperaccess.com/full/1556714.jpg");
  background-size: cover;
  border-bottom: 2px solid darkorange;
  padding-bottom: 1.5em;
}
.titledescr {
  display: flex;
  justify-content: center;
  align-items: center;
}
.description {
  margin: 10% 0;
  font-family: $f-w;
}
.btn-primary {
  background-color: orange;
  border-color: orange;
  margin: 3px;
}
.btn-primary:hover {
  background-color: black;
  border-color: black;
}
.btn-primary:focus {
  background-color: black;
  border-color: black;
}
h2 {
  margin: 10% 0;
  font-size: 2.5rem;
  font-weight: bold;
}
h4 {
  margin-top: 20px;
  text-shadow: 1px 1px darkorange;
}
.text-primary {
  color: orange !important;
}

@media screen and (max-width: 600px) {
  .firstflex {
    flex-direction: column;
  }
}
</style>
