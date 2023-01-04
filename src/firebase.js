// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyABR515ao7B4Tf7PDTMHeEGt6y_QrasV1w",
  authDomain: "socialmedia-c3d70.firebaseapp.com",
  projectId: "socialmedia-c3d70",
  storageBucket: "socialmedia-c3d70.appspot.com",
  messagingSenderId: "523990266496",
  appId: "1:523990266496:web:fccfdecfba0410aeae6c65",
  databaseURL: "https://socialmedia-c3d70-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);