const express = require('express'); //REQUIERE EXPRESS(FRAMEWORK DE NODE)
const bodyParser = require("body-parser");
const repository = require("./repository");
const app = express() // INICIALIZA LA APLICACION
const port = 3000 //NOS MARCA EL PUERTO DONDE VA A CORRER LA APLICACION
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//LISTADO DE PRODUCTOS(sacar esto despues de crear el backend!!!)
const productos = [{
        id: 1,
        nombre: "Pan Casero",
        price: 50,
        image: "./images/product-1.jpg",
        stock: 3
    },
    {
        id: 2,
        nombre: "Baguette",
        price: 100,
        image: "./images/product-2.jpg",
        stock: 50
    },
    {
        id: 3,
        nombre: "Facturas",
        price: 200,
        image: "./images/product-3.jpg",
        stock: 100
    },
    {
        id: 4,
        nombre: "Pastafrola",
        price: 200,
        image: "./images/product-4.jpg",
        stock: 30
    },
    {
        id: 5,
        nombre: "Galletas",
        price: 60,
        image: "./images/product-5.jpg",
        stock: 80
    },
    {
        id: 6,
        nombre: "Pebetes",
        price: 100,
        image: "./images/product-6.jpg",
        stock: 50
    },
]
app.get('/api/productos', async(req, res) => {
    res.send(await repository.read())
})

app.post('/api/pay', async(req, res) => {
    const ids = req.body;
    //COPIA DE PRODUCTOS
    const productsCopy = await repository.read();

    let error = false;
    ids.forEach(id => {
        const product = productsCopy.find(p => p.id === id);
        //SI LOS PRODUCTOS NO SALEN BIEN
        if (product.stock > 0) {
            product.stock--;
        } else {
            error = true;
        }
    });

    if (error) {
        res.send("Sin stock").statusCode(400)
    } else {
        await repository.write(productsCopy)
        productos = productsCopy
        res.send(productsCopy)
    }

})
app.use("/", express.static("fe"))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})