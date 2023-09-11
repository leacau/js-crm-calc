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
		if (datosCalculo.regimen === 'Monotributo') {
			const calculoNetoMonotributo = () => {
				switch (parseInt(datosCalculo.quantity)) {
					case 1:
						if (datosCalculo.plan === 'PMI Monotributo Soltero') {
							if (datosCalculo.ageT >= 27 && datosCalculo.ageT <= 30) {
								SetNetoMonotributo(14237.25);
							} else if (datosCalculo.ageT <= 26) {
								SetNetoMonotributo(13041.46);
							} else {
								Swal.fire({
									text: 'Si es mayor de 30 años, el plan seleccionado deber no puede ser soltero',
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
							SetNetoMonotributo(22458.73);
						}

						break;
					case 2:
						SetNetoMonotributo(44917.44);

						break;
					case 3:
						SetNetoMonotributo(56146.81);

						break;
					case 4:
						SetNetoMonotributo(67376.17);

						break;
					case 5:
						SetNetoMonotributo(78605.52);

						break;
					case 6:
						SetNetoMonotributo(89834.89);
						break;
					case 7:
						SetNetoMonotributo(101064.25);
						break;
					case 8:
						SetNetoMonotributo(112293.62);
						break;
					case 9:
						SetNetoMonotributo(123522.97);

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
					SetAporteMonotributo(2755.58);
					break;
				case 'B':
					SetAporteMonotributo(2755.58);
					break;
				case 'C':
					SetAporteMonotributo(2755.58);
					break;
				case 'D':
					SetAporteMonotributo(3274.43);
					break;
				case 'E':
					SetAporteMonotributo(4006.82);
					break;
				case 'F':
					SetAporteMonotributo(4630.52);
					break;
				case 'G':
					SetAporteMonotributo(4961.27);
					break;
				case 'H':
					SetAporteMonotributo(5953.52);
					break;
				case 'I':
					SetAporteMonotributo(7371.03);
					break;
				case 'J':
					SetAporteMonotributo(8249.88);
					break;
				case 'K':
					SetAporteMonotributo(9454.76);
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
			const aporteRecibidoTotal = aporteMonotributo * datosCalculo.quantity;
			const finalMonotrinuto = netoMonotributo - aporteRecibidoTotal;
			SetValorMonotributo(finalMonotrinuto);
		}

		if (datosCalculo.regimenC === 'Monotributo') {
			switch (datosCalculo.categoriaC) {
				case 'A':
					SetAporteMonotCony(2755.58);
					break;
				case 'B':
					SetAporteMonotCony(2755.58);
					break;
				case 'C':
					SetAporteMonotCony(2755.58);
					break;
				case 'D':
					SetAporteMonotCony(3274.43);
					break;
				case 'E':
					SetAporteMonotCony(4006.82);
					break;
				case 'F':
					SetAporteMonotCony(4630.52);
					break;
				case 'G':
					SetAporteMonotCony(4961.27);
					break;
				case 'H':
					SetAporteMonotCony(5953.52);
					break;
				case 'I':
					SetAporteMonotCony(7371.03);
					break;
				case 'J':
					SetAporteMonotCony(8249.88);
					break;
				case 'K':
					SetAporteMonotCony(9454.76);
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
	]);

	return { valorMonotributo, aporteMonotCony };
	/* 		<>
			<Typography>
				Final Monotributo - Sin extra: $ {netoMonotributo}
			</Typography>
			<Typography>
				Aporte total Monotributo - Sin extra: $ {aporteRecibidoTotal}
			</Typography>
			<Typography>
				Valor Neto Monotributo - Sin extra: $ {valorMonotributo.toFixed(2)}
			</Typography>
			<Typography>
				Final Monotributo - con extra: $ {valorMonotributo.toFixed(2)}
			</Typography>
		</> */
}
