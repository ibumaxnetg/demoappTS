import firebase from "firebase/compat/app";
// import firebase from "firebase";
import "firebase/compat/storage";
// import {  } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtWfk696nUTVNnsq9CKBUc8IqCWhkx6eM",
  authDomain: "horseproject-1c28a.firebaseapp.com",
  databaseURL:
    "https://horseproject-1c28a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "horseproject-1c28a",
  storageBucket: "horseproject-1c28a.appspot.com",
  messagingSenderId: "862568421640",
  appId: "1:862568421640:web:aa14fa67aeea60369eb4bd",
  measurementId: "G-D2M9Z0Z55P"
};

// Initialize Firebase
export const firebaseAppV8 = firebase.initializeApp(firebaseConfig);

//インスタンス作成
// export const firebaseStore = firebaseApp.firestore();
export const firebaseStorage = firebase.storage();
