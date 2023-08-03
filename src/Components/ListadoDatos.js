import { DataGrid, gridDateFormatter } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';

import Box from '@mui/material/Box';
import { db } from '../firebase';
import { useAuth } from '../Context/AuthContext';

export function ListadoDatos() {
	const [Datos, setDatos] = useState([]);
	const [loading, setLoading] = useState(true);

	const { user } = useAuth();

	const formateddDate = (date) => {
		date.toDate().toLocaleDateString('es-AR', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
		});
	};

	useEffect(() => {
		const ListDatos = [];
		const allDatos = async () => {
			const querySnapshot = await getDocs(query(collection(db, 'users')));
			querySnapshot.forEach((doc) => {
				const completeData = { ...doc.data(), id: doc.id };
				ListDatos.push(completeData);
				setDatos(ListDatos);
				setLoading(false);
			});
		};
		allDatos();
	}, []);

	const datosFiltrados = Datos.filter((dato) => dato.owner === user.email);

	const columns = [
		{
			field: 'nombre',
			headerName: 'Nombre',
			width: 200,
			editable: true,
		},
		{
			field: 'apellido',
			headerName: 'Apellido',
			width: 200,
			editable: true,
		},
		{
			field: 'dni',
			headerName: 'DNI',
			type: 'number',
			width: 200,
			editable: true,
		},
		{
			field: 'email',
			headerName: 'Email',
			type: 'email',
			width: 200,
			editable: true,
		},
		{
			field: 'observaciones',
			headerName: 'Observaciones',
			width: 500,
			editable: true,
		},
		/* 		{
			field: 'date',
			headerName: 'Fecha de carga',
			type: 'date',
			width: 500,
			valueFormatter: (params) => formateddDate(params?.date),
			editable: true,
		}, */
	];

	const rows = datosFiltrados;

	if (loading) {
		return <>Cargando...</>;
	} else {
		return (
			<Box sx={{ height: 400, width: '100%' }}>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					disableRowSelectionOnClick
				/>
			</Box>
		);
	}
}
