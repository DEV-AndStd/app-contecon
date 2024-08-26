const express = require('express');
const router = express.Router();
const pool = require('../db');
const e = require('express');

router.get('/', async (req, res) => {
    try {
        const { validacion } = req.query; // Usar req.query para una petición GET
  
        const query = `SELECT * FROM turnos WHERE validacion = $1`;
        const values = [validacion];
        const result = await pool.query(query, values);
  
        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener turnos' });
    }
});


router.post('/', async (req, res) => {
try {
    const { dia, hora, validacion } = req.body;

    //verificacion para la creacion del turno
    const checkresult = await pool.query('SELECT * FROM turnos WHERE dia = $1 AND hora = $2', [dia,hora]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: 'Ya existe un turno para esta fecha y hora.' });
    }
    
    const result = await pool.query('INSERT INTO turnos (dia, hora, validacion) VALUES ($1, $2, $3) RETURNING *', [dia, hora, validacion]);
    res.json(result.rows[0]);
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear turno' });
}
});

router.put('/', async (req,res) => {
    try {
      const { validacion, id } = req.body;
      const result = await pool.query(
        `UPDATE turnos SET validacion = $1 WHERE id = $2 `, [ validacion, id ]
      );
      res.json({ message: 'Turno actualizado exitosamente', usuario: result.rows[0]});
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al actualizar turno' })
    }
});

module.exports = router;