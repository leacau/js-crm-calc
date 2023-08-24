import './App.css';

import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './Context/AuthContext';
import { Calc } from './Components/Calc';
import { NavBar } from './Components/navBar';
import { ProtectedRoute } from './Components/ProtectedRoute';

/* import { Register } from './Components/Register';
import { ListadoDatos } from './Components/ListadoDatos';
import { Login } from './Components/Login';
import { Home } from './Components/Home';
import { AddUser } from './Components/AddUser'; */ //se elimina temporalmente por liberación a delegados

function App() {
	return (
		<AuthProvider>
			<NavBar />
			<Routes classname='bg-slate-300'>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Calc />
						</ProtectedRoute>
					}
				/>
				{/* 	<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route
					path='/addUser'
					element={
						<ProtectedRoute>
							<AddUser />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/datos'
					element={
						<ProtectedRoute>
							<ListadoDatos />
						</ProtectedRoute>
					}
				/>
				<Route path='/calc' element={<Calc />} /> */}
				// se elimina temporalmente este código por liberarse la calculadora
				para los delegados
			</Routes>
		</AuthProvider>
	);
}

export default App;
