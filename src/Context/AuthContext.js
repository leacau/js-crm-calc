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

	const [datosCalculo, SetDatosCalculo] = useState({
		regimen: '',
		plan: '',
		family: 'NO',
		quantity: 1,
		childrens: 0,
	});

	const calculoFondoJub = (edad, sexo) => {
		if (sexo === 'M') {
			if (edad >= 50 && edad <= 54) {
				return parseInt(1192);
			} else if (edad >= 55 && edad <= 59) {
				return parseInt(2381);
			} else if (edad >= 60) {
				return parseInt(3572);
			} else {
				return 0;
			}
		} else {
			if (edad >= 45 && edad <= 49) {
				return parseInt(1192);
			} else if (edad >= 50 && edad <= 54) {
				return parseInt(2381);
			} else if (edad >= 55) {
				return parseInt(3572);
			} else {
				return 0;
			}
		}
	};

	const signUp = async (email, password) =>
		createUserWithEmailAndPassword(auth, email, password);

	const signIn = (email, password) =>
		signInWithEmailAndPassword(auth, email, password);

	const logOut = () => signOut(auth);

	const resetPassword = (email) => sendPasswordResetEmail(auth, email);

	const setContacto = (datos) => {
		SetDatosCalculo(datos);
	};

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
				datosCalculo,
				setContacto,
				calculoFondoJub,
			}}
		>
			{children}
		</authContext.Provider>
	);
}
