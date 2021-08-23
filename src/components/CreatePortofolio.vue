<template>
  <div id="create-portofolio-body">
    <header>
      <h1>Create a new Portofolio</h1>
    </header>
    <div id="main-container">
      <form>
        <div
          class="banner-image"
          :style="{
            backgroundImage: `url(${previewBanner ||
              'https://thumbs.dreamstime.com/b/%D1%85%D0%BE%D1%80%D0%BE%D1%88%D0%B8%D0%B9-%D0%BD%D0%B0%D0%B1%D0%BE%D1%80-%D1%84%D0%BE%D0%BD%D0%B0-%D1%80%D0%B0%D0%B1%D0%BE%D1%87%D0%B5%D0%B3%D0%BE-%D1%81%D1%82%D0%BE%D0%BB%D0%B0-%D0%BF%D0%BE%D0%BB%D1%83%D1%82%D0%BE%D0%BD%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-209014143.jpg'})`,
          }"
        >
          <div class="profile-picture">
            <img
              id="profile-picture-img"
              v-bind:src="
                previewPhoto ||
                  'https://www.pngitem.com/pimgs/m/464-4644415_employee-clipart-testimonial-illustration-hd-png-download.png'
              "
            />
            <div class="profile-picture-upload">
              <label v-if="!previewPhoto" for="profile-pic-input"
                >Upload your profile picture</label
              >
              <input
                type="file"
                id="profile-pic-input"
                @change="processImage('profile-pic-input')"
              />
            </div>
          </div>
          <div class="names-title">
            <div class="names">
              <input
                v-model="newPortofolio.firstName"
                :size="
                  newPortofolio.firstName.length < 15 &&
                  newPortofolio.firstName.length > 1
                    ? newPortofolio.firstName.length
                    : 15
                "
                type="text"
                id="first-name"
                placeholder="First Name"
              />
              <input
                type="text"
                id="last-name"
                placeholder="Last Name"
                v-model="newPortofolio.lastName"
                :size="
                  newPortofolio.lastName.length < 15 &&
                  newPortofolio.lastName.length > 1
                    ? newPortofolio.lastName.length
                    : 15
                "
              />
            </div>
            <div class="title">
              <input
                type="text"
                id="title"
                placeholder="Your post"
                v-model="newPortofolio.title"
                :size="
                  newPortofolio.title.length < 15 &&
                  newPortofolio.title.length > 1
                    ? newPortofolio.title.length
                    : 30
                "
              />
            </div>
          </div>
          <div class="banner-upload">
            <label v-if="!previewBanner" for="banner-input"
              >Choose your cover photo:</label
            >
            <input
              type="file"
              id="banner-input"
              @change="processImage('banner-input')"
            />
          </div>
        </div>
        <div class="middle-section">
          <div class="tagline-form-field">
            <label for="tagline">Tagline</label>
            <input
              type="text"
              id="tagline"
              placeholder="What makes you awesome?"
              size="40"
            />
          </div>
          <div class="about">
            <textarea placeholder="Tell us about you"></textarea>
          </div>
          <div class="pdf">
            <label>Upload your resume</label>
            <input type="file" id="pdf-input" />
          </div>
        </div>
        <div class="projects">
          Add your projects:
          <form id="add-project-form">
            <div class="project-form-field">
              <input
                type="text"
                id="project-title"
                placeholder="Project Title"
              />
            </div>
            <div class="project-form-field">
              <input
                type="text"
                id="project-description"
                placeholder="Project Description"
              />
            </div>
            <label>Upload a picture for your project!</label>
            <div class="project-form-field">
              <input type="file" id="project-image-input" />
            </div>
          </form>
          <div class="projects list">
            <div></div>
          </div>
        </div>
        <div class="socials-contact">
          <div class="socials">
            <form id="add-socials-form">
              <select>
                <option>Facebook</option>
              </select>
              <input type="text" id="socials-URL" placeholder="Socials URL" />
            </form>
            <div></div>
          </div>
          <div class="contact">
            <div class="contact-form-field">
              <input type="text" id="phone-number" placeholder="Phone Number" />
            </div>
            <div class="contact-form-field">
              <input
                v-model="newPortofolio.email"
                type="email"
                id="email"
                readonly
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      newPortofolio: {
        firstName: "",
        lastName: "",
        title: "",
        tagline: "",
        about: "",
        socials: [],
        email: "",
        userId: "",
      },
      previewPhoto: "",
      previewBanner: "",
    };
  },
  methods: {
    processImage(inputId) {
      console.log("STARTED");
      //   let loader = this.$loading.show({
      //     // Optional parameters
      //     container: this.$refs.previewParent,
      //     isFullPage: false,
      //   });
      //   this.isLoadingPicture = false;
      var file = document.getElementById(`${inputId}`).files[0];
      const reader = new FileReader();
      var that = this;
      if (file) {
        // this.isLoadingPicture = false;
        // console.log("FILE");
        reader.readAsDataURL(file);
      } else {
        console.log("NO FILE");
        // loader.hide();
        // this.isLoadingPicture = false;
        return;
      }
      if (file.size > 10000000) {
        // loader.hide();
        // console.log("FILE BIGGER THAN 10MB");
        document.getElementById(`${inputId}`).value = null;
        switch (inputId) {
          case "profile-pic-input":
            this.previewPhoto = "";
            this.newPortofolio.photo = null;
            break;
          case "banner-input":
            this.previewBanner = "";
            this.newPortofolio.coverPhoto = null;
            break;
          default:
            break;
        }

        // this.isLoadingPicture = false;
        return;
      }
      reader.addEventListener(
        "load",
        function() {
          // console.log("LOADED");
          //   loader.hide();
          //   this.isLoadingPicture = false;
          //   that.employeeMutated.photo = reader.result;
          console.log(inputId);
          switch (inputId) {
            case "profile-pic-input":
              that.previewPhoto = reader.result;
              break;
            case "banner-input":
              that.previewBanner = reader.result;
              break;
            default:
              break;
          }
        },
        false
      );
    },
  },
  computed: {
    //ai nevoie doar de allPortofolios, il poti folosi apoi in v-for portofolio in allPortofolios
    ...mapGetters(
      ["loggedInUser"] // -> this.someGetter
    ),
  },
  created() {
    if (this.loggedInUser) {
      this.newPortofolio.email = this.loggedInUser.email;
      this.newPortofolio.userId = this.loggedInUser.uid;
    }
  },
};
</script>

<style scoped lang="scss">
header {
  background-color: $w-9;
  width: 100%;
  padding: 0.8em 0;
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 3px solid rgba(241, 234, 234, 0.699);
  h1 {
    background-color: $o;
    padding: 1em 6em;
    width: fit-content;
    margin: auto;
    color: $w;
    border-radius: 50px;
    border: 3px solid rgba(42, 158, 207, 0.45);
    box-shadow: 8px 8px rgba(22, 22, 22, 0.527);
    text-align: center;
  }
}

label {
  margin: auto;
  text-align: center;
  display: block;
}

input {
  display: inline-block;
  color: $w;
  background: none;
  border: 0;
  &:focus-visible {
    outline: 0;
    text-decoration: underline;
  }
  &::placeholder {
    color: $sh-4;
  }
}

#main-container {
  background-color: $w-10;
  color: $w;
  min-height: 100vh;
}

input[type="file"] {
  font-size: smaller;
  overflow: hidden;
  display: inline-block;
  margin: 0;
  color: transparent;
}

::-webkit-file-upload-button {
  background: none;
  color: $s;
  border: 3px solid $s;
  padding: 0.5rem 1.2rem;
  border-radius: 40px;
  cursor: pointer;
  display: block;
  margin: auto;
  &:hover {
    color: $sh;
    border: 3px solid $sh;
  }
  &:active {
    color: $sh;
    border: 3px solid $sh;
  }
}

.banner-image {
  width: 100%;
  display: flex;
  flex: 1 0 0;
  flex-wrap: wrap;
  flex-direction: row;
  height: 38rem;
  vertical-align: middle;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
}

#profile-picture-img {
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: auto;
  border: 3px solid rgba(42, 158, 207, 0.45);
  box-shadow: 8px 8px rgba(22, 22, 22, 0.178);
}

#create-portofolio-body {
  min-width: 540px;
}

.profile-picture {
  margin: 6rem auto 0 auto;
  display: block;
  width: 100%;
}

.names-title {
  display: block;
  width: 90%;
  margin: 3px auto;

  input {
    font-family: "Oswald", sans-serif;
    text-transform: uppercase;
    display: inline-block;
    color: $w;
    font-size: xxx-large;
    background: none;
    border: 0;
    &:focus-visible {
      font-weight: bold;
      outline: 0;
      text-decoration: underline;
    }
    &::placeholder {
      color: $sh-4;
    }
    &#first-name {
      text-align: right;
      margin-right: 0.5rem;
    }
    &#last-name {
      text-align: left;
      margin-left: 0.5rem;
    }
  }
}

.names {
  width: 100%;
  display: flex;
  flex: 1 0 auto;
  flex-wrap: wrap;
  margin: auto;
  text-align: center;
  justify-content: center;
}

.profile-picture-upload {
  max-width: 15rem;
  margin: 1.5rem auto;
  padding: 0, 3rem 0, 5rem;
  background-color: rgba(53, 53, 53, 0.699);
  border-radius: 25px;
  border: 3px solid rgba(42, 158, 207, 0.45);
  box-shadow: 8px 8px rgba(22, 22, 22, 0.178);
  label {
    font-size: smaller;
  }
  ::-webkit-file-upload-button {
    font-size: smaller;
    margin-top: 0.5rem;
  }
}

.banner-upload {
  position: absolute;
  bottom: 0;
  right: 0;
  border-top: 3px solid rgba(42, 158, 207, 0.45);
  border-left: 3px solid rgba(42, 158, 207, 0.45);
  background-color: rgba(53, 53, 53, 0.699);
  padding-top: 1rem;
}

.title input {
  text-align: center;
  margin: auto;
  width: 100%;
}

.middle-section {
  width: 100%;
  padding-top: 2rem;
  display: flex;
  flex: 1 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  border-top: 3px solid rgba(241, 234, 234, 0.699);
}

.tagline-form-field {
  display: block;
  width: 100%;
  margin-bottom: 1rem;

  input {
    margin: auto;
    display: block;
    font-family: "Work Sans", sans-serif;
    font-size: xx-large;
    padding: 1rem 2rem;
    text-align: center;
    background-color: $w-8;
    border-radius: 30px;
  }
}

.about {
  width: 40rem;
  textarea {
    font-size: large;
    width: 100% !important;
    max-height: 7rem;
    min-height: 2rem;
    padding-bottom: 3rem;
    background-color: $s-1;
    border-radius: 10px;
    &:focus-visible {
      border: 1px solid $w;
      outline: 0;
    }
  }
}

.pdf {
  margin-left: 1rem;
  height: 100%;
  border: 3px solid black;
}
</style>
