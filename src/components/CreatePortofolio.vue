<template>
  <div id="create-portofolio-body">
    <header>
      <h1>
        {{ !editMode ? "Create a new Portofol.io" : "Edit your Portofol.io" }}
      </h1>
    </header>
    <div id="main-container">
      <Form
        v-slot="{ handleSubmit, isSubmitting }"
        :validation-schema="newPortSchema"
      >
        <form @submit.prevent="handleSubmit($event, createPortofolio)">
          <div
            ref="bannerRef"
            class="banner-image"
            :style="{
              backgroundImage: `url(${previewBanner ||
                'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1907&q=80'})`,
            }"
          >
            <div class="profile-picture">
              <div ref="profilePicRef">
                <img
                  id="profile-picture-img"
                  v-bind:src="
                    previewPhoto ||
                      'https://www.pngitem.com/pimgs/m/464-4644415_employee-clipart-testimonial-illustration-hd-png-download.png'
                  "
                />
              </div>

              <div class="profile-picture-upload">
                <label v-if="!previewPhoto" for="profile-pic-input"
                  >Upload your profile picture: *
                </label>
                <input
                  type="file"
                  id="profile-pic-input"
                  accept="image/*"
                  :required="!editMode"
                  @change="processImage($event, 'profilePicRef')"
                />
              </div>
            </div>
            <div class="names-title">
              <div class="names">
                <div class="form-field">
                  <Field
                    v-model="newPortofolio.firstName"
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
                @change="processImage($event, 'bannerRef')"
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
              <label
                >{{ !editMode ? "Upload your resume:*" : "Upload a new resume:"
                }}<i class="fas fa-file-pdf"></i
              ></label>
              <input
                type="file"
                id="pdf-input"
                :required="!editMode"
                accept="application/pdf"
              />
            </div>
          </div>

          <div class="projects">
            <h1>
              {{ !editMode ? "Add your projects:*" : "Manage your projects:" }}
            </h1>
            <h3>Let's see what you've accomplished</h3>
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
                <div class="project-form-field" ref="projectImageRef">
                  <input
                    type="file"
                    id="project-image-input"
                    @change="processImage($event, 'projectImageRef')"
                  />
                </div>
                <input type="submit" value="Add Project" />
              </form>
            </Form>
            <div class="projects-list" v-if="!editMode">
              <h2>Project List:</h2>
              <div v-for="project in projects" :key="project" class="project">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
              </div>
            </div>
            <div class="projects-list" v-else>
              <h2>Project List:</h2>
              <div
                v-for="project in getProjectsForPortofolio"
                :key="project.id"
                class="project"
              >
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
              </div>
            </div>
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
                :value="!editMode ? 'Create Portofol.io' : 'Edit Portofol.io'"
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
import { db } from "../config/db";

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
      editMode: false,
      unsubscribe: undefined,
      loader: undefined,
      profilePictureLoader: undefined,
      coverPictureLoader: undefined,
    };
  },
  methods: {
    processImage($event, inputId) {
      console.log("STARTED");
      this.profilePictureLoader = this.$loading.show({
        // Optional parameters
        container: this.$refs[inputId],
        isFullPage: false,
      });
      var file = $event.target.files[0];
      const reader = new FileReader();
      var that = this;
      if (file) {
        // this.isLoadingPicture = false;
        // console.log("FILE");
        reader.readAsDataURL(file);
      } else {
        console.log("NO FILE");
        this.profilePictureLoader.hide();
        // this.isLoadingPicture = false;
        return;
      }
      if (file.size > 10000000) {
        this.profilePictureLoader.hide();
        // console.log("FILE BIGGER THAN 10MB");
        $event.target.value = null;
        switch (inputId) {
          case "profilePicRef":
            this.previewPhoto = "";
            this.newPortofolio.photo = null;
            break;
          case "bannerRef":
            this.previewBanner = "";
            this.newPortofolio.coverPhoto = null;
            break;
          case "projectImageRef":
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
          that.profilePictureLoader.hide();
          //   loader.hide();
          //   this.isLoadingPicture = false;
          //   that.employeeMutated.photo = reader.result;
          console.log(inputId);
          switch (inputId) {
            case "profilePicRef":
              that.previewPhoto = reader.result;
              break;
            case "bannerRef":
              that.previewBanner = reader.result;
              break;
            case "projectImageRef":
              // that.previewBanner = reader.result;
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
    async addProject() {
      const projectRef = db.collection("projects").doc();
      let project = {
        title: this.project.title,
        description: this.project.description,
        userId: this.project.userId,
      };
      project = { id: projectRef.id, ...project };
      let file = document.getElementById("project-image-input").files[0];
      this.$refs.addProjectForm.reset();
      if (file) document.getElementById("project-image-input").value = null;
      if (!this.editMode) {
        this.projects.push(project);
        console.log("Pushed to local Projects");
        if (file) {
          this.projectPhotos.push({
            projectId: projectRef.id,
            photoFile: file,
          });
          this.methodThatForcesUpdate();
        }
        return;
      }
      console.log("Adding to Firestore..");
      await this.$store.dispatch("addProject", {
        payload: project,
      });
      this.methodThatForcesUpdate();
      if (!file) {
        console.log("No picture");
        return;
      }

      var storageRef = firebase.storage().ref();
      var projectPictureRef = storageRef.child(
        `/${this.loggedInUser.uid}/projects/${project.id}/project.jpg`
      );
      await projectPictureRef.put(file).then((snapshot) => {
        console.log("Uploaded project picture!");
      });
    },
    async createPortofolio() {
      this.loader = this.$loading.show({
        backgroundColor: "none",
      });
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
      if (resumePdf) {
        await resumeRef.put(resumePdf).then((snapshot) => {
          console.log("Uploaded resume pdf!");
        });
      }
      const profilePicture = document.getElementById("profile-pic-input")
        .files[0];
      if (profilePicture) {
        await profilePicRef.put(profilePicture).then((snapshot) => {
          document.getElementById("profile-pic-input").value = null;
          console.log("Uploaded profile picture!");
        });
      }
      const coverPicture = document.getElementById("banner-input").files[0];
      if (coverPicture) {
        await coverPicRef.put(coverPicture).then((snapshot) => {
          document.getElementById("banner-input").value = null;
          console.log("Uploaded cover picture!");
        });
      }
      await this.projects.forEach((project) => {
        this.$store.dispatch("addProject", {
          payload: project,
        });
      });
      await this.projectPhotos.forEach((projectPhotoData) => {
        var projectPictureRef = storageRef.child(
          `/${this.loggedInUser.uid}/projects/${projectPhotoData.projectId}/project.jpg`
        );
        projectPictureRef.put(projectPhotoData.photoFile).then((snapshot) => {
          console.log("Uploaded project picture!");
        });
      });
      this.loader.hide();
      if (!this.editMode) this.$store.commit("confirmPortofolio");
      this.$store.commit("setSnackBarBackground", "#adff2f");
      this.$store.dispatch("callSnackBar", {
        payload: !this.editMode
          ? "Succes! Your portofol.io has been created!"
          : "Succes! Your portofol.io has been edited!",
      });
    },
    async loadForEdit() {
      await db
        .collection("portofolios")
        .doc(this.loggedInUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.newPortofolio = doc.data();
            this.methodThatForcesUpdate();
            console.log("edit mode");
            console.log(this.newPortofolio);
          } else {
            return;
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
      this.loader.hide();
      await this.getProjects(this.loggedInUser.uid);
      var storageRef = firebase.storage().ref();
      var profilePicRef = storageRef.child(
        `/${this.loggedInUser.uid}/profile_picture.jpg`
      );
      var coverPicRef = storageRef.child(
        `/${this.loggedInUser.uid}/cover_picture.jpg`
      );
      this.profilePictureLoader = this.$loading.show({
        // Optional parameters
        container: this.$refs.profilePicRef,
        isFullPage: false,
      });
      this.coverPictureLoader = this.$loading.show({
        // Optional parameters
        container: this.$refs.bannerRef,
        isFullPage: false,
      });

      profilePicRef
        .getDownloadURL()
        .then((url) => {
          console.log("loaded profile picture");
          this.previewPhoto = url;
          this.profilePictureLoader.hide();
        })
        .catch((error) => {
          // Handle any errors
        });
      coverPicRef
        .getDownloadURL()
        .then((url) => {
          console.log("loaded cover picture");
          this.previewBanner = url;
          this.coverPictureLoader.hide();
        })
        .catch((error) => {
          // Handle any errors
        });
    },
    async getProjects(userId) {
      this.$store.dispatch("bindProjects", { payload: userId });
      this.unsubscribe = db
        .collection("projects")
        .where("userId", "==", userId)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              this.methodThatForcesUpdate();
            }
            if (change.type === "modified") {
              this.methodThatForcesUpdate();
            }
            if (change.type === "removed") {
              this.methodThatForcesUpdate();
            }
          });
        });
    },
    methodThatForcesUpdate() {
      // ...
      this.$forceUpdate(); // Notice we have to use a $ here
    },
  },
  computed: {
    ...mapGetters(
      ["loggedInUser", "getHasPortofolio", "getProjectsForPortofolio"] // -> this.someGetter
    ),
  },
  async created() {
    if (this.loggedInUser) {
      this.newPortofolio.email = this.loggedInUser.email;
      this.newPortofolio.userId = this.loggedInUser.uid;
      this.project.userId = this.loggedInUser.uid;
    }
    if (this.getHasPortofolio) {
      this.editMode = true;
      this.loader = this.$loading.show();
      await this.loadForEdit();
    }
  },
  unmounted() {
    if (this.unsubscribe) this.unsubscribe();
  },
};
</script>

<style scoped lang="scss">
header {
  font-family: "Oswald", sans-serif;
  font-weight: bolder;
  background-repeat: repeat-x;
  background-image: url("https://media.istockphoto.com/vectors/bright-seamless-pattern-with-orange-slices-vector-id1305791045?b=1&k=6&m=1305791045&s=612x612&w=0&h=7N354TSz_-ZYq5xz7lAisjzcFKiKDJgggbhP3V0BxwM=");
  background-position-y: center;
  width: 100%;
  padding: 4% 0;
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 3px solid rgba(241, 234, 234, 0.699);
  h1 {
    background-color: $o;
    padding: 2% 5%;
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
  font-family: "Work Sans", sans-serif;
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
  vertical-align: middle;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  background-attachment: fixed;
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
  width: 100%;
}

.profile-picture {
  margin: 17% auto 0 auto;
  display: block;
  width: 100%;
  z-index: 10;
}

.names-title {
  display: block;
  width: 90%;
  margin: 3px auto;
  z-index: 10;
  input {
    flex-grow: 1;
    text-shadow: 2px 2px $o;
    font-family: "Oswald", sans-serif;
    display: inline-block;
    color: $w;
    font-size: xxx-large;
    background: none;
    border: 0;
    width: 100%;
    &:focus-visible {
      font-weight: bold;
      outline: 0;
      text-decoration: underline;
    }
    &::placeholder {
      color: $sh-4;
      text-shadow: none;
    }
    &#first-name {
      width: 50%;
      text-align: right;
      margin-right: 0.5rem;
    }
    &#last-name {
      width: 50%;
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
  .form-field:nth-child(1) {
    justify-content: flex-end;
  }
  .form-field:nth-child(2) {
    justify-content: flex-start;
  }
}

.profile-picture-upload {
  max-width: 20rem;
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
  input {
    width: 100%;
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
    width: 100%;
    margin: auto 10%;
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
    font-family: "Work Sans", sans-serif;
    font-size: large;
    width: 100% !important;
    margin: 0 5%;
    max-height: 12rem;
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
  flex: 1 1 auto;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  background-repeat: repeat-x;
  background-position-y: 105%;
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
      display: block;
      margin-bottom: 1.5rem;
      width: 100%;
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
    min-width: 0;
    form {
      width: 100%;
    }
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
  padding: 5%;
  border-top: 1px solid black;
  display: flex;
  flex: 1 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  background-color: $o-7;
  form {
    width: 100%;
    max-width: 35rem;
  }
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
  font-family: "Work Sans", sans-serif;
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
    width: 100% !important;
    border-bottom: 2px solid $w;
    font-size: large;
    margin-bottom: 10%;
    color: $w;
    text-decoration: none;
  }

  [role="alert"] {
    color: red;
    font-size: large;
    bottom: -5%;
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
  word-break: break-all;
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

@media screen and (max-width: 800px) {
  .banner-upload {
    bottom: unset;
    top: 0;
    border-bottom: 3px solid rgba(42, 158, 207, 0.45);
    border-top: 0;
  }

  .profile-picture {
    margin-top: 40%;
  }

  .button-row {
    white-space: pre-wrap;
    word-break: break-all;
    input {
      padding: 2% 5%;
      font-size: 2rem;
    }
  }

  .contact,
  .socials {
    margin: 0 !important;
    display: table-cell;
  }
}
@media screen and (max-width: 400px) {
  .contact {
    margin: 0 !important;
    width: 100%;
  }
  #first-name,
  #last-name {
    text-align: center !important;
  }
}
</style>
