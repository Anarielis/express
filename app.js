const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Configura el motor de plantillas EJS y los layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Configura la carpeta de archivos estáticos
app.use(express.static('public'));

// Configura el parser para las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));

// Lista de productos
let productos = [
    { nombre: 'Producto 1', precio: 10 },
    { nombre: 'Producto 2', precio: 20 },
    { nombre: 'Producto 3', precio: 30 }
];

// Ruta raíz que muestra un mensaje de bienvenida
app.get('/', (req, res) => {
    res.render('index', { title: 'Inicio' });
});

// Ruta para mostrar la lista de productos
app.get('/productos', (req, res) => {
    res.render('productos', { title: 'Productos', productos });
});

// Ruta para mostrar detalles de un producto específico
app.get('/productos/:nombre', (req, res) => {
    const producto = productos.find(p => p.nombre === req.params.nombre);
    res.render('producto', { title: producto.nombre, producto });
});

// Ruta para mostrar el formulario de nuevo producto
app.get('/nuevo-producto', (req, res) => {
    res.render('nuevo-producto', { title: 'Agregar Nuevo Producto' });
});

// Ruta para manejar la creación de un nuevo producto
app.post('/nuevo-producto', (req, res) => {
    const nuevoProducto = { nombre: req.body.nombre, precio: req.body.precio };
    productos.push(nuevoProducto);
    res.redirect('/productos');
});

// Cambia el puerto de escucha a 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
