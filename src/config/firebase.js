import firebase from "firebase/app";
import "firebase/firestore";

function initFirebase() {
  firebase.initializeApp({
    apiKey: "AIzaSyChAjp5DnMOrs3YFbiR2-RYtjKSiOWkG5E",
    authDomain: "portofolio-app-a3886.firebaseapp.com",
    projectId: "portofolio-app-a3886",
    storageBucket: "portofolio-app-a3886.appspot.com",
    messagingSenderId: "404350473434",
    appId: "1:404350473434:web:6baf88e8add838269341e3",
    measurementId: "G-WTVP39G111",
  });
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .enablePersistence()
      .then(resolve)
      .catch((err) => {
        if (err.code === "failed-precondition") {
          reject(err);
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === "unimplemented") {
          reject(err);
          // The current browser does not support all of
          // the features required to enable persistence
        }
      });
  });
}

export { firebase, initFirebase };
