import './App.css';

import { Route, Routes } from 'react-router-dom';

import { AddUser } from './Components/AddUser';
import { AuthProvider } from './Context/AuthContext';
import { Calculate } from './Components/logic';
import { Home } from './Components/Home';
import { ListadoDatos } from './Components/ListadoDatos';
import { Login } from './Components/Login';
import { NavBar } from './Components/navBar';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { Register } from './Components/Register';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes classname="bg-slate-300">
        <Route path="/" element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addUser" element={<ProtectedRoute>
          <AddUser />
        </ProtectedRoute>
        } />
        <Route path="/datos" element={<ProtectedRoute>
          <ListadoDatos />
        </ProtectedRoute>} />
        <Route path="/calc" element={<Calculate />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
