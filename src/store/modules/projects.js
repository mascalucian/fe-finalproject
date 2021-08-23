import { firestoreAction } from "vuexfire";
import "firebase/firestore";
import { db } from "../../config/db";

const projects = {
  state: {
    projectsForPortofolio: [],
  },
  mutations: {},
  actions: {
    bindProjects: firestoreAction(async ({ bindFirestoreRef }, { payload }) => {
      console.log(payload);
      await new Promise((resolve, reject) => {
        bindFirestoreRef(
          "projectsForPortofolio",
          db.collection("projects").where("userId", "==", payload)
        )
          .then((res) => {
            resolve(res);
            // console.log("FINISHED");
          })
          .catch((err) => {
            reject(err);
          });
      });
    }),
    addProject: firestoreAction((context, { payload }) => {
      return db.collection("projects").add({
        title: payload.title,
        description: payload.description,
        photo: payload.photo,
        userId: payload.userId,
      });
    }),
    updateProject: firestoreAction((context, { payload, id }) => {
      db.collection("projects")
        .doc(id)
        .set({
          title: payload.title,
          description: payload.description,
          photo: payload.photo,
          userId: payload.userId,
        });
    }),

    deleteProject: firestoreAction((context, { id }) => {
      db.collection("projects")
        .doc(id)
        .delete();
    }),
  },
  getters: {
    getProjectsForPortofolio: (state) => state.projectsForPortofolio,
  },
};

export default projects;
