import { Login } from "./Login";
import { useAuth } from "../Context/AuthContext";

export function Home() {

    const { user, loading } = useAuth();

    if (loading) return <h1 className="text-3xl font-bold text-center mt-7">Cargando...</h1>

    return (
        <div className="container mx-auto">
            <div className="mb-8">
                {user && <h1 className="text-3xl font-bold text-center mt-7">Bienvenido {user.email}</h1>}
                {!user && <Login />}
            </div>
        </div>
    );
}