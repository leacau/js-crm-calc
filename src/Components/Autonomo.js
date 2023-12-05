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
								SetNetoAutonomo(20682.25);
							} else if (datosCalculo.ageT <= 26) {
								SetNetoAutonomo(18934.55);
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
							SetNetoAutonomo(32671.48);
						} else if (datosCalculo.plan === 'PMI 2886/2000') {
							SetNetoAutonomo(51181.56);
						}

						break;
					case 2:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(65342.96);
						} else {
							SetNetoAutonomo(102363.13);
						}

						break;
					case 3:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(81678.69);
						} else {
							SetNetoAutonomo(127953.9);
						}

						break;
					case 4:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(98014.44);
						} else {
							SetNetoAutonomo(153544.69);
						}

						break;
					case 5:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(114350.17);
						} else {
							SetNetoAutonomo(179135.47);
						}

						break;
					case 6:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(130685.92);
						} else {
							SetNetoAutonomo(204726.25);
						}

						break;
					case 7:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(147021.66);
						} else {
							SetNetoAutonomo(230317.03);
						}

						break;
					case 8:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(163357.4);
						} else {
							SetNetoAutonomo(255907.82);
						}

						break;
					case 9:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(179699.03);
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
