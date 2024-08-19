const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM repuestos');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener repuestos' });
    }
  });
  
router.post('/', async (req, res) => {
try {
    const { id_equipo, repuesto, descripcion, costo } = req.body;
    const result = await pool.query('INSERT INTO repuestos (id_equipo, repuesto, descripcion, costo) VALUES ($1, $2, $3, $4) RETURNING *', [id_equipo, repuesto, descripcion, costo]);
    res.json(result.rows[0]);
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear repuesto' });
}
});
module.exports = router;