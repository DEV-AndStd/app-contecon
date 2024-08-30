const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM registro_turnos');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener registros' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const {codigo, nombre, motivo, detalle, id_turno, dia, hora} = req.body;
      const result = await pool.query('INSERT INTO registro_turnos (codigo, nombre, motivo, detalle, id_turno, dia, hora) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [codigo, nombre, motivo, detalle, id_turno, dia, hora]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al crear registro' });
    }
  });

router.put('/', async (req,res) => {
    try {
      const { n_cierre, fecha_registro, id } = req.body;
      const result = await pool.query(
        `UPDATE registro_turnos SET n_cierre = $1, fecha_registro = $2 WHERE id = $3 `, [  n_cierre, fecha_registro, id ]
      );
      res.json({ message: 'Registro actualizado exitosamente'});
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al actualizar Registro' })
    }
});

module.exports = router;