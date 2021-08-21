import { createStore } from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import "firebase/firestore";
import { db } from "../config/db";

const store = createStore({
  state: {
    portofolios: [],
  },
  mutations: {
    ...vuexfireMutations,
  },

  actions: {
    bindPortofolios: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("portofolios", db.collection("portofolios"));
    }),
  },

  getters: {
    allPortofolios: (state) => state.portofolios,
  },
});

export default store;
