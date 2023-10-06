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
								SetNetoAutonomo(17454.78);
							} else if (datosCalculo.ageT <= 26) {
								SetNetoAutonomo(15979.8);
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
							SetNetoAutonomo(27573.07);
						} else if (datosCalculo.plan === 'PMI 2886/2000') {
							SetNetoAutonomo(43194.65);
						}

						break;
					case 2:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(55146.15);
						} else {
							SetNetoAutonomo(86389.29);
						}

						break;
					case 3:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(68932.68);
						} else {
							SetNetoAutonomo(107986.61);
						}

						break;
					case 4:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(82719.22);
						} else {
							SetNetoAutonomo(129583.94);
						}

						break;
					case 5:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(96505.75);
						} else {
							SetNetoAutonomo(151181.26);
						}

						break;
					case 6:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(110292.3);
						} else {
							SetNetoAutonomo(172778.59);
						}

						break;
					case 7:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(124078.83);
						} else {
							SetNetoAutonomo(194375.9);
						}

						break;
					case 8:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(137865.37);
						} else {
							SetNetoAutonomo(215973.23);
						}

						break;
					case 9:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(151656.87);
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
