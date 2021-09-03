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
import fs from 'fs';

const app = express();
const puerto = 8080;
let visitasSitio1 = 0;
let visitasSitio2 = 0;

const server = app.listen(puerto, () => {
    console.log(`Servidor inicializado en el ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/productos/listar', (req,res)=>{
    console.log('request a get recibido!');
    if(productos.length > 0){
        res.json(productos);  
    } else {
        res.json({error : 'no hay productos cargados'})
    }
    
})

app.get('/api/productos/listar/:id', (req,res) => {
    console.log('request a get recibido!');
    let params = req.params;
    if(Object.entries(params).length > 0 && params.id >= 1 && params.id <= productos.length){
        let result = productos.find(x => x.id === params.id)
        res.json(result);
    }else{
        res.json({error : 'producto no encontrado'})
    }
});

app.post('/api/productos/guardar', (req,res) => {
	console.log('request a post recibido!')
	const cuerpo = req.body;
	let productoAAgregar = {
		...cuerpo,
		"id" : productos.length + 1
	}
	productos.push(productoAAgregar)
	res.json(productoAAgregar);
})
