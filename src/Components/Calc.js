import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Typography,
} from '@material-tailwind/react';
import React, { reload, useEffect, useState } from 'react';

import Swal from 'sweetalert2';

export function Calc() {
	const [user, SetUser] = useState({
		plan: '',
		sexT: 'M',
		ageT: '',
		sexC: '',
		ageC: '',
		family: 'NO',
		quantity: 1,
		childrens: 0,
		salary: 0,
		regimen: '',
		categoria: '',
	});
	const [input, SetInput] = useState('');
	const [difDeTope, SetDifDeTope] = useState(0);
	const [fondoJubTitular, SetFondoJubTitular] = useState(parseInt(0));
	const [fondoJubConyuge, SetFondoJubConyuge] = useState(parseInt(0));
	const [servMutual, SetServMutual] = useState('');
	const [aporteRecibMonot, SetAporteRecibMonot] = useState('');
	const [netoAutonomo, SetNetoAutonomo] = useState('');
	const [netoMonotributo, SetNetoMonotributo] = useState('');
	const [finalMonotributo, SetFinalMonotributo] = useState('');
	const servMutTit = 8118.59; //Valor del extra para titular
	const servMutPart = 6807.59; //Valor del extra para participante
	const sepelio = 211;

	const reset = () => {
		window.location.reload();
	};
	const calculoFondoJub = (edad, sexo) => {
		if (sexo === 'M') {
			if (edad >= 50 && edad <= 54) {
				return parseInt(1114);
			} else if (edad >= 55 && edad <= 59) {
				return parseInt(2226);
			} else if (edad >= 60) {
				return parseInt(3340);
			} else {
				return 0;
			}
		} else {
			if (edad >= 45 && edad <= 49) {
				return parseInt(1114);
			} else if (edad >= 50 && edad <= 54) {
				return parseInt(2226);
			} else if (edad >= 55) {
				return parseInt(3340);
			} else {
				return 0;
			}
		}
	};
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
			const diferenciaTope = requerido - ((sueldo * 100) / 3) * 0.0765;

			return diferenciaTope;
		} else {
			const requerido = requeridosIndividual.find(
				(item) => item.Plan === plan
			).value;
			const diferenciaTope = requerido - ((sueldo * 100) / 3) * 0.0765;

			return diferenciaTope;
		}
	};
	const cantPersonas = () => {
		if (user.family === 'SI') {
			SetInput(
				<div className='flex flex-col justify-center items-center h-full'>
					<div className='m-1'>
						<Input
							label='Cantidad de personas'
							name='quantity'
							size='lg'
							defaultValue={''}
							onChange={handleChange}
						/>
					</div>
					<div className='m-1'>
						<Input
							label='Hijos menores de 10 años'
							name='childrens'
							size='lg'
							defaultValue={''}
							onChange={handleChange}
						/>
					</div>
					<div className='m-1 flex-auto'>
						<Input
							label='Edad de conyuge'
							name='ageC'
							size='lg'
							defaultValue={''}
							onChange={handleChange}
						/>
						<select
							className='form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-transparent border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
							label='Sexo de conyuge'
							name='sexC'
							size='lg'
							onChange={handleChange}
						>
							<option value=''>Sexo de conyuge</option>
							<option value='M'>M</option>
							<option value='F'>F</option>
						</select>
					</div>
				</div>
			);
		} else {
			SetUser({ ...user, quantity: parseInt(1) });
			SetInput('');
		}
	};
	useEffect(() => {
		cantPersonas();
		if (user.ageT !== undefined || user.ageT !== '') {
			const fondoJubTit = calculoFondoJub(user.ageT, user.sexT);
			SetFondoJubTitular(fondoJubTit);

			if (user.ageC !== undefined || user.ageC !== '') {
				const fondoJubCony = calculoFondoJub(user.ageC, user.sexC);
				SetFondoJubConyuge(fondoJubCony);
			}
		}

		if (user.regimen !== 'Asalariado') {
			switch (parseInt(user.quantity)) {
				case 1:
					if (user.regimen === 'Autonomo') {
						if (user.plan === 'PMI 2886 Soltero') {
							if (user.ageT >= 27 && user.ageT <= 30) {
								SetNetoAutonomo(14703.05);
							} else if (user.ageT <= 26) {
								SetNetoAutonomo(13460.61);
							} else {
								Swal.fire({
									text: 'Si es mayor de 30 años, el plan seleccionado deber no puede ser soltero',
									icon: 'info',
									confirmButtonText: 'ok',
								});
							}
						} else if (user.plan === 'PMI 2886') {
							SetNetoAutonomo(23226.22);
						} else if (user.plan === 'PMI 2886/2000') {
							SetNetoAutonomo(36385.07);
						}
					} else if (user.regimen === 'Monotributo') {
						if (user.plan === 'PMI Monotributo Soltero') {
							if (user.ageT >= 27 && user.ageT <= 30) {
								SetNetoMonotributo(13309.57);
							} else if (user.ageT <= 26) {
								SetNetoMonotributo(12191.7);
							} else {
								Swal.fire({
									text: 'Si es mayor de 30 años, el plan seleccionado deber no puede ser soltero',
									icon: 'info',
									confirmButtonText: 'ok',
								});
							}
						} else {
							SetNetoMonotributo(20995.35);
						}
					}
					break;
				case 2:
					if (user.regimen === 'Autonomo') {
						if (user.plan === 'PMI 2886') {
							SetNetoAutonomo(46452.43);
						} else {
							SetNetoAutonomo(72770.14);
						}
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(41990.69);
					}
					break;
				case 3:
					if (user.regimen === 'Autonomo') {
						if (user.plan === 'PMI 2886') {
							SetNetoAutonomo(58065.53);
						} else {
							SetNetoAutonomo(90962.67);
						}
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(52488.37);
					}
					break;
				case 4:
					if (user.regimen === 'Autonomo') {
						if (user.plan === 'PMI 2886') {
							SetNetoAutonomo(69678.65);
						} else {
							SetNetoAutonomo(109155.21);
						}
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(62986.05);
					}
					break;
				case 5:
					if (user.regimen === 'Autonomo') {
						if (user.plan === 'PMI 2886') {
							SetNetoAutonomo(81291.75);
						} else {
							SetNetoAutonomo(127347.74);
						}
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(73483.71);
					}
					break;
				case 6:
					if (user.regimen === 'Autonomo') {
						if (user.plan === 'PMI 2886') {
							SetNetoAutonomo(92904.87);
						} else {
							SetNetoAutonomo(145540.28);
						}
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(83981.39);
					}
					break;
				case 7:
					if (user.regimen === 'Autonomo') {
						if (user.plan === 'PMI 2886') {
							SetNetoAutonomo(104517.97);
						} else {
							SetNetoAutonomo(163732.8);
						}
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(94479.06);
					}
					break;
				case 8:
					if (user.regimen === 'Autonomo') {
						if (user.plan === 'PMI 2886') {
							SetNetoAutonomo(116131.08);
						} else {
							SetNetoAutonomo(181925.35);
						}
					} else if (user.regimen === 'Monotributo') {
						if (user.plan === 'PMI 2886') {
							SetNetoAutonomo(116131.08);
						} else {
						}
					}
					break;
				case 9:
					if (user.regimen === 'Autonomo') {
						if (user.plan === 'PMI 2886') {
							SetNetoAutonomo(127748.37);
						} else {
							Swal.fire({
								text: 'El valor del plan PMI 2886/2000 no esta definido para 9 personas.',
								icon: 'info',
								confirmButtonText: 'ok',
							});
						}
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(115474.4);
					}
					break;
				default:
					Swal.fire({
						text: 'Criterio fuera de evaluación, consultá en administración',
						icon: 'info',
						confirmButtonText: 'ok',
					});
					SetAporteRecibMonot(0);
					SetFinalMonotributo(0);
					SetNetoAutonomo(0);
					SetNetoMonotributo(0);
					SetServMutual(0);
			} //Devuelve el valor NETO del plan autonomo o monotributo de acuerdo a la cantidad de personas
			switch (user.categoria) {
				case 'A':
					SetAporteRecibMonot(parseFloat(2755.58).toFixed(2));
					break;
				case 'B':
					SetAporteRecibMonot(parseFloat(2755.58).toFixed(2));
					break;
				case 'C':
					SetAporteRecibMonot(parseFloat(2755.58).toFixed(2));
					break;
				case 'D':
					SetAporteRecibMonot(parseFloat(3274.43).toFixed(2));
					break;
				case 'E':
					SetAporteRecibMonot(parseFloat(4006.82).toFixed(2));
					break;
				case 'F':
					SetAporteRecibMonot(parseFloat(4630.52).toFixed(2));
					break;
				case 'G':
					SetAporteRecibMonot(parseFloat(4961.27).toFixed(2));
					break;
				case 'H':
					SetAporteRecibMonot(parseFloat(5953.52).toFixed(2));
					break;
				case 'I':
					SetAporteRecibMonot(parseFloat(7371.03).toFixed(2));
					break;
				case 'J':
					SetAporteRecibMonot(parseFloat(8249.88).toFixed(2));
					break;
				case 'K':
					SetAporteRecibMonot(parseFloat(9454.76).toFixed(2));
					break;
				case '':
					break;
				default:
					Swal.fire({
						text: 'Categoria inexistente, consultá en administración',
						icon: 'info',
						confirmButtonText: 'ok',
					});
					SetAporteRecibMonot(0);
					SetFinalMonotributo(0);
					SetNetoAutonomo(0);
					SetNetoMonotributo(0);
					SetServMutual(0);
			} //Devuelve el aporte recibido por persona, de acuerdo a la categoria del monotributo
		}
	}, [
		user.family,
		user.categoria,
		user.quantity,
		user.ageC,
		user.ageT,
		user.sexC,
		user.sexT,
		user.salary,
		user.plan,
	]);

	const servicio = () => {
		if (user.regimen === 'Asalariado') {
			const diferenciaDeTope = calculoDiferenciaTope(
				user.family,
				user.plan,
				parseFloat(user.salary)
			);
			SetDifDeTope(diferenciaDeTope.toFixed(2));
		}

		const subTotalExtra =
			parseFloat(servMutTit) + parseFloat((user.quantity - 1) * servMutPart);

		const sepelioMenores = parseInt(user.childrens) * parseFloat(sepelio);

		const totalExtra =
			subTotalExtra - sepelioMenores + fondoJubConyuge + fondoJubTitular;

		if (user.regimen !== 'Asalariado') {
			if (user.regimen === 'Autonomo' && user.plan === 'PMI 2886 Soltero') {
				SetServMutual(totalExtra.toFixed(2) - parseInt(203)); //Asigna extra mensual de acuerdo a cantidad de personas (restando el sepelio de los menores)
			} else {
				SetServMutual(totalExtra.toFixed(2)); //Asigna extra mensual de acuerdo a cantidad de personas (restando el sepelio de los menores)
			}
		} else {
			console.log(user.quantity, user.ageT, user.ageC);
			if (parseInt(user.quantity) === 1 && parseInt(user.ageT) < 31) {
				SetServMutual(0);
			} else if (
				parseInt(user.quantity) === 2 &&
				parseInt(user.ageT) < 31 &&
				parseInt(user.ageC) < 31 &&
				parseInt(user.ageC) !== ''
			) {
				SetServMutual(0);
			} else {
				SetServMutual(totalExtra.toFixed(2)); //Asigna extra mensual de acuerdo a cantidad de personas (restando el sepelio de los menores)
			}
		}

		if (user.regimen === 'Autonomo') {
			SetFinalMonotributo(0);
		} else if (user.regimen === 'Monotributo') {
			SetNetoAutonomo(0);
			const aporteTotalRecibidoMonot = aporteRecibMonot * user.quantity;

			SetFinalMonotributo(
				netoMonotributo.toFixed(2) - aporteTotalRecibidoMonot.toFixed(2)
			);
		}
	};

	const handleChange = ({ target: { name, value } }) => {
		SetUser({ ...user, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		servicio();
	};

	const totalFinal =
		parseFloat(servMutual) +
		parseFloat(finalMonotributo) +
		parseFloat(netoAutonomo);

	return (
		<div>
			<div className='flex justify-center items-center'>
				<Card className='md:container md:w-fit w-fit mt-7 p-4'>
					<CardHeader
						variant='gradient'
						color='white'
						className='md:mb-4 md:grid md:h-18 mb-2 grid h-14 place-items-center border-black border-2 shadow-black-400 mt-1'
					>
						<Typography className='md:text-3xl font-bold text-xl' color='green'>
							Cotizador
						</Typography>
					</CardHeader>
					<CardBody className='flex flex-col gap-4'>
						<select
							className='form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
							aria-label='Default select example'
							name='regimen'
							size='lg'
							onChange={handleChange}
						>
							<option value=''>Selecciona Régimen</option>
							<option value='Asalariado'>Asalariado</option>
							<option value='Autonomo'>Autonomo</option>
							<option value='Monotributo'>Monotributo</option>
						</select>
						<select
							className='form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
							aria-label='Default select example'
							name='plan'
							size='lg'
							onChange={handleChange}
						>
							<option value=''>Selecciona el plan</option>
							{user.regimen === 'Asalariado' && (
								<option value='PMI'>PMI</option>
							)}
							{user.regimen === 'Asalariado' && (
								<option value='PMI2000'>PMI 2000</option>
							)}
							{user.regimen === 'Asalariado' && (
								<option value='PMI3000'>PMI 3000</option>
							)}
							{user.regimen === 'Autonomo' &&
								user.ageT <= 30 &&
								user.quantity === 1 && (
									<option value='PMI 2886 Soltero'>PMI 2886 Soltero</option>
								)}
							{user.regimen === 'Autonomo' && (
								<option value='PMI 2886'>PMI 2886</option>
							)}
							{user.regimen === 'Autonomo' && (
								<option value='PMI 2886/2000'>PMI 2886/2000</option>
							)}
							{user.regimen === 'Monotributo' &&
								user.ageT <= 30 &&
								user.quantity === 1 && (
									<option value='PMI Monotributo Soltero'>
										PMI Monotributo Soltero
									</option>
								)}
							{user.regimen === 'Monotributo' && (
								<option value='PMI Monotributo'>PMI Monotributo</option>
							)}
						</select>
						<select
							className='form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
							aria-label='Default select example'
							name='family'
							size='lg'
							onChange={handleChange}
						>
							<option value=''>Selecciona ingreso</option>
							<option value='NO'>Individual</option>
							<option value='SI'>Grupo Familiar</option>
						</select>
						<div className='m-1'>
							<Input
								label='Edad y sexo del titular'
								name='ageT'
								size='lg'
								defaultValue={''}
								onChange={handleChange}
							/>
							<select
								className='form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-transparent border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
								label='Sexo de titular'
								name='sexT'
								size='lg'
								onChange={handleChange}
								defaultValue={''}
							>
								<option value='M'>M</option>
								<option value='F'>F</option>
							</select>
						</div>

						{input}
						{user.regimen === 'Asalariado' && (
							<div className='m-1'>
								<Input
									label='Aporte de Obra Social'
									name='salary'
									size='lg'
									defaultValue={''}
									onChange={handleChange}
								/>
							</div>
						)}
						{user.regimen === 'Monotributo' && (
							<select
								className='form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
								aria-label='Default select example'
								name='categoria'
								size='lg'
								onChange={handleChange}
							>
								<option value=''>Selecciona Categoria</option>
								<option value='A'>A</option>
								<option value='B'>B</option>
								<option value='C'>C</option>
								<option value='D'>D</option>
								<option value='E'>E</option>
								<option value='F'>F</option>
								<option value='G'>G</option>
								<option value='H'>H</option>
								<option value='I'>I</option>
								<option value='J'>J</option>
								<option value='K'>K</option>
							</select>
						)}
					</CardBody>
					<CardFooter className='pt-0'>
						<Button
							variant='gradient'
							color='white'
							className='border-blue-500 border-2 hover:shadow-blue-200'
							fullWidth
							onClick={handleSubmit}
						>
							<Typography color='blue' className='text-xs'>
								Calcular
							</Typography>
						</Button>
						<Button
							variant='gradient'
							color='white'
							className='border-red-500 border-2 hover:shadow-blue-200 mt-4'
							fullWidth
							onClick={reset}
						>
							<Typography color='red' className='text-xs'>
								Nueva consulta
							</Typography>
						</Button>
					</CardFooter>
					<Typography className='md:text-31l font-bold text-xl' color='green'>
						Valor Extra: $ {servMutual}
					</Typography>
					{user.regimen === 'Asalariado' && (
						<Typography className='md:text-1xl font-bold text-xl' color='green'>
							Diferencia de Tope: $ {difDeTope < 0 ? 0 : difDeTope}
						</Typography>
					)}
					{user.regimen === 'Monotributo' && (
						<Typography className='md:text-1xl font-bold text-xl' color='green'>
							Valor Monotributo: ${' '}
							{finalMonotributo !== '' &&
								parseFloat(finalMonotributo).toFixed(2)}
						</Typography>
					)}
					{user.regimen === 'Autonomo' && (
						<Typography className='md:text-1xl font-bold text-xl' color='green'>
							Neto autonomo: $ {netoAutonomo}
						</Typography>
					)}
					{user.regimen !== 'Asalariado' && (
						<Typography className='md:text-1xl font-bold text-xl' color='green'>
							Valor total: ${' '}
							{totalFinal !== '' && parseFloat(totalFinal).toFixed(2)}
						</Typography>
					)}
				</Card>
			</div>
			<div className='flex justify-center items-center mt-8'>
				<Typography
					className='md:text-1xl font-bold text-xl justify-center'
					color='green'
				>
					Actualización 11-08-2023
				</Typography>
			</div>
		</div>
	);
}
