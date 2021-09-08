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


class rutas {
    constructor() {
        this.listar = '/api/productos/listar',
        this.listarPorId = '/api/productos/listar/:id',
        this.guardar = '/api/productos/guardar'
    }
    funcionListar = (req,res) => {
        console.log('request a get recibido!');
        if(productos.length > 0){
            res.send(productos);  
        } else {
            res.json({error : 'no hay productos cargados'})
        }
    }
    
    funcionListarPorId = (req,res) => {
        console.log('request a get recibido!');
        let params = req.params;
        if(Object.entries(params).length > 0 && params.id >= 1 && params.id <= productos.length){
            let result = productos.find(x => x.id === params.id)
            res.json(result);
        }else{
            res.json({error : 'producto no encontrado'})
        }
    }

    funcionGuardar = (req,res) => {
        console.log('request a post recibido!')
        const cuerpo = req.body;
        let productoAAgregar = {
            ...cuerpo,
            "id" : productos.length + 1
        }
        productos.push(productoAAgregar)
        res.json(productoAAgregar);
    }
}

export default function ruta(){
    return new rutas;
}