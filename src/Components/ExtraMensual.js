/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import { useAuth } from '../Context/AuthContext';

export function ExtraMensual() {
	const { sepelio, extraMensualTitGrup, servCesantia, protOdont } = useAuth();
	const [extraMensualGrupo, SetExtraMensualGrupo] = useState(0);
	const servMutTit = parseFloat(extraMensualTitGrup[0]); //Valor del extra para titular
	const servMutPart = parseFloat(extraMensualTitGrup[1]); //Valor del extra para participante

	const { datosCalculo } = useAuth();

	const ProtOdonto = () => {
		if (datosCalculo.protOdonto === 'SI') {
			if (parseInt(datosCalculo.quantity) === 1) {
				return parseFloat(protOdont[0]);
			} else if (parseInt(datosCalculo.quantity) > 1) {
				const calculoProt =
					parseFloat(protOdont[1]) * parseInt(datosCalculo.quantity);
				return calculoProt;
			}
		} else {
			return 0;
		}
	};

	const determinacionExtra = () => {
		const protesisOdonto = ProtOdonto();
		const extraParticipantes =
			servMutPart * (parseInt(datosCalculo.quantity) - 1);
		const sepelioMenores = datosCalculo.childrens * sepelio;
		const extraMensualTotal =
			servMutTit + extraParticipantes - sepelioMenores + protesisOdonto;
		return extraMensualTotal;
	};

	const calculoExtraMensual = () => {
		const protesisOdonto = ProtOdonto();

		if (datosCalculo.regimen === 'Asalariado') {
			if (parseInt(datosCalculo.quantity) === 2) {
				if (
					datosCalculo.ageC <= 30 &&
					datosCalculo.ageT <= 30 &&
					datosCalculo.ageC !== ''
				) {
					const extraTotal = 0 + protesisOdonto;
					SetExtraMensualGrupo(extraTotal);
				} else {
					SetExtraMensualGrupo(determinacionExtra());
				}
			} else if (
				parseInt(datosCalculo.quantity) === 1 &&
				datosCalculo.ageT <= 30
			) {
				const extraTotal = 0 + protesisOdonto;

				SetExtraMensualGrupo(extraTotal);
			} else {
				SetExtraMensualGrupo(determinacionExtra());
			}
		} else if (datosCalculo.regimen === 'Autonomo') {
			if (datosCalculo.plan === 'PMI 2886 Soltero') {
				const extraTotal = servMutTit - servCesantia + protesisOdonto;
				SetExtraMensualGrupo(extraTotal);
			} else {
				SetExtraMensualGrupo(determinacionExtra());
			}
		} else {
			SetExtraMensualGrupo(determinacionExtra());
		}
	};

	useEffect(() => {
		ProtOdonto();
		determinacionExtra();
		calculoExtraMensual();
		console.log(extraMensualGrupo);
	}, [
		datosCalculo,
		datosCalculo.protOdonto,
		datosCalculo.quantity,
		datosCalculo.ageC,
		datosCalculo.sexC,
		datosCalculo.plan,
	]);

	return { extraMensualGrupo };
}
