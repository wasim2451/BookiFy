import { initializeApp } from "firebase/app";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

//Configuration of firebase 
const firebaseConfig = {
    apiKey: "AIzaSyD9XKJ321fwZaB4QHwqL3WqpfK57q6KEbU",
    authDomain: "bookify-a3b88.firebaseapp.com",
    projectId: "bookify-a3b88",
    storageBucket: "bookify-a3b88.firebasestorage.app",
    messagingSenderId: "976614467485",
    appId: "1:976614467485:web:47abd3ae43ab236ee0f174",
    measurementId: "G-RFTXCL2K5N"
};
//Sign Up with Email and Password 
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const email_pass = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
}
//Signin with email and passsword 
export const signin_email_pass = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
}

//Google Log In
const provider = new GoogleAuthProvider();
export const googleSignIn = () => {
    return signInWithPopup(auth, provider);
}
//To check user loggedin or Not 
export const checkUser = (setUser) => {
   onAuthStateChanged(auth, (user) => {
        if (user) {
           setUser(user);
        } else {
            console.log("No user signed In !");
            setUser(null);
            
        }
    });
}
//For signout the users 
export const signout=(isLoggedIn)=>{
    isLoggedIn=false;
    return signOut(auth);
}