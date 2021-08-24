const snackBarColors = {
  error: "#ff4500",
  succes: "#adff2f",
};

const errorTimeout = 5000;

const ui = {
  state: {
    snackBarTimeout: 5000,
    snackBarMessage: "",
    snackBarBackground: "#ff4500",
    snackBarColor: "white",
    authError: "",
  },
  mutations: {
    setSnackBarMessage(state, payload) {
      state.snackBarMessage = payload;
    },
    setSnackBarColor(state, payload) {
      state.snackBarColor = payload;
    },
    setSnackBarBackground(state, payload) {
      state.snackBarBackground = payload;
    },
    setSnackBarTimeout(state, payload) {
      state.snackBarTimeout = payload;
    },
    resetSnackBar(state) {
      state.snackBarMessage = "";
      state.snackBarColor = "white";
      state.snackBarBackground = "#ff4500";
      state.snackBarTimeout = 5000;
    },
    showError(state, payload) {
      state.authError = payload;
      setTimeout(() => {
        state.authError = null;
      }, errorTimeout);
    },
  },
  actions: {
    callSnackBar({ commit, getters }, { payload }) {
      commit("setSnackBarMessage", payload);
      setTimeout(() => {
        commit("setSnackBarMessage", "");
        commit("resetSnackBar");
      }, getters.getSnackBarTimeout);
    },
  },
  getters: {
    getSnackBarMessage: (state) => state.snackBarMessage,
    getSnackBarColor: (state) => state.snackBarColor,
    getSnackBarBackground: (state) => state.snackBarBackground,
    getSnackBarTimeout: (state) => state.snackBarTimeout,
    getErrorMessage: (state) => state.authError,
  },
};
export default ui;
