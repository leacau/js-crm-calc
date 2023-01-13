import './App.css';

import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './Context/AuthContext';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { NavBar } from './Components/navBar';
import { Register } from './Components/Register';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes classname="bg-slate-300">
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
