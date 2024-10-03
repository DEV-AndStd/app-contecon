const express = require('express');
const app = express();
const equiposRoutes = require('./routes/equipos');
const repuestosRoutes = require('./routes/repuestos');
const usuariosRoutes = require('./routes/usuarios');
const estado_equiposRoutes = require('./routes/estado_equipos');
const turnosRoutes = require('./routes/turnos');
const registrosRoutes = require('./routes/registro_turnos.js');
const emergenciaRoutes = require('./routes/turnos_emergencia');
const EstadoHistorialRoutes = require('./routes/EstadoHistorial');
const exportarRoutes = require('./routes/exportar');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Ruta para servir el HTML
app.get('/exportar', (req, res) => {
  res.sendFile(path.join(__dirname, 'exportar.html'));
});

app.use('/equipos', equiposRoutes);
app.use('/repuestos', repuestosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/estado_equipos', estado_equiposRoutes);
app.use('/turnos', turnosRoutes);
app.use('/registro_turnos',registrosRoutes);
app.use('/turnos_emergencia', emergenciaRoutes);
app.use('/EstadoHistorial', EstadoHistorialRoutes);
app.use('/exportar',exportarRoutes);

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});