<template>
  <div id="create-portofolio-body">
    <header>
      <h1>Create a new Portofol.io</h1>
    </header>
    <div id="main-container">
      <Form
        v-slot="{ handleSubmit, isSubmitting }"
        :validation-schema="newPortSchema"
      >
        <form @submit.prevent="handleSubmit($event, createPortofolio)">
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
                  >Upload your profile picture: *
                </label>
                <input
                  type="file"
                  id="profile-pic-input"
                  required
                  accept="image/*"
                  @change="processImage('profile-pic-input')"
                />
              </div>
            </div>
            <div class="names-title">
              <div class="names">
                <div class="form-field">
                  <Field
                    v-model="newPortofolio.firstName"
                    :size="
                      newPortofolio.firstName == ''
                        ? 10
                        : newPortofolio.firstName.length < 15 &&
                          newPortofolio.firstName != '' &&
                          newPortofolio.lastName != ''
                        ? newPortofolio.firstName.length
                        : 15
                    "
                    type="text"
                    id="first-name"
                    placeholder="First Name *"
                    name="firstName"
                  />
                  <ErrorMessage name="firstName" />
                </div>
                <div class="form-field">
                  <Field
                    type="text"
                    id="last-name"
                    placeholder="Last Name *"
                    name="lastName"
                    v-model="newPortofolio.lastName"
                    :size="
                      newPortofolio.lastName == ''
                        ? 10
                        : newPortofolio.lastName.length < 15 &&
                          newPortofolio.lastName != '' &&
                          newPortofolio.firstName != ''
                        ? newPortofolio.lastName.length
                        : 15
                    "
                  />
                  <ErrorMessage name="lastName" />
                </div>
              </div>
              <div class="title">
                <div class="form-field">
                  <Field
                    name="title"
                    type="text"
                    id="title"
                    placeholder="Your post *"
                    v-model="newPortofolio.title"
                    :size="
                      newPortofolio.title.length < 15 &&
                      newPortofolio.title.length > 1
                        ? newPortofolio.title.length
                        : 30
                    "
                  />
                  <ErrorMessage name="title" />
                </div>
              </div>
            </div>
            <div class="banner-upload">
              <label v-if="!previewBanner" for="banner-input"
                >Choose your cover photo:</label
              >
              <input
                type="file"
                id="banner-input"
                accept="image/*"
                @change="processImage('banner-input')"
              />
            </div>
          </div>
          <div class="middle-section">
            <div class="tagline-form-field">
              <label for="tagline">Tagline: *</label>
              <div class="form-field">
                <Field
                  name="tagline"
                  type="text"
                  id="tagline"
                  placeholder="What makes you awesome?"
                  size="40"
                  v-model="newPortofolio.tagline"
                />
                <ErrorMessage name="tagline" />
              </div>
            </div>
            <div class="about">
              <div class="form-field">
                <Field
                  v-slot="{ field }"
                  name="about"
                  v-model="newPortofolio.about"
                >
                  <textarea
                    v-bind="field"
                    placeholder="Tell us about you *"
                  ></textarea>
                </Field>
                <ErrorMessage name="about" />
              </div>
            </div>
            <div class="pdf">
              <label>Upload your resume:*<i class="fas fa-file-pdf"></i></label>
              <input type="file" id="pdf-input" accept="application/pdf" />
            </div>
          </div>
          <div class="projects">
            <h1>Add your projects:</h1>
            <h3>Let's see what you've accomplished</h3>
            <div class="projects-list">
              <h2>Project List:</h2>
              <div v-for="project in projects" :key="project" class="project">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
              </div>
            </div>
            <Form
              :validation-schema="newProjectSchema"
              v-slot="{ handleSubmit }"
            >
              <form
                ref="addProjectForm"
                id="add-project-form"
                @submit.prevent="handleSubmit($event, addProject)"
              >
                <div class="project-form-field">
                  <label for="project-title">Title: *</label>
                  <div class="form-field">
                    <Field
                      name="title"
                      id="project-title"
                      placeholder="Your project's title"
                      size="45"
                      v-model="project.title"
                    />
                    <ErrorMessage name="title" />
                  </div>
                </div>
                <div class="project-form-field">
                  <label for="project-description">Description: *</label>
                  <div class="form-field description-form-field">
                    <Field
                      v-slot="{ field }"
                      name="description"
                      v-model="project.description"
                    >
                      <textarea
                        v-bind="field"
                        placeholder="What's it about?"
                      ></textarea>
                    </Field>
                    <ErrorMessage name="description" />
                  </div>
                </div>
                <label>Upload a picture for your project! (Optional)</label>
                <div class="project-form-field">
                  <input type="file" id="project-image-input" />
                </div>
                <input type="submit" value="Add Project" />
              </form>
            </Form>
          </div>
          <div class="socials-contact">
            <div class="socials">
              <Form
                v-slot="{ handleSubmit }"
                :validation-schema="newSocialSchema"
              >
                <form
                  ref="addSocialForm"
                  id="add-socials-form"
                  @submit.prevent="handleSubmit($event, addSocial)"
                >
                  <h3>Social accounts:</h3>
                  <div class="socials-list">
                    <a
                      v-for="social in newPortofolio.socials"
                      v-bind:key="social"
                      :href="social.url"
                    >
                      <i
                        class="fab "
                        :class="{
                          'fa-facebook-square': social.socialType == 'facebook',
                          'fa-instagram-square':
                            social.socialType == 'instagram',
                          'fa-linkedin': social.socialType == 'linkedin',
                          'fa-youtube': social.socialType == 'youtube',
                          'fa-twitter': social.socialType == 'twitter',
                        }"
                        :style="[
                          social.socialType == 'facebook'
                            ? { color: 'DodgerBlue' }
                            : social.socialType == 'instagram'
                            ? { color: 'DeepPink' }
                            : social.socialType == 'linkedin'
                            ? { color: 'SkyBlue' }
                            : social.socialType == 'youtube'
                            ? { color: 'Red' }
                            : social.socialType == 'twitter'
                            ? { color: 'DeepSkyBlue' }
                            : '',
                        ]"
                      ></i>
                    </a>
                  </div>
                  <h4>Add social account:</h4>
                  <div>
                    <label for="social-type-input">Website: *</label>
                    <div class="form-field">
                      <Field
                        id="social-type-input"
                        v-model="socialsType"
                        as="select"
                        name="socialsType"
                      >
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="youtube">YouTube</option>
                        <option value="twitter">Twitter</option>
                      </Field>
                      <ErrorMessage name="socialsType" />
                    </div>
                  </div>
                  <div>
                    <div class="form-field">
                      <Field
                        name="socialsURL"
                        type="text"
                        id="socials-URL"
                        placeholder="Link"
                        size="40"
                        v-model="socialsUrl"
                      />
                      <ErrorMessage name="socialsURL" />
                    </div>
                  </div>
                  <input type="submit" value="Add account" />
                </form>
              </Form>

              <div></div>
            </div>
            <div class="contact">
              <h3>Contact:</h3>
              <div class="contact-form-field">
                <label for="phone-number">Phone number: *</label>
                <div class="form-field">
                  <Field
                    name="phoneNumber"
                    type="text"
                    id="phone-number"
                    placeholder="Only valid numbers accepted"
                    v-model="newPortofolio.phoneNumber"
                    size="30"
                  />
                  <ErrorMessage name="phoneNumber" />
                </div>
              </div>
              <div class="contact-form-field">
                <label for="email">Email: </label>
                <input
                  v-model="newPortofolio.email"
                  type="email"
                  id="email"
                  readonly
                  size="30"
                />
              </div>
            </div>
            <div class="button-row">
              <input
                type="submit"
                value="Create Portofol.io"
                :disabled="isSubmitting"
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage, ValidationObserver } from "vee-validate";
import firebase from "firebase/app";
import "firebase/storage";
import { mapGetters } from "vuex";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const newPortSchema = yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      title: yup
        .string()
        .min(5, "Please enter at least 5 characters")
        .required(),
      tagline: yup
        .string()
        .min(10)
        .max(50)
        .required(),
      about: yup
        .string()
        .min(20)
        .required(),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .max(15)
        .required(),
    });
    const newProjectSchema = yup.object({
      title: yup
        .string()
        .min(5)
        .max(50)
        .required(),
      description: yup
        .string()
        .min(10)
        .max(500)
        .required(),
    });
    const newSocialSchema = yup.object({
      socialsType: yup.string().required("A website type is required"),
      socialsURL: yup
        .string()
        .url("Invalid URL")
        .required("Please enter a URL"),
    });
    return {
      newPortofolio: {
        firstName: "",
        lastName: "",
        title: "",
        tagline: "",
        about: "",
        socials: [],
        email: "",
        phoneNumber: "",
        userId: "",
      },
      previewPhoto: "",
      previewBanner: "",
      socialsType: "facebook",
      socialsUrl: "",
      projects: [],
      projectPhotos: [],
      project: {
        title: "",
        description: "",
        userId: "",
      },
      newPortSchema,
      newProjectSchema,
      newSocialSchema,
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
    addSocial() {
      let social = {
        socialType: this.socialsType,
        url: this.socialsUrl,
      };
      this.newPortofolio.socials.push(social);
      this.$refs.addSocialForm.reset();
      console.log(social);
    },
    addProject() {
      let project = {
        title: this.project.title,
        description: this.project.description,
        userId: this.project.userId,
      };
      this.projects.push(project);
      let file = document.getElementById("project-image-input").files[0];
      this.projectPhotos.push(file);
      document.getElementById("project-image-input").value = null;
      this.$refs.addProjectForm.reset();
      console.log(this.projectPhotos);
    },
    async createPortofolio() {
      console.log("CALLED");
      await this.$store.dispatch("updatePortofolio", {
        payload: this.newPortofolio,
      });
      var storageRef = firebase.storage().ref();
      var resumeRef = storageRef.child(`/${this.loggedInUser.uid}/resume.pdf`);
      var profilePicRef = storageRef.child(
        `/${this.loggedInUser.uid}/profile_picture.jpg`
      );
      var coverPicRef = storageRef.child(
        `/${this.loggedInUser.uid}/cover_picture.jpg`
      );
      const resumePdf = document.getElementById("pdf-input").files[0];
      const profilePicture = document.getElementById("profile-pic-input")
        .files[0];
      const coverPicture = document.getElementById("banner-input").files[0];
      await resumeRef.put(resumePdf).then((snapshot) => {
        console.log("Uploaded resume pdf!");
      });
      await profilePicRef.put(profilePicture).then((snapshot) => {
        console.log("Uploaded profile picture!");
      });
      await coverPicRef.put(coverPicture).then((snapshot) => {
        console.log("Uploaded cover picture!");
      });

      await this.projects.forEach((project) => {
        this.$store.dispatch("addProject", {
          payload: project,
        });
      });
      if (this.projectPhotos.length > 0) {
        for (let index = 0; index < this.projectPhotos.length; index++) {
          var projectPictureRef = storageRef.child(
            `/${this.loggedInUser.uid}/projects/project_${index}.jpg`
          );
          projectPictureRef.put(this.projectPhotos[index]).then((snapshot) => {
            console.log("Uploaded project picture!");
          });
        }
      }
      this.$store.commit("setSnackBarBackground", "#adff2f");
      this.$store.dispatch("callSnackBar", {
        payload: "Succes! Your portofol.io has been created!",
      });

      //   this.
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
      this.project.userId = this.loggedInUser.uid;
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    text-align: center;
  }
}

label {
  margin: auto;
  text-align: center;
  display: block;
}

[role="alert"] {
  color: rgb(143, 27, 27);
  display: block;
  text-align: center;
  font-family: "Oswald", sans-serif;
  text-transform: uppercase;
  padding: 0.1rem;
  text-decoration: underline;
  position: absolute;
  bottom: -1rem;
}

.form-field {
  display: flex;
  justify-content: center;
  position: relative;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
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
  padding-bottom: 1rem;
}

#profile-picture-img {
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: auto;
  border: 3px solid rgba(42, 158, 207, 0.45);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
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

  [role="alert"] {
    color: red;
    font-size: medium;
    bottom: -0.3rem;
  }
  input {
    margin: auto;
    display: block;
    font-family: "Work Sans", sans-serif;
    font-size: xx-large;
    padding: 1rem 2rem;
    text-align: center;
    background-color: $w-8;
    border-radius: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }

  label {
    margin-bottom: 0.5rem;
  }
}

.about {
  width: 40rem;
  [role="alert"] {
    color: red;
    font-size: large;
    bottom: 0.1rem;
  }
  textarea {
    font-size: large;
    width: 100% !important;
    max-height: 7rem;
    min-height: 2rem;
    padding-bottom: 3rem;
    background-color: $s-1;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin-bottom: 2rem;
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
  padding-top: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);

  i {
    padding-left: 1rem;
    text-align: right;
    font-size: large;
  }

  input {
    color: $w;
    padding-top: 1rem;
    padding-bottom: 1rem;
    overflow: auto;
    text-align: center;
  }
}

.socials-contact {
  background-color: rgb(238, 227, 173);
  width: 100%;
  padding-top: 2rem;
  border-top: 3px solid rgba(241, 234, 234, 0.699);
  display: flex;
  flex: 1 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  background-repeat: repeat-x;
  background-image: url("https://media.istockphoto.com/vectors/bright-seamless-pattern-with-orange-slices-vector-id1305791045?b=1&k=6&m=1305791045&s=612x612&w=0&h=7N354TSz_-ZYq5xz7lAisjzcFKiKDJgggbhP3V0BxwM=");
  h3 {
    font-family: "Oswald", sans-serif;
    text-transform: uppercase;
  }

  label {
    text-align: left;
    margin-bottom: 0.6rem;
    margin-top: 0.6rem;
  }

  input {
    font-size: medium;
    color: $w;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    overflow: auto;
    border: 1px solid rgba(241, 234, 234, 0.699);
  }

  .contact {
    margin-left: 3em;
    background-color: $w-10;
    padding: 1rem;

    input {
      margin-bottom: 1.5rem;
    }

    [role="alert"] {
      color: red;
      font-size: large;
      bottom: -0.5rem;
    }
  }

  #add-socials-form {
    width: 100%;
    background-color: $w-6;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }

  .socials {
    .form-field {
      justify-content: flex-start;
    }
    select {
      width: 15rem;
      height: 2rem;
      font-size: large;
      &:focus-visible {
        border: 0;
        outline: 0;
      }
    }

    .socials-list {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      flex: 0 0 auto;
      width: 25rem;
      flex-direction: row;
    }

    i {
      font-size: xx-large;
      padding: 0.2rem;
    }

    input {
      margin-top: 2rem;
    }

    [role="alert"] {
      color: rgb(255, 146, 146);
      font-size: large;
      bottom: -1.8rem;
    }

    input[type="submit"] {
      cursor: pointer;
      &:hover,
      :active,
      focus-visible {
        color: $o-2;
        border-color: $o-2;
      }
    }
  }
}

.projects {
  width: 100%;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid black;
  display: flex;
  flex: 1 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  background-color: $o-7;

  h1,
  h3 {
    display: block;
    width: 100%;
    text-align: center;
    font-family: "Oswald", sans-serif;
    margin: 0;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
}

#add-project-form {
  background-color: $w-9;
  padding: 1rem 2rem;
  label {
    text-align: left;
    font-size: large;
    margin-bottom: 0.5rem;
  }
  textarea {
    font-size: large;
    width: 100% !important;
    max-height: 7rem;
    min-height: 2rem;
    padding-bottom: 3rem;
    background-color: $s-1;
    border-radius: 5px;
    margin-bottom: 2rem;
    &:focus-visible {
      border: 1px solid $w;
      outline: 0;
    }
  }

  input {
    border-bottom: 2px solid $w;
    font-size: large;
    margin-bottom: 0.5rem;
    color: $w;
    text-decoration: none;
  }

  [role="alert"] {
    color: red;
    font-size: large;
    bottom: -1.4rem;
  }

  .description-form-field {
    [role="alert"] {
      color: red;
      font-size: large;
      bottom: 0.2rem;
    }
  }

  ::-webkit-file-upload-button {
    margin: 0;
  }

  input[type="submit"] {
    background-color: $s;
    color: black;
    font-family: "Work Sans", sans-serif;
    cursor: pointer;
    border-radius: 30px;
    padding: 0.3rem 1rem;
    margin-top: 0.6rem;
    &:hover,
    :active,
    focus-visible {
      background-color: $c-3;
    }
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }
}

.projects-list {
  width: 35rem;
  border: 1px solid $w;
  h2 {
    font-family: "Work Sans", sans-serif;
    margin: 0;
    text-align: center;
    display: block;
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 3px solid $w;
    background-color: $s;
  }
}

.project {
  border-radius: 20px;
  background-color: $s-1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  h3 {
    color: $w;
    display: block;
    width: 100%;
    padding: 0;
    background-color: $o-4;
    padding: 0.4rem 0;
  }
  margin: 0.3rem;
  p {
    color: black;
    margin: 0;
    padding: 0 1rem 1rem 1rem;
    text-align: justify;
  }
}

.button-row {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgb(238, 227, 173);
  padding: 2rem 0 10rem 0;

  input {
    background-color: $s-5;
    font-size: xxx-large;
    padding: 0.6rem 5rem;
    border: 0;
    border-radius: 40px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.26);
    &:hover,
    :active,
    focus-visible {
      background-color: $c-3;
      text-decoration: underline;
    }
  }
}
</style>
