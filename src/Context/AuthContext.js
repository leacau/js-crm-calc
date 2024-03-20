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
		family: '',
		quantity: 1,
		childrens: 0,
	});

	const extraMensualTitGrup = [26296.49, 22169.49];
	const fondoJubilado = [3167, 6330, 9493];
	const netos2886 = [
		44013.98, 48076.58, 75945.92, 151891.84, 189864.78, 227837.76, 265810.7,
		303783.69, 341756.65, 379729.61, 417716.25,
	];
	const neto2886_2000 = [
		118973.21, 237946.43, 297433.01, 356919.64, 416406.25, 475892.85, 535379.44,
		594866.07,
	];
	const netosMonotTodos = [
		39864.86, 43520.11, 68651.36, 137302.68, 171628.37, 205954.05, 240279.68,
		274605.37, 308931.05, 343256.73, 377582.37,
	];
	const aporteMonotCateg = [
		5811.53, 6905.82, 8450.42, 9765.81, 10463.36, 12556.04, 15545.57, 17399.08,
		19940.19,
	];
	const sepelio = 602; //valor de servicio de sepelio, lo pagan desde los 10 años
	const aportesRequeridos = [
		38156.3, 57528.11, 86879.87, 88053.93, 104571.99, 128685.92,
	]; //Aportes de obra social requeridos para ingresos de asalariados
	const aporteMaximo = 44148.4; //Aporte personal de OS que representa el tope de descuento en el recibo de sueldo (776478.32*3)/100
	const servCesantia = 578; // valor de servicio de cesantía/junilación/fallecimiento
	const protOdont = [3910.69, 2460]; // valor de protesis odontològica individual y por grupo

	const calculoFondoJub = (edad, sexo) => {
		const range1 = fondoJubilado[0];
		const range2 = fondoJubilado[1];
		const range3 = fondoJubilado[2];
		if (sexo === 'M') {
			if (edad >= 50 && edad <= 54) {
				return parseInt(range1);
			} else if (edad >= 55 && edad <= 59) {
				return parseInt(range2);
			} else if (edad >= 60) {
				return parseInt(range3);
			} else {
				return 0;
			}
		} else {
			if (edad >= 45 && edad <= 49) {
				return parseInt(range1);
			} else if (edad >= 50 && edad <= 54) {
				return parseInt(range2);
			} else if (edad >= 55) {
				return parseInt(range3);
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
				aporteMaximo,
				aportesRequeridos,
				sepelio,
				extraMensualTitGrup,
				servCesantia,
				protOdont,
				netos2886,
				neto2886_2000,
				netosMonotTodos,
				aporteMonotCateg,
			}}
		>
			{children}
		</authContext.Provider>
	);
}
