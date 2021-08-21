import firebase from "firebase";
import "firebase/auth";

const auth = {
  state: {
    userData: null,
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
    signUp({ commit }, { username, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then((data) => {
          data.user;
          commit("login", data.user).then(() => {});
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
    signIn({ commit }, { username, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then((data) => {
          data.user;
          commit("login", data.user).then(() => {});
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
  getters: {
    isLoggedin: (state) => state.userData !== null,
    loggedInUser: (state) => state.userData,
  },
};
export default auth;
