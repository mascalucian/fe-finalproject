import { createStore } from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import "firebase/firestore";
import { db } from "../config/db";
import auth from "./modules/auth";
import projects from "./modules/projects";
import createPersistedState from "vuex-persistedstate";
import ui from "./modules/ui";

const authState = createPersistedState({
  paths: ["auth"],
});

const store = createStore({
  modules: {
    auth,
    projects,
    ui,
  },
  plugins: [authState],
  state: {
    portofolios: [],
    isLoadingData: false,
  },
  mutations: {
    loadData(state) {
      state.isLoadingData = true;
    },
    stopLoadData(state) {
      state.isLoadingData = false;
    },
    ...vuexfireMutations,
  },

  actions: {
    bindPortofolios: firestoreAction(async ({ bindFirestoreRef }) => {
      await new Promise((resolve, reject) => {
        bindFirestoreRef("portofolios", db.collection("portofolios"))
          .then((res) => {
            resolve(res);
            console.log("FINISHED");
            this.$forceUpdate();
          })
          .catch((err) => {
            reject(err);
          });
      });
    }),
    addPortofolio: firestoreAction((context, { payload }) => {
      db.collection("portofolios")
        .doc(payload.userId)
        .set({
          firstName: payload.firstName,
          lastName: payload.lastName,
          title: payload.title,
          tagline: payload.tagline,
          about: payload.about,
          socials: payload.socials,
          email: payload.email,
          phoneNumber: payload.phoneNumber,
          userId: payload.userId,
        });
    }),

    updatePortofolio: firestoreAction((context, { payload }) => {
      db.collection("portofolios")
        .doc(payload.userId)
        .set({
          firstName: payload.firstName,
          lastName: payload.lastName,
          title: payload.title,
          tagline: payload.tagline,
          about: payload.about,
          socials: payload.socials,
          email: payload.email,
          phoneNumber: payload.phoneNumber,
          userId: payload.userId,
        });
    }),

    deletePortofolio: firestoreAction((context, { id }) => {
      db.collection("portofolios")
        .doc(id)
        .delete();
    }),
  },

  getters: {
    allPortofolios: (state) => state.portofolios,
    loadingData: (state) => state.isLoadingData,
  },
});

export default store;
