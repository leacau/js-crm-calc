import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../firebase";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth debe estar dentro del proveedor de Auth");
    };
    return context;
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const logOut = () => signOut(auth);

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        })
    }, [])



    return (
        <authContext.Provider value={{ signUp, signIn, user, logOut }}>
            {children}
        </authContext.Provider>
    )
}