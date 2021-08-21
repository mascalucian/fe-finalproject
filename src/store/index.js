import { createStore } from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import "firebase/firestore";
import { db } from "../config/db";
import auth from "./modules/auth";

const store = createStore({
  modules: {
    auth,
  },
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
          })
          .catch((err) => {
            reject(err);
          });
      });
    }),
    addPortofolio: firestoreAction((context, payload) => {
      // return the promise so we can await the write
      return db.collection("portofolios").add(payload);
    }),

    updatePortofolio: firestoreAction((context, payload) => {
      db.collection("portofolios")
        .doc(payload.id)
        .set(payload);
    }),

    deletePortofolio: firestoreAction((context, payload) => {
      db.collection("portofolios")
        .doc(payload)
        .delete();
    }),
  },

  getters: {
    allPortofolios: (state) => state.portofolios,
    loadingData: (state) => state.isLoadingData,
  },
});

export default store;
