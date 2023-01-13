import './AddUser.css';

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

export function AddUser() {

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
            <Card className="md:container md:w-96 w-50 mt-7">
                <CardHeader
                    variant="gradient"
                    color="white"
                    className="md:mb-4 md:grid md:h-14 grid h-12 place-items-center border-blue-500 border-b-2 shadow-blue-100 mt-1"
                >
                    <Typography className="md:text-2xl font-bold text-xl" color="blue">
                        Agregar nuevo contacto
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Email" name="email" size="md" onChange={handleChange} required />
                    <Input label="Apellido" type="text" name="apellido" size="md" onChange={handleChange} required />
                    <Input label="Nombre" type="text" name="nombre" size="md" onChange={handleChange} required />
                    <Input label="DNI" type="text" name="dni" size="md" onChange={handleChange} required />
                    <label className="block text-sm font-medium text-gray-600 m-0 pt-1">Observaciones</label>
                    <textarea
                        name="observaciones"
                        className="
                                resize-none
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-400
                                rounded-lg
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            "
                        id="observaciones"
                        rows="4"
                    /* placeholder="Your message" */
                    ></textarea>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button
                        variant="gradient"
                        color="white"
                        className="border-blue-500 border-2 hover:shadow-blue-200"
                        fullWidth
                        onClick={handleSubmit}>
                        <Typography color="blue" className="text-xs">
                            Agregar
                        </Typography>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};