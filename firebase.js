// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCnc9TfU9oiELMJTOJDCZ1iBGGZ10LFehc",
    authDomain: "bnl-applications.firebaseapp.com",
    projectId: "bnl-applications",
    storageBucket: "bnl-applications.appspot.com",
    messagingSenderId: "791233804602",
    appId: "1:791233804602:web:fb8998e4bb5edf43fab803"
  };

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };