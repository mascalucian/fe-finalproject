import firebase from "firebase/app";
import "firebase/auth";

const errorTimeout = 5000;

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
    showError(state, payload) {
      state.errorMessage = payload;
      setTimeout(() => {
        state.errorMessage = null;
      }, errorTimeout);
    },
  },
  actions: {
    signUp({ commit }, { username, password }) {
      commit("loadData");
      return firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then((data) => {
          data.user;
          commit("login", data.user);
          commit("stopLoadData");
        })
        .catch((err) => {
          commit("stopLoadData");
          commit("showError", err.message);
        });
    },
    signIn({ commit }, { username, password }) {
      commit("loadData");
      return firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then((data) => {
          data.user;
          commit("login", data.user);
          commit("stopLoadData");
        })
        .catch((err) => {
          commit("stopLoadData");
          commit("showError", err.message);
        });
    },
  },
  getters: {
    isLoggedin: (state) => state.userData !== null,
    loggedInUser: (state) => state.userData,
    getErrorMessage: (state) => state.errorMessage,
  },
};
export default auth;
