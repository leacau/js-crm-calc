import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../firebase';

export function Calculate(plan, people, salary, ageT, ageC, neto, servMutual) {
	const [cost, setCost] = useState(0);
	const [extras, setExtras] = useState({});
	const [requeridos, setRequeridos] = useState({});
	const [netos, setNetos] = useState({});

	let ServicioMutualTitular = 0;
	for (let key in extras) {
		ServicioMutualTitular += extras[key];
	}
	let ServicioMutualPartic =
		extras.CuotaSoc + extras.Sepelio + extras.ServMutual;

	function difTope(requerido) {
		const sueldoRem = parseFloat(salary * 100) / 3;
		if (parseFloat(sueldoRem) < parseFloat(requeridos.maxAport)) {
			const aporteRec = parseFloat(sueldoRem * 0.0765);
			return parseFloat(requerido - aporteRec).toFixed(2);
		} else {
			const aporteRec =
				parseFloat(((sueldoRem - requeridos.maxAport) * 100) / 5.2) +
				parseFloat(requeridos.maxAport * 0.0765);
			return parseFloat(requerido - aporteRec).toFixed(2);
		}
	}

	useEffect(() => {
		const allDatos = async () => {
			const q = query(collection(db, 'valores'));

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				if (doc.id === 'Extras') {
					setExtras(doc.data());
				} else if (doc.id === 'Netos') {
					setNetos(doc.data());
				} else if (doc.id === 'Requerido') {
					setRequeridos(doc.data());
				}
			});
		};
		allDatos();
	}, []);

	if (people === 1) {
		if (ageT < 31) {
			if (plan === ('PMI' || 'PMI 2000' || 'PMI 30000')) {
				setCost(servMutual);
				return cost;
			} else {
				setCost(neto + servMutual);
				return cost;
			}
		} else {
		}
	}
}
