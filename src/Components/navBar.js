import {
	Button,
	IconButton,
	MobileNav,
	Navbar,
	Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function NavBar() {
	const { logOut, user } = useAuth();
	const [openNav, setOpenNav] = useState(false);
	const navigate = useNavigate();

	const handlerLogOut = async () => {
		if (window.innerWidth < 959) {
			setOpenNav(!openNav);
		}
		await logOut();
	};

	const goToLogin = () => {
		if (window.innerWidth < 959) {
			setOpenNav(!openNav);
		}
		navigate('/login');
	};

	const goToRegister = () => {
		if (window.innerWidth < 959) {
			setOpenNav(!openNav);
		}
		navigate('/register');
	};

	const goToList = () => {
		if (window.innerWidth < 959) {
			setOpenNav(!openNav);
		}
		navigate('/datos');
	};

	const goToAddUser = () => {
		if (window.innerWidth < 959) {
			setOpenNav(!openNav);
		}
		navigate('/addUser');
	};

	const goToCalc = () => {
		if (window.innerWidth < 959) {
			setOpenNav(!openNav);
		}
		navigate('/calc');
	};
	const goToRecl = () => {
		if (window.innerWidth < 959) {
			setOpenNav(!openNav);
		}
		navigate('/reclamos');
	};

	useEffect(() => {
		window.addEventListener(
			'resize',
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
	}, []);

	const navList = (
		<ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row items-end lg:gap-6'>
			{!user && (
				<Typography
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-normal'
				>
					<button onClick={goToLogin} className='flex items-center'>
						Ingresar
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-5 h-5 ml-1'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
							/>
						</svg>
					</button>
				</Typography>
			)}

			{!user && (
				<Typography
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-normal'
				>
					<button onClick={goToRegister} className='flex items-center'>
						Registrarse
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-5 h-5 ml-1'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
							/>
						</svg>
					</button>
				</Typography>
			)}
			<Typography
				as='li'
				variant='small'
				color='blue-gray'
				className='p-1 font-normal'
			>
				<button onClick={goToCalc} className='flex items-center'>
					Calculadora
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-5 h-5 ml-1'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z'
						/>
					</svg>
				</button>
			</Typography>
			<Typography
				as='li'
				variant='small'
				color='blue-gray'
				className='p-1 font-normal'
			>
				<button onClick={goToRecl} className='flex items-center'>
					Reclamos
					<svg
						xmlns='http://www.w3.org/2000/svg'
						height='1em'
						viewBox='0 0 512 512'
						className='w-5 h-5 ml-1'
					>
						<path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z' />
					</svg>
				</button>
			</Typography>
			{user && (
				<Typography
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-normal'
				>
					<button onClick={goToAddUser} className='flex items-center'>
						Nuevo Contacto
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-5 h-5 ml-1'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
							/>
						</svg>
					</button>
				</Typography>
			)}
			{user && (
				<Typography
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-normal'
				>
					<button onClick={goToList} className='flex items-center'>
						Mis contactos
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-5 h-5 ml-1'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
							/>
						</svg>
					</button>
				</Typography>
			)}
			{user && (
				<Typography
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-normal'
				>
					<Button
						variant='text'
						onClick={handlerLogOut}
						className='flex items-center text-red-400 h-6'
					>
						Salir
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-5 h-5 ml-1'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
							/>
						</svg>
					</Button>
				</Typography>
			)}
		</ul>
	);

	return (
		<Navbar className='mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4'>
			<div className='container mx-auto flex items-center justify-between text-blue-gray-900'>
				<Typography variant='small' className='mr-4 py-1.5 font-normal'>
					<span>Jerárquicos Salud - Ventas</span>
				</Typography>
				<div className='hidden lg:block'>{navList}</div>
				<IconButton
					variant='text'
					className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
					ripple={false}
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							className='h-6 w-6'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M4 6h16M4 12h16M4 18h16'
							/>
						</svg>
					)}
				</IconButton>
			</div>
			<MobileNav open={openNav}>{navList}</MobileNav>
		</Navbar>
	);
}
