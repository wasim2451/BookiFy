import { createContext, useContext, useState, useEffect } from "react";
import { getBookDetails, getGroqChatCompletion } from "./lama";
import { paymentFunction,emailFunction } from "./payment";
import {
    app,
    email_pass,
    signin_email_pass,
    googleSignIn,
    checkUser,
    signout,
    supabase,
    uploadData,
    retreiveData,
    retreiveSingleBook,
    uploadOrderData,
    uploadReviews,
    retreiveReviews
} from "./Firebase";
const FirebaseContext = createContext(null);

export const Firebase = (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        //On Mounting
        const temp=()=>{
            checkUser(setUser)
        }
        //Unmounting
        return temp();
    }, [])
    const isLoggedIn=user ? true :false
    return <FirebaseContext.Provider value={{
        email_pass,
        signin_email_pass,
        googleSignIn,
        isLoggedIn,
        user,
        signout,
        supabase,
        uploadData,
        retreiveData,
        getBookDetails,
        getGroqChatCompletion,
        retreiveSingleBook,
        paymentFunction,
        uploadOrderData,
        emailFunction,
        uploadReviews,
        retreiveReviews
    }}>
        {props.children}
    </FirebaseContext.Provider>
}
export const useFirebase = () => {
    const data = useContext(FirebaseContext);
    return data;
}