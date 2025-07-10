import { initializeApp } from "firebase/app";
import { createClient } from '@supabase/supabase-js'
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc
} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

//Configuration of firebase 
const firebaseConfig = {
    apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
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
const db = getFirestore(app);

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
export const signout = (isLoggedIn) => {
    isLoggedIn = false;
    return signOut(auth);
}

// Firestore Setup and Upload data
export const uploadData = async (title, isbn, price, coverURL, user) => {
    try {
        const docRef = await addDoc(collection(db, "books"), {
            "title": title,
            "isbn": isbn,
            "price": price,
            "coverURL": coverURL,
            "email": user.email,
            "userURL": user.photoURL ? user.photoURL : "https://www.shareicon.net/data/512x512/2016/07/19/798351_man_512x512.png",
            "userId": user.uid,
            "username": user.displayName ? user.displayName : `Anonymous${Math.floor(Math.random()*1000)+1}`
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

//Retrieving the Firestore Data 
export const retreiveData=async()=>{
    const data=await getDocs(collection(db,'books'));
    return data; 
}

//Retreiving a Single Book Information
export const retreiveSingleBook=async(bookID)=>{
    const docRef=doc(db, "books", bookID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    alert("No such document exist !");
    }
}

//Sending order details to Firestore 
export const uploadOrderData = async ({amount,bookname,sellerId,buyerId,qty,buyerName,buyerEmail,orderId}) => {
    try {
        const docRef = await addDoc(collection(db, "orders"), {
            "name":bookname,
            "quantity":qty,
            "amount": amount/100,
            "sellerId": sellerId,
            "buyerId":buyerId,
            "buyerName":buyerName,
            "buyerEmail":buyerEmail,
            "order_id":orderId
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}


//configuring Supabase 
const supabaseURL = 'https://urwjyfmoddgfydivkpxv.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseURL, supabaseKey);