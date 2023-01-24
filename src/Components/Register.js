import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";

import { Alert } from "./Alert";
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Register() {

    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate()
    const { signUp } = useAuth();


    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.CheckPassword) {
            return setError("Las contraseñas no coinciden")
        } else if (user.email !== user.CheckEmail) {
            return setError("Los emails no coinciden")
        } else {
            await signUp(user.email, user.password)
                .then((userCredential) => {
                    userCredential && navigate('/login')
                }).catch((error) => {
                    setError(error.code)
                });
        }
    }

    return (
        <div className="flex justify-center items-center">
            <Card className="md:container md:w-96 w-50 mt-7">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="md:mb-4 md:grid md:h-28 md:place-items-center
                    mb-2 grid h-14 place-items-center mt-1
                    "
                >
                    <Typography className="md:text-3xl font-bold text-xl" color="white">
                        Registrarse
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Email" name="email" size="lg" onChange={handleChange} />
                    <Input label="Confirmar Email" name="CheckEmail" size="lg" />
                    <Input label="Contraseña" type="password" name="password" size="lg" onChange={handleChange} />
                    <Input label="Confirmar contraseña" type="password" name="CheckPassword" size="lg" />
                    {error && <Alert message={error} type="error" />}
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" fullWidth onClick={handleSubmit}>
                        Registrarse
                    </Button>
                </CardFooter>
                <Typography className="text-xs text-center mb-2">¿Ya tenés tu registro realizado? <a href="/login" className="text-blue-600 underline">Ingresá</a></Typography>
            </Card>
        </div>
    );
};