const portofolios = {
  firestorePath: "portofolios",
  firestoreRefType: "collection", // or 'doc'
  moduleName: "portofolios",
  statePropName: "data",
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {
    portofolios: [
      {
        name: "muie",
      },
      {
        name: "caca",
      },
    ],
  },
  getters: {
    allPortofolios: (state) => state.portofolios,
  },
  mutations: {},
  actions: {},
};

export default portofolios;
