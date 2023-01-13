import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";

import { useAuth } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Login() {

    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate()
    const { signIn } = useAuth();

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(user.email, user.password)
            .then((userCredential) => {
                userCredential && navigate('/')
            }).catch((error) => {
                console.log(error);
                setError(error.code)
            });

    }

    return (
        <div>
            <Card className="md:container md:w-96 w-50">
                <CardHeader
                    variant="gradient"
                    color="white"
                    className="md:mb-4 md:grid md:h-28 mb-2 grid h-14 place-items-center border-blue-500 border-2 shadow-blue-100 mt-7"
                >
                    <Typography className="md:text-3xl font-bold text-xl" color="blue">
                        Ingresar
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Email" name="email" size="lg" onChange={handleChange} />
                    <Input label="Contraseña" type="password" name="password" size="lg" onChange={handleChange} />
                    {error && <p className="text-red-400 p-0 m-0 text-xs">{error}</p>}
                </CardBody>
                <CardFooter className="pt-0">
                    <Button
                        variant="gradient"
                        color="white"
                        className="border-blue-500 border-2 hover:shadow-blue-200"
                        fullWidth
                        onClick={handleSubmit}>
                        <Typography color="blue" className="text-xs">
                            Ingresar
                        </Typography>
                    </Button>
                </CardFooter>
                <Typography className="text-xs text-center mb-2">¿Todavía no tenés una cuenta? <a href="/register" className="text-blue-600 underline">Registrate</a></Typography>


            </Card>
        </div>
    );
};