const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * from usuarios'); 
        const data = result.rows;

        // Obtener los encabezados
        const headers = Object.keys(data[0]).join(','); 

        // Convierte los datos a CSV, añadiendo comillas para manejar comas en los datos
        const csv = [
            headers, 
            ...data.map(row => 
                Object.values(row).map(value => {
                    // Manejar comas y saltos de línea en los valores
                    return `"${value.toString().replace(/"/g, '""')}"`; 
                }).join(',')
            )
        ].join('\n');

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