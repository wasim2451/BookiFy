import { createContext, useContext, useState, useEffect } from "react";
import {
    app,
    email_pass,
    signin_email_pass,
    googleSignIn,
    checkUser,
    signout,
    supabase,
    uploadData
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
        uploadData
    }}>
        {props.children}
    </FirebaseContext.Provider>
}
export const useFirebase = () => {
    const data = useContext(FirebaseContext);
    return data;
}