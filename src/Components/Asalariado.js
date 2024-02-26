import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { Typography } from '@material-tailwind/react';
import { useAuth } from '../Context/AuthContext';

export function Asalariado() {
	const { datosCalculo } = useAuth();
	const [diferenciaTope, SetDiferenciaTope] = useState(0);
	const [sueldoConyuge, SetSueldoConyuge] = useState(0);
	const requeridos_ind = [34687.54, 52298.29, 78981.7];
	const requeridos_grup = [80049.02, 95065.45, 116987.2];

	useEffect(() => {
		const calculoDiferenciaTope = (grupo, plan, sueldo, regimenC, aporteC) => {
			const requeridosGrupo = [
				{
					Plan: 'PMI',
					value: requeridos_grup[0],
				},
				{
					Plan: 'PMI2000',
					value: requeridos_grup[1],
				},
				{
					Plan: 'PMI3000',
					value: requeridos_grup[2],
				},
			]; //Aportes requeridos para ingresos grupales
			const requeridosIndividual = [
				{
					Plan: 'PMI',
					value: requeridos_ind[0],
				},
				{
					Plan: 'PMI2000',
					value: requeridos_ind[1],
				},
				{
					Plan: 'PMI3000',
					value: requeridos_ind[2],
				},
			]; //Aportes requeridos para ingresos individuales
			const aporteMaximo = 34713.3; //Aporte personal de OS que representa el tope de descuento en el recibo de sueldo (776478.32*3)/100
			if (sueldo >= aporteMaximo) {
				Swal.fire({
					text: 'El sueldo calculado es el máximo para el descuento de aportes de Obra Social. Consultá con administración.',
					icon: 'info',
					confirmButtonText: 'ok',
				});
			} else if (grupo === 'SI') {
				const requerido = requeridosGrupo.find(
					(item) => item.Plan === plan
				).value;
				const sueldoTitular = ((sueldo * 100) / 3) * 0.0765;

				if (regimenC === 'Asalariado' && aporteC !== '' && aporteC !== NaN) {
					const sueldoCony = ((aporteC * 100) / 3) * 0.0765;
					SetSueldoConyuge(sueldoCony);
				} else if (regimenC === 'Monotributo') {
					SetSueldoConyuge(0);
				} else {
					SetSueldoConyuge(0);
				}

				const difTope =
					parseFloat(requerido) -
					parseFloat(sueldoTitular) -
					parseFloat(sueldoConyuge);

				if (difTope > 0) {
					SetDiferenciaTope(difTope.toFixed(2));
				} else {
					SetDiferenciaTope(0);
				}
			} else {
				const requerido = requeridosIndividual.find(
					(item) => item.Plan === plan
				).value;

				const difTope = requerido - ((sueldo * 100) / 3) * 0.0765;

				if (difTope > 0) {
					SetDiferenciaTope(difTope.toFixed(2));
				} else {
					SetDiferenciaTope(0);
				}
			}
		};
		if (
			datosCalculo.regimen === 'Asalariado' &&
			datosCalculo.salary !== '' &&
			datosCalculo.salary !== 0 &&
			datosCalculo.plan !== ''
		) {
			calculoDiferenciaTope(
				datosCalculo.family,
				datosCalculo.plan,
				parseFloat(datosCalculo.salary),
				datosCalculo.regimenC,
				parseFloat(datosCalculo.aporteC)
			);
		} else {
			SetDiferenciaTope('Error');
		}
	}, [
		datosCalculo.childrens,
		datosCalculo.plan,
		datosCalculo.family,
		datosCalculo.regimen,
		datosCalculo.salary,
		datosCalculo.ageC,
		datosCalculo.ageT,
		datosCalculo.sexT,
		datosCalculo.sexC,
		datosCalculo.aporteC,
		datosCalculo.regimenC,
		datosCalculo.categoriaC,
		sueldoConyuge,
		datosCalculo,
	]);

	if (diferenciaTope === 'Error') {
		return (
			<>
				<Typography>Error en los datos informado</Typography>
			</>
		);
	} else {
		return { diferenciaTope };
	}
}
