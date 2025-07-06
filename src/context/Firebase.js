import { initializeApp } from "firebase/app";


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
export const app = initializeApp(firebaseConfig);
