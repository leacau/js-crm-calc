import './App.css';

import { Route, Routes } from 'react-router-dom';

import { AddUser } from './Components/AddUser';
import { AuthProvider } from './Context/AuthContext';
import { Calc } from './Components/Calc';
import { Home } from './Components/Home';
import { ListadoDatos } from './Components/ListadoDatos';
import { Login } from './Components/Login';
import { NavBar } from './Components/navBar';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { Reclamos } from './Components/Reclamo';
import { Register } from './Components/Register';

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
				<Route
					path='/reclamos'
					element={
						<ProtectedRoute>
							<Reclamos />
						</ProtectedRoute>
					}
				/>
				<Route path='/register' element={<Register />} />
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
				<Route path='/calc' element={<Calc />} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
