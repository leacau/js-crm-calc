import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";

import Swal from "sweetalert2";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Login() {

    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [type, setType] = useState("");
    const [nowLoading, setNowLoading] = useState(false);

    const navigate = useNavigate()
    const { signIn, loading, resetPassword } = useAuth();

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const errorSwal = (message, messageType) => {
        Swal.fire({
            text: message,
            icon: messageType,
            confirmButtonText: 'ok'
        })
        setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signIn(user.email, user.password)
            .then((userCredential) => {
                userCredential && navigate('/')
            }).catch((error) => {
                console.log(error);
                setError(error.code)
                setType("error")
            });
    }

    const handleResetPassword = async () => {
        if (!user.email) return setError("Por favor ingresá tu email"); setType("error")
        try {
            setNowLoading(true)
            await resetPassword(user.email)
            setError('Se envió un email a tu casilla para restablecer tu contraseña')
            setType("success")
        } catch (error) {
            setError(error.code)
            setType("error")
        }
        setError("")
        setNowLoading(false)
    }


    if (loading || nowLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-100">
                </div>
            </div>
        )
    }

    return (
        <div>
            <Card className="md:container md:w-96 w-50 mt-7">
                <CardHeader
                    variant="gradient"
                    color="white"
                    className="md:mb-4 md:grid md:h-28 mb-2 grid h-14 place-items-center border-blue-500 border-2 shadow-blue-100 mt-1"
                >
                    <Typography className="md:text-3xl font-bold text-xl" color="blue">
                        Ingresar
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Email" name="email" size="lg" onChange={handleChange} />
                    <Input label="Contraseña" name="password" size="lg" type="password" onChange={handleChange} />
                    <Typography className="text-xs text-center mb-2"><p onClick={handleResetPassword} target="_blank" className="text-blue-600 underline cursor-pointer">¿Olvidaste tu contraseña?</p></Typography>
                    {error && errorSwal(error, type)}
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