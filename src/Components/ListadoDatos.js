import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { Card } from "@material-tailwind/react";
import { db } from "../firebase";
import { useAuth } from "../Context/AuthContext";

export function ListadoDatos() {
    const [Datos, setDatos] = useState([]);
    const [selection, setSelection] = useState({ value: "date" });
    const [order, setOrder] = useState({ value: "1" });


    const { user } = useAuth();


    const handleSelection = ({ target: { value } }) => {
        setSelection({ value })
    }

    const handleOrder = ({ target: { value } }) => {
        setOrder({ value })

    }


    useEffect(() => {
        const ListDatos = []
        const allDatos = async () => {
            const querySnapshot = await getDocs(query(collection(db, "users"), orderBy("date", "desc")));
            querySnapshot.forEach((doc) => {
                const completeData = { ...doc.data(), id: doc.id }
                ListDatos.push(completeData);
                setDatos(ListDatos);
            });
        }
        allDatos();
    }, []);

    const datosFiltrados = Datos.filter((dato) => dato.owner === user.email)

    const datosOrdenados = datosFiltrados.sort((a, b) => {
        if (selection.value === "date") {
            if ((a[selection.value] > b[selection.value])) {
                return (order.value * 1);
            }
            if ((a[selection.value] < b[selection.value])) {
                return (order.value * -1);
            }
            return 0;
        }
        if (a[selection.value] > b[selection.value]) {
            return order.value * 1;
        }
        if (a[selection.value] < b[selection.value]) {
            return order.value * -1;
        }
        return 0;
    })

    return (
        <div className="container flex-column ">
            <h1 className="h2 text-center mb-5">Tus contactos</h1>
            <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                    <select className="form-select appearance-none
      block
      w-full
      pl-3 pr-10
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onChange={handleSelection}>
                        <option value="date">Por fecha</option>
                        <option value="nombre">Por nombre</option>
                        <option value="apellido">Por apellido</option>
                    </select>
                </div>
                <div className="mb-3 xl:w-96">
                    <select className="form-select appearance-none
      block
      w-full
      pl-3 pr-10
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onChange={handleOrder}>
                        <option value="1">Ascendente</option>
                        <option value="-1">Descendente</option>
                    </select>
                </div>
            </div >
            <div>
                {(datosFiltrados.length === 0) && <h2 className="h3 text-center mb-5">No hay contactos cargados</h2>}

                {datosOrdenados.map((dato) => {
                    const d = dato.date;
                    const date = d.toDate().toLocaleDateString("es-AR", { year: "numeric", month: "numeric", day: "numeric" })

                    return (
                        <Card key={dato.id} className="mb-3 ml-3 border border-2 border-black-800 drop-shadow w-72">
                            <ul className="pb-3 pt-2 pl-2">
                                <li><span className="underline text-blue-800 font-bold">Nombre:</span> {dato.nombre}</li>
                                <li><span className="underline text-blue-800 font-bold">Apellido:</span> {dato.apellido}</li>
                                <li><span className="underline text-blue-800 font-bold">DNI:</span> {dato.dni}</li>
                                <li><span className="underline text-blue-800 font-bold">Email:</span> {dato.email}</li>
                                <li><span className="underline text-blue-800 font-bold">Observaciones:</span> {dato.observaciones}</li>
                                <li><span className="underline text-blue-800 font-bold">Fecha de Carga:</span> {date}</li>
                            </ul>
                        </Card>
                    )
                })}
            </div>
        </div >
    )
};