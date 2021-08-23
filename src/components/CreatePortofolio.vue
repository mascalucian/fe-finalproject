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
              <label>Upload your profile picture</label>
              <input
                type="file"
                id="profile-pic-input"
                @change="processImage('profile-pic-input')"
              />
            </div>
          </div>
          <div class="names-title">
            <div class="names">
              <input type="text" id="first-name" placeholder="First Name" />
              <input type="text" id="last-name" placeholder="Last Name" />
            </div>
            <div class="title">
              <input type="text" id="title" placeholder="Your post" />
            </div>
          </div>
          <div class="banner-upload">
            <input
              type="file"
              id="banner-input"
              @change="processImage('banner-input')"
            />
          </div>
        </div>
        <div class="middle-section">
          <div class="tagline-form-field">
            <input type="text" id="tagline" placeholder="Tagline" />
          </div>
          <div class="about">
            <textarea></textarea>
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

#main-container {
  background-color: $w-10;
  color: $w;
  min-height: 100vh;
}

input[type="file"] {
}

::-webkit-file-upload-button {
  background: none;
  color: $s;
  border: 3px solid $s;
  padding: 0.5rem 1.2rem;
  border-radius: 40px;
  cursor: pointer;

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
  height: 30rem;
  vertical-align: middle;
  object-fit: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

#profile-picture-img {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: cover;
}

#create-portofolio-body {
  min-width: 540px;
}
</style>
