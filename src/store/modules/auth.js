import firebase from "firebase/app";
import "firebase/auth";

const auth = {
  state: {
    userData: null,
    errorMessage: "",
  },
  mutations: {
    login(state, payload) {
      state.userData = payload;
    },
    logout(state) {
      state.userData = null;
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
      firebase.auth().onAuthStateChanged((user) => {
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
    async signIn({ commit }, { username, password }) {
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
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    },
    signOut({ commit }) {
      commit("loadData");
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("logout");
          commit("stopLoadData");
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
  },
};
export default auth;
