import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA_mN0qgO_qG51K4HUOKzuZ5YxbML84G7Y",
  authDomain: "instagram-clone-baxodirovdev.firebaseapp.com",
  databaseURL: "https://instagram-clone-baxodirovdev.firebaseio.com",
  projectId: "instagram-clone-baxodirovdev",
  storageBucket: "instagram-clone-baxodirovdev.appspot.com",
  messagingSenderId: "428684717687",
  appId: "1:428684717687:web:898d48f0e7479a7bec6072",
  measurementId: "G-FYHFR29PQN",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
