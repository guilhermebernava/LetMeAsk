// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDvf1OScQo8YWOemyjj3DhRa2tQdkJbrkU",
  authDomain: "letmeask-91068.firebaseapp.com",
  databaseURL: "https://letmeask-91068-default-rtdb.firebaseio.com",
  projectId: "letmeask-91068",
  storageBucket: "letmeask-91068.appspot.com",
  messagingSenderId: "719849613033",
  appId: "1:719849613033:web:0ede037690833742c73278"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export {auth, database, firebase}


