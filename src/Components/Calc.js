import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Typography,
} from '@material-tailwind/react';

import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useState } from 'react';

export function Calc() {
	const [user, SetUser] = useState({
		plan: '',
		family: '',
		quantity: 1,
		childrens: 0,
		ageT: '',
		ageC: '',
		salary: 0,
		regimen: '',
		categoria: '',
	});
	const [input, SetInput] = useState('');
	const [servMutual, SetServMutual] = useState('');
	const [difDeTope, SetDifDeTope] = useState('');
	const [aporteRecibMonot, SetAporteRecibMonot] = useState('');
	const [netoAutonomo, SetNetoAutonomo] = useState('');
	const [netoMonotributo, SetNetoMonotributo] = useState('');
	const [finalMonotributo, SetFinalMonotributo] = useState('');
	const servMutTit = 8118.59; //Valor del extra para titular
	const servMutPart = 6807.59; //Valor del extra para participante
	const aporteMaximo = 23294.35; //Aporte personal de OS que representa el tope de descuento en el recibo de sueldo (776478.32*3)/100
	const sepelio = 211;
	const requeridosGrup = [
		{
			Plan: 'PMI',
			Value: 45818.84,
		},
		{
			Plan: 'PMI2000',
			Value: 54414.02,
		},
		{
			Plan: 'PMI3000',
			Value: 66961.69,
		},
	]; //Aportes requeridos para ingresos grupales

	useEffect(() => {
		switch (user.categoria) {
			case 'A':
				SetAporteRecibMonot(parseFloat(2755.58));
				break;
			case 'B':
				SetAporteRecibMonot(parseFloat(2755.58));
				break;
			case 'C':
				SetAporteRecibMonot(parseFloat(2755.58));
				break;
			case 'D':
				SetAporteRecibMonot(parseFloat(3274.43));
				break;
			case 'E':
				SetAporteRecibMonot(parseFloat(4006.82));
				break;
			case 'F':
				SetAporteRecibMonot(parseFloat(4630.52));
				break;
			case 'G':
				SetAporteRecibMonot(parseFloat(4961.27));
				break;
			case 'H':
				SetAporteRecibMonot(parseFloat(5953.52));
				break;
			case 'I':
				SetAporteRecibMonot(parseFloat(7371.03));
				break;
			case 'J':
				SetAporteRecibMonot(parseFloat(8249.88));
				break;
			case 'K':
				SetAporteRecibMonot(parseFloat(9454.76));
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
		if (user.regimen !== 'Asalariado') {
			switch (parseInt(user.quantity)) {
				case 1:
					if (user.regimen === 'Autonomo') {
						SetNetoAutonomo(23226.22);
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(20995.35);
					}
					break;
				case 2:
					if (user.regimen === 'Autonomo') {
						SetNetoAutonomo(46452.43);
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(41990.69);
					}
					break;
				case 3:
					if (user.regimen === 'Autonomo') {
						SetNetoAutonomo(58065.53);
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(52488.37);
					}
					break;
				case 4:
					if (user.regimen === 'Autonomo') {
						SetNetoAutonomo(69678.65);
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(62986.05);
					}
					break;
				case 5:
					if (user.regimen === 'Autonomo') {
						SetNetoAutonomo(81291.75);
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(73483.71);
					}
					break;
				case 6:
					if (user.regimen === 'Autonomo') {
						SetNetoAutonomo(92904.87);
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(83981.39);
					}
					break;
				case 7:
					if (user.regimen === 'Autonomo') {
						SetNetoAutonomo(104517.97);
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(94479.06);
					}
					break;
				case 8:
					if (user.regimen === 'Autonomo') {
						SetNetoAutonomo(116131.08);
					} else if (user.regimen === 'Monotributo') {
						SetNetoMonotributo(104976.74);
					}
					break;
				case 9:
					if (user.regimen === 'Autonomo') {
						SetNetoAutonomo(127748.37);
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
		}

		const cantPersonas = () => {
			if (user.family === 'true') {
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
					</div>
				);
			} else {
				SetUser({ ...user, quantity: parseInt(1) });
				SetInput('');
			}
		};
		cantPersonas();
	}, [user.family, user.categoria, user.quantity]);

	/* const categMonot = [
		{
			categoria: 'A',
			Value: 2755.58,
		},
		{
			categoria: 'B',
			Value: 2755.58,
		},
		{
			categoria: 'C',
			Value: 2755.58,
		},
		{
			categoria: 'D',
			Value: 3274.43,
		},
		{
			categoria: 'E',
			Value: 4006.82,
		},
		{
			categoria: 'F',
			Value: 4630.52,
		},
		{
			categoria: 'G',
			Value: 4961.27,
		},
		{
			categoria: 'H',
			Value: 5953.52,
		},
		{
			categoria: 'I',
			Value: 7371.03,
		},
		{
			categoria: 'J',
			Value: 8249.88,
		},
		{
			categoria: 'K',
			Value: 9454.76,
		},
	]; */ //Aporte frecibido por la OS de acuerdo a la categoría del monotributo

	const requeridosIndiv = [
		{
			Plan: 'PMI',
			Value: 19854.62,
		},
		{
			Plan: 'PMI2000',
			Value: 29934.74,
		},
		{
			Plan: 'PMI3000',
			Value: 45207.92,
		},
	]; //Aportes requeridos para ingresos individuales

	const servicio = () => {
		const subTotalExtra = servMutTit + (user.quantity - 1) * servMutPart;
		const totalExtra = subTotalExtra - user.childrens * sepelio;
		SetServMutual(parseFloat(totalExtra).toFixed(2)); //Asigna extra mensual de acuerdo a cantidad de personas (restando el sepelio de los menores)

		if (user.regimen === 'Autonomo') {
			SetFinalMonotributo(0);
		} else if (user.regimen === 'Monotributo') {
			SetNetoAutonomo(0);
			const aporteTotalRecibidoMonot = aporteRecibMonot * user.quantity;

			SetFinalMonotributo(
				parseFloat(netoMonotributo).toFixed(2) -
					parseFloat(aporteTotalRecibidoMonot).toFixed(2)
			);
		} else {
			if (user.quantity > 1) {
				const aporteRecib = ((user.salary * 100) / 3) * 0.0765;
				const planElegido = user.plan;
				const requerido = requeridosGrup.find(
					(item) => item.Plan === planElegido
				).Value;
				const difDeTope = requerido - aporteRecib;
				SetDifDeTope(difDeTope.toFixed(2));
			} else {
				const aporteRecib = ((user.salary * 100) / 3) * 0.0765;
				const planElegido = user.plan;
				const requerido = requeridosIndiv.find(
					(item) => item.Plan === planElegido
				).Value;
				const difDeTope = requerido - aporteRecib;

				SetDifDeTope(difDeTope.toFixed(2)); //Seteo de diferencia de tope para ingresos individuales
			}
			if (user.salary >= aporteMaximo) {
				Swal.fire({
					text: 'El sueldo calculado es el máximo para el descuento de aportes de Obra Social. Consultá con administración.',
					icon: 'info',
					confirmButtonText: 'ok',
				});
			}
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
						{user.regimen === 'Asalariado' && <option value='PMI'>PMI</option>}
						{user.regimen === 'Asalariado' && (
							<option value='PMI2000'>PMI 2000</option>
						)}
						{user.regimen === 'Asalariado' && (
							<option value='PMI3000'>PMI 3000</option>
						)}
						{user.regimen === 'Autonomo' && (
							<option value='PMI 2886 Soltero'>PMI 2886 Soltero</option>
						)}
						{user.regimen === 'Autonomo' && (
							<option value='PMI 2886'>PMI 2886</option>
						)}
						{user.regimen === 'Autonomo' && (
							<option value='PMI 2886/2000'>PMI 2886/2000</option>
						)}
						{user.regimen === 'Monotributo' && (
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
						<option value={false}>Individual</option>
						<option value={true}>Grupo Familiar</option>
					</select>
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
				</CardFooter>

				<Typography className='md:text-31l font-bold text-xl' color='green'>
					Valor Extra: $ {servMutual}
				</Typography>
				{user.regimen === 'Asalariado' && (
					<Typography className='md:text-1xl font-bold text-xl' color='green'>
						Diferencia de Tope: $ {difDeTope}
					</Typography>
				)}
				{user.regimen === 'Monotributo' && (
					<Typography className='md:text-1xl font-bold text-xl' color='green'>
						Valor Monotributo: ${' '}
						{finalMonotributo !== '' && parseFloat(finalMonotributo).toFixed(2)}
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
	);
}
