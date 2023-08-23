import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { Typography } from '@material-tailwind/react';
import { useAuth } from '../Context/AuthContext';

export function Asalariado() {
	const { datosCalculo } = useAuth();
	const [diferenciaTope, SetDiferenciaTope] = useState(0);

	const calculoDiferenciaTope = (grupo, plan, sueldo) => {
		const requeridosGrupo = [
			{
				Plan: 'PMI',
				value: 45818.84,
			},
			{
				Plan: 'PMI2000',
				value: 54414.02,
			},
			{
				Plan: 'PMI3000',
				value: 66961.69,
			},
		]; //Aportes requeridos para ingresos grupales
		const requeridosIndividual = [
			{
				Plan: 'PMI',
				value: 19854.62,
			},
			{
				Plan: 'PMI2000',
				value: 29934.74,
			},
			{
				Plan: 'PMI3000',
				value: 45207.92,
			},
		]; //Aportes requeridos para ingresos individuales
		const aporteMaximo = 23294.35; //Aporte personal de OS que representa el tope de descuento en el recibo de sueldo (776478.32*3)/100
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
			const difTope = requerido - ((sueldo * 100) / 3) * 0.0765;
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

	useEffect(() => {
		if (
			datosCalculo.regimen === 'Asalariado' &&
			datosCalculo.salary !== '' &&
			datosCalculo.salary !== 0 &&
			datosCalculo.plan !== ''
		) {
			calculoDiferenciaTope(
				datosCalculo.family,
				datosCalculo.plan,
				parseFloat(datosCalculo.salary)
			);
		} else {
			SetDiferenciaTope('Error');
		}
	}, [
		datosCalculo.childrens,
		datosCalculo.plan,
		datosCalculo.fmaily,
		datosCalculo.salary,
		datosCalculo.ageC,
		datosCalculo.ageT,
		datosCalculo.sexT,
		datosCalculo.sexC,
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
