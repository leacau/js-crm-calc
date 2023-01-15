import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";
import { Timestamp, addDoc, collection } from "firebase/firestore";

import Swal from "sweetalert2";
import { db } from "../firebase";
import { useAuth } from "../Context/AuthContext";
import { useState } from 'react';

export function AddUser() {
    const { user } = useAuth();
    const [newUser, setNewUser] = useState({ email: "", apellido: "", nombre: "", dni: "", observaciones: "", owner: user.email, date: Timestamp.fromDate(new Date()) });
    const [newError, setNewError] = useState("");
    const [errorType, setErrorType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = ({ target: { name, value } }) => {
        setNewUser({ ...newUser, [name]: value })
    }

    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
    };

    const errorSwal = (message, messageType) => {
        Swal.fire({
            text: message,
            icon: messageType,
            confirmButtonText: 'ok'
        })
        setNewError("")
    }

    const handleAddUser = async (e) => {
        e.preventDefault();
        const userCollection = collection(db, "users");
        if (newUser.email === "" || newUser.apellido === "" || newUser.nombre === "" || newUser.dni === "") {
            setNewError("Por favor completá todos los campos")
            setErrorType("error")
        } else {
            setLoading(true)
            await addDoc(userCollection, newUser)
                .then(() => {
                    setNewError("Contacto agregado con éxito")
                    setErrorType("success")
                    setNewUser({ email: "", apellido: "", nombre: "", dni: "", observaciones: "" })
                }).catch((error) => {
                    setNewError(error.code)
                    setErrorType("error")
                });
            handleReset()
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-100">
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
                    className="md:mb-4 md:grid md:h-14 grid h-12 place-items-center border-blue-500 border-b-2 shadow-blue-100 mt-1"
                >
                    <Typography className="md:text-2xl font-bold text-xl" color="blue">
                        Agregar nuevo contacto
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input id="input" label="Email" name="email" size="md" onChange={handleChange} required />
                    <Input id="input" label="Apellido" name="apellido" size="md" onChange={handleChange} required />
                    <Input id="input" label="Nombre" name="nombre" size="md" onChange={handleChange} required />
                    <Input id="input" label="DNI" name="dni" size="md" onChange={handleChange} required />
                    <Input id="input" label="Observaciones" name="observaciones" onChange={handleChange} />
                </CardBody>
                <CardFooter className="pt-0">
                    <Button
                        variant="gradient"
                        color="white"
                        className="border-blue-500 border-2 hover:shadow-blue-200"
                        fullWidth
                        onClick={handleAddUser}>
                        <Typography color="blue" className="text-xs">
                            Agregar
                        </Typography>
                    </Button>
                    {newError && errorSwal(newError, errorType)}
                </CardFooter>
            </Card>
        </div>
    );
};