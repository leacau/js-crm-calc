import React, { toDate, useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../firebase';
import { useAuth } from '../Context/AuthContext';

export function ListadoDatos() {
	const [Datos, setDatos] = useState([]);
	const [loading, setLoading] = useState(true);

	const { user } = useAuth();

	useEffect(() => {
		const ListDatos = [];
		const allDatos = async () => {
			const querySnapshot = await getDocs(query(collection(db, 'users')));
			querySnapshot.forEach((doc) => {
				const completeData = {
					...doc.data(),
					id: doc.id,
				};
				ListDatos.push(completeData);
				setDatos(ListDatos);
				setLoading(false);
			});
		};
		allDatos();
	}, [loading]);

	const datosFiltrados = Datos.filter((dato) => dato.owner === user.email);

	const columns = [
		{
			field: 'nombre',
			headerName: 'Nombre',
			width: 200,
			editable: false,
		},
		{
			field: 'apellido',
			headerName: 'Apellido',
			width: 200,
			editable: false,
		},
		{
			field: 'dni',
			headerName: 'DNI',
			type: 'number',
			width: 200,
			editable: false,
		},
		{
			field: 'email',
			headerName: 'Email',
			type: 'email',
			width: 200,
			editable: false,
		},
		{
			field: 'observaciones',
			headerName: 'Observaciones',
			width: 500,
			editable: false,
		},
		{
			field: 'date',
			headerName: 'Fecha de carga',
			type: 'date',
			valueGetter: (params) => params.value.toDate(),
			width: 500,
			editable: false,
		},
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
								pageSize: 10,
							},
						},
					}}
					pageSizeOptions={[10]}
					disableRowSelectionOnClick
				/>
			</Box>
		);
	}
}
