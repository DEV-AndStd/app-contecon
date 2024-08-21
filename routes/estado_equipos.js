
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estado_equipos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener equipos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_equipo,nombre,fecha_inicio,estado,falla,repuesto,seccion, fecha_fin_estado, observaciones} = req.body;
    const result = await pool.query('INSERT INTO estado_equipos(id_equipo,nombre,fecha_inicio,estado,falla,repuesto,seccion, fecha_fin_estado, observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [id_equipo,nombre,fecha_inicio,estado,falla,repuesto,seccion, fecha_fin_estado, observaciones]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear equipo' });
  }
});

module.exports = router;