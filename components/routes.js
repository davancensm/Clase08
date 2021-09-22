let productos = [
	{
		"title": "Escuadra",
		"price": "123.45",
		"thumbnail": "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/rulertriangle-128.png",
		"id": 1
	},
	{
		"title": "Calculadora",
		"price": "234.56",
		"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png",
		"id": 2
	},
	{
		"title": "Globo Terráqueo",
		"price": "345.67",
		"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-128.png",
		"id": 3
	}
];

let producto = []

class rutas {
    constructor() {
        this.listar = '/productos/listar',
        this.listarPorId = '/productos/listar/:id',
        this.guardar = '/productos/guardar'
        this.actualizar = '/productos/actualizar/:id'
        this.borrar = '/productos/borrar/:id'
        this.vista = '/productos/vista'
        this.ides = productos.length + 1
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
        params = parseInt(params.id)
        if(productos.find(x => x.id === params)){
            let result = productos.find(x => x.id === params)
            res.json(result);
        }else{
            res.json({error : 'producto no encontrado'})
        }
    }

    funcionGuardar = (req,res) => {
        console.log('request a post recibido!')
        const cuerpo = req.body;
        console.log(cuerpo)
        let productoAAgregar = {
            ...cuerpo,
            "id" : this.ides
        }
        this.ides++;
        productos.push(productoAAgregar)
    }

    funcionActualizar = (req,res) => {
        console.log('request de put recibida')
        const cuerpo = req.body;
        const params = parseInt(req.params.id);
        productos[params -1] = {
            ...cuerpo,
            "id" : params
        }
        res.json(productos[params - 1]);
    }
    
    funcionBorrar = (req,res) => {
        console.log('request de delete recibida')
        let params = parseInt(req.params.id)
        let id = productos.find(x => x.id === params);
        if(id){
            productos.splice(id.id - 1,1);
            res.json(productos)
        } else{
            res.send('No existe el producto');
        }        
    }

    funcionVista = (req,res) => {
        res.render('tabla.pug', {productos : productos} )
    }
}

export default function ruta(){
    return new rutas;
}