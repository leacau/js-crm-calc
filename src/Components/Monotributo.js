import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { useAuth } from '../Context/AuthContext';

export function Monotributo() {
	const { datosCalculo, setContacto } = useAuth();
	const [netoMonotributo, SetNetoMonotributo] = useState();
	const [aporteMonotributo, SetAporteMonotributo] = useState();
	const [valorMonotributo, SetValorMonotributo] = useState();
	const [aporteMonotCony, SetAporteMonotCony] = useState(0);

	useEffect(() => {
		const netosMonotTodos = [
			39864.86, 43520.11, 68651.36, 137302.68, 171628.37, 205954.05, 240279.68,
			274605.37, 308931.05, 343256.73, 377582.37,
		];
		const aporteMonotCateg = [
			5811.53, 6905.82, 8450.42, 9765.81, 10463.36, 12556.04, 15545.57,
			17399.08, 19940.19,
		];

		if (datosCalculo.regimen === 'Monotributo') {
			const calculoNetoMonotributo = () => {
				switch (parseInt(datosCalculo.quantity)) {
					case 1:
						if (datosCalculo.plan === 'PMI Monotributo Soltero') {
							if (datosCalculo.ageT >= 27 && datosCalculo.ageT <= 30) {
								SetNetoMonotributo(netosMonotTodos[1]);
							} else if (datosCalculo.ageT <= 26) {
								SetNetoMonotributo(netosMonotTodos[0]);
							} else {
								Swal.fire({
									text: 'Si es mayor de 30 años, el plan seleccionado no puede ser soltero',
									icon: 'info',
									confirmButtonText: 'ok',
								});
							}
						} else {
							if (
								datosCalculo.ageT <= 30 &&
								datosCalculo.ageT !== '' &&
								datosCalculo.ageT > 9
							) {
								Swal.fire({
									text: 'El valor que se devuelve es el correspondiente a un PMI Monotributo, no se tiene el cuenta el beneficio del plan joven',
									icon: 'info',
									confirmButtonText: 'ok',
								});
							}
							SetNetoMonotributo(netosMonotTodos[2]);
						}

						break;
					case 2:
						SetNetoMonotributo(netosMonotTodos[3]);

						break;
					case 3:
						SetNetoMonotributo(netosMonotTodos[4]);

						break;
					case 4:
						SetNetoMonotributo(netosMonotTodos[5]);

						break;
					case 5:
						SetNetoMonotributo(netosMonotTodos[6]);

						break;
					case 6:
						SetNetoMonotributo(netosMonotTodos[7]);
						break;
					case 7:
						SetNetoMonotributo(netosMonotTodos[8]);
						break;
					case 8:
						SetNetoMonotributo(netosMonotTodos[9]);
						break;
					case 9:
						SetNetoMonotributo(netosMonotTodos[10]);

						break;
					default:
						Swal.fire({
							text: 'Criterio fuera de evaluación, consultá en administración',
							icon: 'info',
							confirmButtonText: 'ok',
						});
						SetNetoMonotributo(0);
				} //Devuelve el valor NETO del plan monotributo de acuerdo a la cantidad de personas y categoria de inscripcion
			};

			switch (datosCalculo.categoria) {
				case 'A':
					SetAporteMonotributo(aporteMonotCateg[0]);
					break;
				case 'B':
					SetAporteMonotributo(aporteMonotCateg[0]);
					break;
				case 'C':
					SetAporteMonotributo(aporteMonotCateg[0]);
					break;
				case 'D':
					SetAporteMonotributo(aporteMonotCateg[1]);
					break;
				case 'E':
					SetAporteMonotributo(aporteMonotCateg[2]);
					break;
				case 'F':
					SetAporteMonotributo(aporteMonotCateg[3]);
					break;
				case 'G':
					SetAporteMonotributo(aporteMonotCateg[4]);
					break;
				case 'H':
					SetAporteMonotributo(aporteMonotCateg[5]);
					break;
				case 'I':
					SetAporteMonotributo(aporteMonotCateg[6]);
					break;
				case 'J':
					SetAporteMonotributo(aporteMonotCateg[7]);
					break;
				case 'K':
					SetAporteMonotributo(aporteMonotCateg[8]);
					break;
				case '':
					break;
				default:
					Swal.fire({
						text: 'Categoria inexistente, consultá en administración',
						icon: 'info',
						confirmButtonText: 'ok',
					});
					SetAporteMonotributo(0);
				//Devuelve el aporte recibido por persona, de acuerdo a la categoria del monotributo
			}
			calculoNetoMonotributo();
			if (datosCalculo.regimenC === 'Monotributo') {
				const aporteRecibidoTotal =
					aporteMonotributo * (datosCalculo.quantity - 1) + aporteMonotCony;
				const finalMonotrinuto = netoMonotributo - aporteRecibidoTotal;
				SetValorMonotributo(finalMonotrinuto);
			} else {
				const aporteRecibidoTotal = aporteMonotributo * datosCalculo.quantity;
				const finalMonotrinuto = netoMonotributo - aporteRecibidoTotal;
				SetValorMonotributo(finalMonotrinuto);
			}
		}

		if (datosCalculo.regimenC === 'Monotributo') {
			switch (datosCalculo.categoriaC) {
				case 'A':
					SetAporteMonotCony(aporteMonotCateg[0]);
					break;
				case 'B':
					SetAporteMonotCony(aporteMonotCateg[0]);
					break;
				case 'C':
					SetAporteMonotCony(aporteMonotCateg[0]);
					break;
				case 'D':
					SetAporteMonotCony(aporteMonotCateg[1]);
					break;
				case 'E':
					SetAporteMonotCony(aporteMonotCateg[2]);
					break;
				case 'F':
					SetAporteMonotCony(aporteMonotCateg[3]);
					break;
				case 'G':
					SetAporteMonotCony(aporteMonotCateg[4]);
					break;
				case 'H':
					SetAporteMonotCony(aporteMonotCateg[5]);
					break;
				case 'I':
					SetAporteMonotCony(aporteMonotCateg[6]);
					break;
				case 'J':
					SetAporteMonotCony(aporteMonotCateg[7]);
					break;
				case 'K':
					SetAporteMonotCony(aporteMonotCateg[8]);
					break;
				case '':
					break;
				default:
					Swal.fire({
						text: 'Categoria inexistente, consultá en administración',
						icon: 'info',
						confirmButtonText: 'ok',
					});
					SetAporteMonotCony(0);
					setContacto({ ...datosCalculo, aporteC: 0 });
				//Devuelve el aporte recibido por persona, de acuerdo a la categoria del monotributo
			}
		}
	}, [
		datosCalculo.regimen,
		datosCalculo.aporteC,
		datosCalculo.regimenC,
		datosCalculo.categoria,
		datosCalculo.quantity,
		datosCalculo.plan,
		datosCalculo.family,
		datosCalculo.ageT,
		datosCalculo.categoriaC,
		datosCalculo,
		datosCalculo.ageC,
		aporteMonotributo,
		netoMonotributo,
		aporteMonotCony,
	]);

	return { valorMonotributo, aporteMonotCony, netoMonotributo };
}
