import { createContext ,useContext , useState } from "react";
import { app } from "./Firebase";
const FirebaseContext = createContext(null);

export const Firebase = (props) => {
    const[name,setName]=useState("Wasim")
    return <FirebaseContext.Provider value={{name}}>
        {props.children}
    </FirebaseContext.Provider>
}
export const useFirebase=()=>{
    const data=useContext(FirebaseContext);
    return data;
}