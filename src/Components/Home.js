import { Login } from "./Login";
import { useAuth } from "../Context/AuthContext";

export function Home() {

    const { user } = useAuth();

    return (
        <div className="container mx-auto">
            <div className="mb-8">
                {user && <h1 className="text-3xl font-bold text-center">Bienvenido {user.email} a CRM</h1>}
                {!user && <Login />}
            </div>
        </div>
    );
}