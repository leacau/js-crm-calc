import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { useAuth } from '../Context/AuthContext';

export function Autonomo() {
	const { datosCalculo } = useAuth();
	const [netoAutonomo, SetNetoAutonomo] = useState();

	useEffect(() => {
		const netos2886 = [
			31974.12, 34925.41, 55171.2, 110342.41, 137927.99, 165513.61, 193099.2,
			220684.82, 248270.42, 275856.02, 303451.56,
		];
		const neto2886_2000 = [
			86428.54, 172857.09, 216071.35, 259285.63, 302499.91, 345714.18,
			388928.44, 432142.72,
		];
		if (datosCalculo.regimen === 'Autonomo' && datosCalculo.plan !== '') {
			const calculoNetoAutonomo = () => {
				switch (parseInt(datosCalculo.quantity)) {
					case 1:
						if (datosCalculo.plan === 'PMI 2886 Soltero') {
							if (datosCalculo.ageT >= 27 && datosCalculo.ageT <= 30) {
								SetNetoAutonomo(netos2886[1]);
							} else if (datosCalculo.ageT <= 26) {
								SetNetoAutonomo(netos2886[0]);
							} else {
								Swal.fire({
									text: 'Si es mayor de 30 años, el plan seleccionado deber no puede ser soltero',
									icon: 'info',
									confirmButtonText: 'ok',
								});
							}
						} else if (datosCalculo.plan === 'PMI 2886') {
							if (
								datosCalculo.ageT <= 30 &&
								datosCalculo.ageT !== '' &&
								datosCalculo.ageT > 9
							) {
								Swal.fire({
									text: 'El valor que se devuelve es el correspondiente a un 2886, no se tiene el cuenta el beneficio del plan joven',
									icon: 'info',
									confirmButtonText: 'ok',
								});
							}
							SetNetoAutonomo(netos2886[2]);
						} else if (datosCalculo.plan === 'PMI 2886/2000') {
							SetNetoAutonomo(neto2886_2000[0]);
						}

						break;
					case 2:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(netos2886[3]);
						} else {
							SetNetoAutonomo(neto2886_2000[1]);
						}

						break;
					case 3:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(netos2886[4]);
						} else {
							SetNetoAutonomo(neto2886_2000[2]);
						}

						break;
					case 4:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(netos2886[5]);
						} else {
							SetNetoAutonomo(neto2886_2000[3]);
						}

						break;
					case 5:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(netos2886[6]);
						} else {
							SetNetoAutonomo(neto2886_2000[4]);
						}

						break;
					case 6:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(netos2886[7]);
						} else {
							SetNetoAutonomo(neto2886_2000[5]);
						}

						break;
					case 7:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(netos2886[8]);
						} else {
							SetNetoAutonomo(neto2886_2000[6]);
						}

						break;
					case 8:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(netos2886[9]);
						} else {
							SetNetoAutonomo(neto2886_2000[7]);
						}

						break;
					case 9:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(netos2886[10]);
						} else {
							Swal.fire({
								text: 'El valor del plan PMI 2886/2000 no esta definido para 9 personas.',
								icon: 'info',
								confirmButtonText: 'ok',
							});
						}
						break;
					default:
						Swal.fire({
							text: 'Criterio fuera de evaluación, consultá en administración',
							icon: 'info',
							confirmButtonText: 'ok',
						});
						SetNetoAutonomo(0);
				} //Devuelve el valor NETO del plan autonomo o monotributo de acuerdo a la cantidad de personas
			};
			calculoNetoAutonomo();
		}
	}, [
		datosCalculo.regimen,
		datosCalculo.quantity,
		datosCalculo.plan,
		datosCalculo.ageT,
	]);

	return { netoAutonomo };
}
