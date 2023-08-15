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
								SetNetoAutonomo(14703.05);
							} else if (datosCalculo.ageT <= 26) {
								SetNetoAutonomo(13460.61);
							} else {
								Swal.fire({
									text: 'Si es mayor de 30 años, el plan seleccionado deber no puede ser soltero',
									icon: 'info',
									confirmButtonText: 'ok',
								});
							}
						} else if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(23226.22);
						} else if (datosCalculo.plan === 'PMI 2886/2000') {
							SetNetoAutonomo(36385.07);
						}

						break;
					case 2:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(46452.43);
						} else {
							SetNetoAutonomo(72770.14);
						}

						break;
					case 3:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(58065.53);
						} else {
							SetNetoAutonomo(90962.67);
						}

						break;
					case 4:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(69678.65);
						} else {
							SetNetoAutonomo(109155.21);
						}

						break;
					case 5:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(81291.75);
						} else {
							SetNetoAutonomo(127347.74);
						}

						break;
					case 6:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(92904.87);
						} else {
							SetNetoAutonomo(145540.28);
						}

						break;
					case 7:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(104517.97);
						} else {
							SetNetoAutonomo(163732.8);
						}

						break;
					case 8:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(116131.08);
						} else {
							SetNetoAutonomo(181925.35);
						}

						break;
					case 9:
						if (datosCalculo.plan === 'PMI 2886') {
							SetNetoAutonomo(127748.37);
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
