const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * from usuarios'); 
        const data = result.rows;

        // Obtener los encabezados
    const headers = Object.keys(data[0]).join(','); // Sin comillas alrededor de los encabezados

    // Convierte los datos a CSV, añadiendo comillas para manejar comas en los datos
    const csvRows = data.map(row => {
        return Object.values(row)
            .map(value => {
                // Envolver el valor en comillas si contiene comas o comillas dobles
                const escapedValue = value.toString().replace(/"/g, '""');
                return escapedValue.includes(',') || escapedValue.includes('"') ? `"${escapedValue}"` : escapedValue;
            })
            .join(','); // Usar coma como separador
    });

    // Combinar encabezados y datos
    const csv = [headers, ...csvRows].join('\n');

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