const express = require('express');
const app = express();
const db = require('./db');
const equiposRoutes = require('./routes/equipos');
const repuestosRoutes = require('./routes/repuestos');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.use('/equipos', equiposRoutes);
app.use('/repuestos', repuestosRoutes);

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});