import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../../config/db";
import router from "../../config/router";

const auth = {
  state: {
    userData: null,
    errorMessage: "",
    hasPortofolio: false,
  },
  mutations: {
    login(state, payload) {
      state.userData = payload;
    },
    logout(state) {
      state.userData = null;
    },
    confirmPortofolio(state) {
      state.hasPortofolio = true;
    },
    deletePortofolio(state) {
      state.hasPortofolio = false;
    },
  },
  actions: {
    async signUp({ commit }, { username, password }) {
      commit("loadData");
      await firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then((data) => {
          // data.user;
          // commit("login", data.user);
        })
        .catch((err) => {
          commit("stopLoadData");
          commit("showError", err.message);
        });
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit("showError", "");
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          commit("login", user);
          commit("stopLoadData");
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    },
    async signIn({ commit, getters }, { username, password }) {
      commit("loadData");
      await firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then((data) => {
          // data.user;
          // commit("login", data.user);
        })
        .catch((err) => {
          commit("stopLoadData");
          commit("showError", err.message);
        });
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("GOOD");
          commit("showError", "");
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          commit("login", user);
          commit("stopLoadData");
          db.collection("portofolios")
            .doc(getters.loggedInUser.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                commit("confirmPortofolio");
                console.log("Has portofolio");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    },
    async signOut({ commit }) {
      commit("loadData");

      await firebase
        .auth()
        .signOut()
        .then(() => {
          commit("logout");
          commit("stopLoadData");
          commit("deletePortofolio");
          let route = router.currentRoute;
          if (route._value.meta.requiresLogin === true) {
            router.push({ name: "Home" });
          }
        })
        .catch((error) => {
          commit("stopLoadData");
          commit("showError", error.message);
        });
    },
  },
  getters: {
    isLoggedin: (state) => state.userData !== null,
    loggedInUser: (state) => state.userData,
    getHasPortofolio: (state) => state.hasPortofolio,
  },
};
export default auth;
