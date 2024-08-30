const express = require('express');
const router = express.Router();
const pool = require('../db');

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
    const checkResult = await pool.query('SELECT * FROM turnos WHERE dia = $1 AND hora = $2', [dia,hora]);

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

// endpoint para reiniciar la secuencia de auto incremento
router.post('/reset-auto-increment', async (req, res) => {
  try {
      await pool.query('ALTER SEQUENCE turnos_id_seq RESTART WITH 1');
      res.json({ message: 'Contador reiniciado exitosamente' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al reiniciar el contador' });
  }
});

router.delete('/',async(req,res) => {
  try {
    const { dia } = req.body;
    console.log(`Eliminando registros donde dia != ${dia}`);

      const result = await pool.query('DELETE FROM turnos WHERE dia != $1', [dia]);

    console.log(`Registros eliminados: ${result.rowCount}`);

      res.json({ message: 'Datos eliminados'});
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al eliminar datos'})
  }
});

module.exports = router;