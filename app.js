const express = require('express');
const app = express();
const db = require('./db');
const equiposRoutes = require('./routes/equipos');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.use('/equipos', equiposRoutes);

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});