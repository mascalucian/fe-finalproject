<template>
  <div id="wrapper">
    <header>
      <h1>About us</h1>
    </header>
    <main>
      <section id="cards">
        <div class="my-card">
          <img src="http://imgur.com/ua1wx.jpg" />
          <span class="card-content">
            <p>
              Our story starts
              <strong>{{ daysWeBeenWorking }} days ago</strong>, during our
              Frontend Internship when our team was chilling at
              <strong>Templul Manelelor</strong> in Costinești, Constanța,
              Romania. Our Frontend mentor tasked us with creating a portfolio
              website, not individual ones, but rather as a team. We thought why
              not harnessing the power of colaboration and rather than design
              our own portfolio websites, why not create a platform where anyone
              could create and host their portfolio website, free of charge.
            </p>
          </span>
        </div>
        <div class="my-card">
          <img
            src="https://www.funmag.org/wp-content/uploads/2012/09/funny-orange-peel-04.jpg"
          />
          <span class="card-content">
            <p>
              And thus <strong>Portofol.io</strong> got its start. A free
              platform where anyone can join and host their own modern
              professional grade portfolio. We're constantly working on adding
              new features and we'd like to take a moment to thank our community
              for their utmost support.
            </p>
          </span>
        </div>
        <div class="my-card">
          <img
            src="https://ruinmyweek.com/wp-content/uploads/2017/06/funny-pics-to-share-orange-slices-in-a-huddle.jpeg"
          />
          <span class="card-content">
            <p>
              Our project started up as an assignment but we'd never thought to
              see it go to such heights! We are forever endebted to our own
              friends and family for keeping us on the right track and keep this
              project afloat and constantly expanding.
            </p>
            <p style="text-align:right">
              <em>
                The Portofol.io Team
              </em>
            </p>
          </span>
        </div>
      </section>
      <h2>
        Team Members:
      </h2>
      <section id="team-members">
        <FeaturedPortfolio
          v-for="portofolio in teamMembers"
          v-bind:key="portofolio.id"
          :fname="portofolio.firstName"
          :lname="portofolio.lastName"
          :title="portofolio.title"
          :about="portofolio.about"
          :idd="portofolio.userId"
        />
      </section>
    </main>
  </div>
</template>

<script>
import moment from "moment";
import FeaturedPortfolio from "../ui/FeaturedPortfolio.vue";
import { db } from "../config/db";
export default {
  components: {
    FeaturedPortfolio,
  },
  data() {
    return {
      daysWeBeenWorking: "",
      teamMembers: [],
      ids: ["GgL2ooljTaWOnJdj6egiIpT0zNG2", "lYeGFhXwzROfTR4u1cRZPWE41Ez2"],
    };
  },
  methods: {
    calcDays() {
      this.daysWeBeenWorking = moment().diff("2021-08-21", "days");
      console.log(this.daysWeBeenWorking);
    },
  },
  created() {
    this.calcDays();
    db.collection("portofolios")
      .where("userId", "in", this.ids)
      .onSnapshot((snapshotChange) => {
        snapshotChange.forEach((doc) => {
          // console.log(doc.data());
          this.teamMembers.push(doc.data());
        });
      });
  },
};
</script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
}
header {
  display: flex;
  justify-content: center;
  background-repeat: repeat-x;
  background-image: $bg-i-o;
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
  padding: 5% 10%;
}
#cards {
  border-bottom: 3px solid $w-2;
}
img {
  overflow: hidden;
  height: auto;
  max-width: 30rem;
  object-fit: cover;
  display: inline-block;
  margin: 1rem 0;
  border: 1px solid black;
  flex: 1 1 auto;
}
.card-content {
  height: 100%;
  display: inline-block;
  font-family: $f-w;
  font-size: 1.5rem;
  text-indent: 4rem;
  text-align: justify;
  overflow: hidden;
  flex: 1 1 0;
  margin: 1.5% 3%;
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
h2 {
  font-family: $f-o;
  color: black;
  font-size: 3rem;
  padding: 1rem 0;
  border-bottom: 4px solid black;
  padding-left: 3rem;
  padding-bottom: 0;
  margin-bottom: 0;
  margin-top: 3rem;
}
#team-members {
  background-color: $w;
  padding: 2%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  FeaturedPortfolio {
    width: 200px;
  }
}
@media screen and (max-width: 1200px) {
  .card-content {
    font-size: 1rem;
  }
}

@media screen and (max-width: 600px) {
  main {
    padding: 5% 5%;
  }
}
</style>
