/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import { useAuth } from '../Context/AuthContext';

export function ExtraMensual() {
	const [extraMensual, SetExtraMensual] = useState(0);
	const servMutTit = 8118.59; //Valor del extra para titular
	const servMutPart = 6807.59; //Valor del extra para participante
	const servCesantia = 203; // valor de servicio de cesantía/junilación/fallecimiento
	const sepelio = 211; //valor de servicio de sepelio, lo pagan desde los 10 años
	const { datosCalculo } = useAuth();

	const ProtOdonto = () => {
		if (datosCalculo.protOdonto === 'SI') {
			if (parseInt(datosCalculo.quantity) === 1) {
				return 1196;
			} else if (parseInt(datosCalculo.quantity) > 1) {
				const calculoProt = 753 * parseInt(datosCalculo.quantity);
				return calculoProt;
			}
		} else {
			return 0;
		}
	};

	const determinacionExtra = () => {
		const protesisOdonto = ProtOdonto();
		const extraParticipantes = servMutPart * (datosCalculo.quantity - 1);
		const sepelioMenores = datosCalculo.childrens * sepelio;
		const extraMensualTotal =
			servMutTit + extraParticipantes - sepelioMenores + protesisOdonto;
		return extraMensualTotal;
	};

	const calculoExtraMensual = () => {
		const protesisOdonto = ProtOdonto();

		if (datosCalculo.regimen === 'Asalariado') {
			if (parseInt(datosCalculo.quantity) === 2) {
				if (datosCalculo.ageC <= 30 && datosCalculo.ageT <= 30) {
					const extraTotal = 0 + protesisOdonto;
					SetExtraMensual(extraTotal);
				}
			} else if (
				parseInt(datosCalculo.quantity) === 1 &&
				datosCalculo.ageT <= 30
			) {
				const extraTotal = 0 + protesisOdonto;

				SetExtraMensual(extraTotal);
			} else {
				SetExtraMensual(determinacionExtra());
			}
		} else if (datosCalculo.regimen === 'Autonomo') {
			if (parseInt(datosCalculo.quantity) === 1 && datosCalculo.ageT <= 30) {
				const extraTotal = servMutTit - servCesantia + protesisOdonto;
				SetExtraMensual(extraTotal);
			} else {
				SetExtraMensual(determinacionExtra());
			}
		} else {
			SetExtraMensual(determinacionExtra());
		}
	};

	useEffect(() => {
		ProtOdonto();
		determinacionExtra();
		calculoExtraMensual();
	}, [
		datosCalculo,
		datosCalculo.protOdonto,
		datosCalculo.quantity,
		datosCalculo.ageC,
		datosCalculo.sexC,
	]);

	return { extraMensual };
}
