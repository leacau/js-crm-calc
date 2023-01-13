import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <h1 className="text-3xl font-bold text-center mt-7">Cargando...</h1>

    if (!user) return <Navigate to="/login" />

    return <>{children}</>
}