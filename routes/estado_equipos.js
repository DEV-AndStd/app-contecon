
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
    const { id_equipo,nombre,fecha_inicio,estado,falla,repuesto,seccion, fecha_fin_estado, observaciones, codigo} = req.body;
    const result = await pool.query('INSERT INTO estado_equipos(id_equipo,nombre,fecha_inicio,estado,falla,repuesto,seccion, fecha_fin_estado, observaciones, codigo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [id_equipo,nombre,fecha_inicio,estado,falla,repuesto,seccion, fecha_fin_estado, observaciones, codigo]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear equipo' });
  }
});

router.put('/', async (req,res) => {
  try {
    const { estado, id_equipo } = req.body;
    const result = await pool.query(
      `UPDATE estado_equipos SET estado = $1 WHERE id_equipo = $2 `, [ estado, id_equipo ]
    );
    res.json({ message: 'Estado actualizado exitosamente', usuario: result.rows[0]});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar estado' })
  }
});

router.delete('/', async (req, res) => {
  try {
    const { id, id_equipo } = req.body;

    if (!id || !id_equipo) {
      return res.status(400).json({ message: 'Faltan parámetros necesarios' });
    }

    const result = await pool.query(
      'DELETE FROM estado_equipos WHERE id = $1 AND id_equipo = $2',
      [id, id_equipo]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }

    res.json({ message: 'Estado eliminado exitosamente' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar estado' });
  }
});


module.exports = router;