import firebase from "firebase/app";
import "firebase/firestore";

export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyChAjp5DnMOrs3YFbiR2-RYtjKSiOWkG5E",
    authDomain: "portofolio-app-a3886.firebaseapp.com",
    projectId: "portofolio-app-a3886",
    storageBucket: "portofolio-app-a3886.appspot.com",
    messagingSenderId: "404350473434",
    appId: "1:404350473434:web:6baf88e8add838269341e3",
    measurementId: "G-WTVP39G111",
  })
  .firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true });
