const productos = [
	{
		"title": "Escuadra",
		"price": "123.45",
		"thumbnail": "https://rfmayorista.com.ar/wp-content/uploads/2020/03/REGLA-ECONM_15-CM..jpg",
		"id": "1"
	},
	{
		"title": "Calculadora",
		"price": "234.56",
		"thumbnail": "https://www.soscomputacion.com.ar/10024/calculadora-electronica-st39221-12-digitos-grandes-display-grande.jpg",
		"id": "2"
	},
	{
		"title": "Globo Terráqueo",
		"price": "345.67",
		"thumbnail": "https://m.media-amazon.com/images/I/91JEXV3kk1L._AC_SL1500_.jpg",
		"id": "3"
	}
];

const producto = [];

let nuevoProducto = {
    "title" : "Lapicera",
    "price" : "12.3",
    "thumbnail" : "https://tiendup.cdn.appdomain.cloud/business/48/products/p7Gomp_5d6833726c945_large.png",
}

import express from 'express';
import ruta from './components/routes.js'
import fs from 'fs';

const app = express();
const puerto = 8080;

const routes = ruta();

const server = app.listen(puerto, () => {
    console.log(`Servidor inicializado en el ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get(routes.listar,routes.funcionListar)

app.get(routes.listarPorId,routes.funcionListarPorId);

app.post(routes.guardar, routes.funcionGuardar);

app.put(routes.actualizar,routes.funcionActualizar);

app.delete(routes.borrar,routes.funcionBorrar);
