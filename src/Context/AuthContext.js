import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

import { auth } from '../firebase';

export const authContext = createContext();

export const useAuth = () => {
	const context = useContext(authContext);
	if (!context) {
		throw new Error('useAuth debe estar dentro del proveedor de Auth');
	}
	return context;
};

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const signUp = async (email, password) =>
		createUserWithEmailAndPassword(auth, email, password);

	const signIn = (email, password) =>
		signInWithEmailAndPassword(auth, email, password);

	const logOut = () => signOut(auth);

	const resetPassword = (email) => sendPasswordResetEmail(auth, email);

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
	}, []);

	return (
		<authContext.Provider
			value={{
				signUp,
				signIn,
				user,
				logOut,
				loading,
				resetPassword,
			}}
		>
			{children}
		</authContext.Provider>
	);
}
