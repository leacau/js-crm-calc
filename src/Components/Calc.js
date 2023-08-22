/* eslint-disable react-hooks/exhaustive-deps */

import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Typography,
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';

import { Asalariado } from './Asalariado';
import { Autonomo } from './Autonomo';
import { ExtraMensual } from './ExtraMensual';
import { Monotributo } from './Monotributo';
import { useAuth } from '../Context/AuthContext';

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
		protOdonto: 'NO',
	});
	const [input, SetInput] = useState('');
	const [resultado, SetResultado] = useState(false);
	const [finalAsalariado, SetFinalAsalariado] = useState(parseInt(0));
	const [finalMonotributo, SetFinalMonotributo] = useState(0);
	const [finalAutonomo, SetFinalAutonomo] = useState(0);

	const { datosCalculo, setContacto, calculoFondoJub } = useAuth();
	const { diferenciaTope } = Asalariado();
	const { netoAutonomo } = Autonomo();
	const { extraMensual } = ExtraMensual();
	const { valorMonotributo } = Monotributo();

	const reset = () => {
		window.location.href = window.location;
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
						Datos de cónyuge
						<Input
							label='Edad de conyuge'
							name='ageC'
							size='lg'
							defaultValue={''}
							onChange={handleChange}
						/>
						<select
							className='form-select appearance-none
							mt-1
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
		setContacto(user);
		cantPersonas();
		const fondoJubTit = calculoFondoJub(datosCalculo.ageT, datosCalculo.sexT);
		const fondoJubCony = calculoFondoJub(datosCalculo.ageC, datosCalculo.sexC);

		if (datosCalculo.regimen === 'Monotributo') {
			console.log('ENtro en monotributo');

			let subTotalMonot = valorMonotributo;
			let totalMonot =
				subTotalMonot + extraMensual + fondoJubTit + fondoJubCony;
			SetFinalMonotributo(totalMonot);
		} else if (
			datosCalculo.regimen === 'Autonomo' &&
			datosCalculo.plan !== ''
		) {
			console.log('ENtro en autonomo');

			const subTotalAutonomo = netoAutonomo;

			const totalAuto =
				subTotalAutonomo + extraMensual + fondoJubTit + fondoJubCony;

			SetFinalAutonomo(totalAuto.toFixed(2));
		} else if (
			datosCalculo.regimen === 'Asalariado' &&
			(datosCalculo.salary !== undefined || datosCalculo.salary !== 0)
		) {
			console.log('ENtro en asalariado');
			const totalAsalariado =
				parseFloat(diferenciaTope) + parseFloat(extraMensual);
			console.log('Total asalariado', totalAsalariado, typeof totalAsalariado);
			SetFinalAsalariado(totalAsalariado);
		}
	}, [
		datosCalculo.ageC,
		datosCalculo.sexC,
		datosCalculo.sexT,
		datosCalculo.ageT,
		datosCalculo.regimen,
		datosCalculo.categoria,
		datosCalculo.protOdonto,
		datosCalculo.salary,
		user.ageC,
		user.sexC,
		user.sexT,
		user.ageT,
		user.family,
		user.categoria,
		user.childrens,
		user.plan,
		user.quantity,
		user.regimen,
		user.salary,
		user.protOdonto,
		valorMonotributo,
		extraMensual,
		netoAutonomo,
		diferenciaTope,
	]);

	const handleChange = ({ target: { name, value } }) => {
		SetUser({ ...user, [name]: value });
		SetResultado(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		SetResultado(true);
	};

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
							<div className='mb-2'>Datos del titular</div>
							<Input
								label='Edad del titular'
								name='ageT'
								size='lg'
								defaultValue={''}
								onChange={handleChange}
							/>
							<select
								className='form-select appearance-none
								mt-1
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
								<div className='mb-2'>Según recibo de sueldo</div>
								<Input
									label='Aporte de obra social'
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
								<option value='J'>J</option>``
								<option value='K'>K</option>
							</select>
						)}
						Prótesis odontológica
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
							label='Protesis Odontologica'
							name='protOdonto'
							size='lg'
							onChange={handleChange}
							defaultValue={''}
						>
							<option value='NO'>No</option>
							<option value='SI'>Si</option>
						</select>
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

						{/* 						<Button
							variant='gradient'
							color='white'
							className='border-red-500 border-2 hover:shadow-blue-200 mt-4'
							fullWidth
							onClick={reset}
						>
							<Typography color='red' className='text-xs'>
								Nueva consulta
							</Typography>
						</Button> */}
					</CardFooter>
					{resultado && (
						<>
							<div>
								{user.regimen === 'Asalariado' &&
									`Extra mensual: $ ${extraMensual}`}
							</div>
							<div>
								{user.regimen === 'Asalariado' &&
									`Diferencia de tope: $ ${diferenciaTope}`}
							</div>
							<div>
								{user.regimen === 'Asalariado' &&
									`Total Final: $ ${finalAsalariado}`}
							</div>
							<div>
								{user.regimen === 'Monotributo' &&
									`Final monotributo: $ ${finalMonotributo.toFixed(2)}`}
							</div>
							<div>
								{user.regimen === 'Autonomo' &&
									`Final autonomo: $ ${finalAutonomo}`}
							</div>
						</>
					)}
				</Card>
			</div>
			<div className='flex justify-center items-center mt-8'>
				<Typography
					className='md:text-1xl font-bold text-xl justify-center'
					color='green'
				>
					Actualización 22-08-2023 V1
				</Typography>
			</div>
		</div>
	);
}
