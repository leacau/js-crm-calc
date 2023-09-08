import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { useAuth } from '../Context/AuthContext';

export function Autonomo() {
	const { datosCalculo } = useAuth();
	const [netoAutonomo, SetNetoAutonomo] = useState();

	useEffect(() => {
		if (datosCalculo.regimen === 'Autonomo' && datosCalculo.plan !== '') {
			const calculoNetoAutonomo = () => {
				switch (parseInt(datosCalculo.quantity)) {
					case 1:
						if (datosCalculo.plan === 'PMI 2886 Soltero') {
							if (datosCalculo.ageT >= 27 && datosCalculo.ageT <= 30) {
								SetNetoAutonomo(15727.86);
							} else if (datosCalculo.ageT <= 26) {
								SetNetoAutonomo(14398.81);
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
							SetNetoAutonomo(24845.08);
						} else if (datosCalculo.plan === 'PMI 2886/2000') {
							SetNetoAutonomo(38921.11);
						}

						break;
					case 2:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(49690.17);
						} else {
							SetNetoAutonomo(77842.22);
						}

						break;
					case 3:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(62112.7);
						} else {
							SetNetoAutonomo(97302.76);
						}

						break;
					case 4:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(74535.25);
						} else {
							SetNetoAutonomo(116763.33);
						}

						break;
					case 5:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(86957.79);
						} else {
							SetNetoAutonomo(136223.88);
						}

						break;
					case 6:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(99380.33);
						} else {
							SetNetoAutonomo(155684.43);
						}

						break;
					case 7:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(111802.88);
						} else {
							SetNetoAutonomo(175144.98);
						}

						break;
					case 8:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(124225.42);
						} else {
							SetNetoAutonomo(194605.54);
						}

						break;
					case 9:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(136652.44);
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
