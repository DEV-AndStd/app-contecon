const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * from usuarios'); 
        const data = result.rows;

        // Convierte los datos a CSV
        const csv = data.map(row => Object.values(row).join(',')).join('\n');

        // Establecer cabeceras para la descarga
        res.header('Content-Type', 'text/csv');
        res.attachment('datos.csv');
        res.send(csv);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al exportar datos');
    }
});

module.exports = router;