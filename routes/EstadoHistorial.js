const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM EstadoHistorial');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener Registros' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { itemId, estado, fechaCambio } = req.body;
    const result = await pool.query('INSERT INTO EstadoHistorial (itemId, estado, fechaCambio) VALUES ($1, $2, $3) RETURNING *', [itemId, estado, fechaCambio]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear registro' });
  }
});