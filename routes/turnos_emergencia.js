const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM turnos_emergencia');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener registros' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const {nombre, codigo, dia, hora} = req.body;
      const result = await pool.query('INSERT INTO turnos_emergencia ( nombre, codigo, dia, hora) VALUES ($1, $2, $3, $4) RETURNING *', [ nombre, codigo, dia, hora]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al crear registro' });
    }
  });

  module.exports = router;