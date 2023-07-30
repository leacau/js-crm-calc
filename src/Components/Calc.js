import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Typography,
} from '@material-tailwind/react';

import { useEffect } from 'react';
import { useState } from 'react';

export function Calc() {
	const [user, setUser] = useState({
		plan: '',
		family: '',
		quantity: 1,
		childrens: 0,
		ageT: '',
		ageC: '',
		salary: 0,
		regimen: '',
	});
	const [input, setInput] = useState('');
	const [servMutual, setServMutual] = useState('');
	const [difDeTope, SetDifDeTope] = useState('');
	const servMutTit = 7574.75;
	const servMutPart = 6351.75;
	const sepelio = 197;
	const requeridosGrup = [
		{
			Plan: 'PMI',
			Value: 42749.43,
		},
		{
			Plan: 'PMI2000',
			Value: 50768.82,
		},
		{
			Plan: 'PMI3000',
			Value: 62475.92,
		},
	];

	const requeridosIndiv = [
		{
			Plan: 'PMI',
			Value: 18524.56,
		},
		{
			Plan: 'PMI2000',
			Value: 27929.41,
		},
		{
			Plan: 'PMI3000',
			Value: 42179.44,
		},
	];

	const servicio = () => {
		if (user.regimen === 'Autonomo') {
			console.log('Autonomo');
		} else if (user.regimen === 'Monotributo') {
			console.log('Monotributo');
		} else {
			const subTotalExtra = servMutTit + (user.quantity - 1) * servMutPart;
			const totalExtra = subTotalExtra - user.childrens * sepelio;
			setServMutual(totalExtra);
			console.log('user antes de entrar', user);

			if (user.quantity > 1) {
				console.log('grup: ', user);
				let aporteRecib = ((user.salary * 100) / 3) * 0.0765;
				const planElegido = user.plan;
				let requerido = requeridosGrup.find(
					(item) => item.Plan === planElegido
				).Value;
				let difDeTope = requerido - aporteRecib;

				SetDifDeTope(difDeTope);
			} else {
				console.log('indiv: ', user);
				let aporteRecib = ((user.salary * 100) / 3) * 0.0765;
				const planElegido = user.plan;
				let requerido = requeridosIndiv.find(
					(item) => item.Plan === planElegido
				).Value;

				let difDeTope = requerido - aporteRecib;

				SetDifDeTope(difDeTope.toFixed(2));
			}
		}
		/* switch (user.quantity) {
				case '1':
					if (user.plan === 'PMI') {
						setServMutual(5274);
					}
					break;
				case '2':
					if (user.plan === 'PMI') {
						setServMutual(9696);
					}
					break;
				case '3':
					if (user.plan === 'PMI') {
						setServMutual(14118);
					}
					break;
				case '4':
					if (user.plan === 'PMI') {
						setServMutual(18540);
					}
					break;
				default:
					if (user.plan === 'PMI') {
						let val = user.quantity - 4;
						let val2 = val * 4422 + 18540;
						setServMutual(val2);
					}
					break;
			} */
	};

	const handleChange = ({ target: { name, value } }) => {
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		servicio();
	};

	useEffect(() => {
		const cantPersonas = () => {
			if (user.family === 'true') {
				setInput(
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
				setInput('');
			}
		};
		cantPersonas();
	}, [user.family]);

	return (
		<div className='flex justify-center items-center'>
			<Card className='md:container md:w-fit w-fit mt-7'>
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
						<option value='PMI'>PMI</option>
						<option value='PMI2000'>PMI 2000</option>
						<option value='PMI3000'>PMI 3000</option>
						<option value='PMI 2886 Soltero'>PMI 2886 Soltero</option>
						<option value='PMI 2886'>PMI 2886</option>
						<option value='PMI 2886/2000'>PMI 2886/2000</option>
						<option value='PMI Monotributo Soltero'>
							PMI Monotributo Soltero
						</option>
						<option value='PMI Monotributo'>PMI Monotributo</option>
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

				<Typography className='md:text-3xl font-bold text-xl' color='green'>
					Valor Total: ${servMutual}
				</Typography>
				<Typography className='md:text-3xl font-bold text-xl' color='green'>
					Diferencia de Tope: ${difDeTope}
				</Typography>
			</Card>
		</div>
	);
}
