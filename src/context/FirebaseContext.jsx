import { createContext, useContext, useState } from "react";
import {
    app,
    email_pass,
    signin_email_pass,
    googleSignIn
} from "./Firebase";
const FirebaseContext = createContext(null);

export const Firebase = (props) => {
    const [name, setName] = useState("Wasim")
    return <FirebaseContext.Provider value={{
        name,
        email_pass,
        signin_email_pass,
        googleSignIn
    }}>
        {props.children}
    </FirebaseContext.Provider>
}
export const useFirebase = () => {
    const data = useContext(FirebaseContext);
    return data;
}