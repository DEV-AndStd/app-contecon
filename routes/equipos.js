const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener equipos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, tipo_equipo, n_equipo } = req.body;
    const result = await pool.query('INSERT INTO equipos (nombre, tipo_equipo, n_equipo) VALUES ($1, $2, $3) RETURNING *', [nombre, tipo_equipo, n_equipo]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear equipo' });
  }
});

router.delete('/', async (req,res) => {
  try {
    const { id } = req.body;
    const result = await pool.query(
      `DELETE FROM equipos WHERE id = $1 `, [ id ]
    );
    res.json({ message: 'Equipo eliminado exitosamente', usuario: result.rows[0]});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar equipo' })
  }
});

module.exports = router;