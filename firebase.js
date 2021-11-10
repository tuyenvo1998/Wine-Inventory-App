// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = 
{
  apiKey: "AIzaSyCH5X_Qq0GuhyEqjIskcaqPbWEthg0YFrY",
  authDomain: "wine-inventory-app.firebaseapp.com",
  projectId: "wine-inventory-app",
  storageBucket: "wine-inventory-app.appspot.com",
  messagingSenderId: "755948651130",
  appId: "1:755948651130:web:c215ce78355f85337831c3",
  measurementId: "G-RDGRZJ72R2"

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