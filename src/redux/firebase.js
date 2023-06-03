//กำหนดค่าของ Firebase
import firebase from "firebase/app"
import "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyCim7jA4u2sTakuINxrzHD_zgoQgTmEZfA",
    authDomain: "fir-login-auth-dcb6e.firebaseapp.com",
    projectId: "fir-login-auth-dcb6e",
    storageBucket: "fir-login-auth-dcb6e.appspot.com",
    messagingSenderId: "589017568743",
    appId: "1:589017568743:web:5deb517a4e51e0a1219942",
    measurementId: "G-NCCE8RP318"
    };

    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const googleAuthProvider = new firebase.auth.googleAuthProvider();
    const facebookAuthProvider = new firebase.auth.facebookAuthProvider();
    
    export {auth, googleAuthProvider, facebookAuthProvider}