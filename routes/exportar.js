const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT nombre, codigo, rol FROM usuarios'); 
        const data = result.rows;
    
        // Obtener los encabezados
        const headers = Object.keys(data[0]).join(','); // Encabezados separados por comas
    
        // Convierte los datos a CSV, añadiendo comillas para manejar comas en los datos
        const csvRows = data.map(row => {
            return Object.values(row)
                .map(value => {
                    // Escapar comillas dobles
                    const escapedValue = value.toString().replace(/"/g, '""');
                    // Envolver el valor en comillas si contiene comas o comillas dobles
                    return escapedValue.includes(',') || escapedValue.includes('"') ? `"${escapedValue}"` : escapedValue;
                })
                .join(','); // Usar coma como separador
        });
    
        // Combinar encabezados y datos
        const csv = [headers, ...csvRows].join('\n');
        
        // Establecer cabeceras para la descarga
        res.header('Content-Type', 'text/csv');
        res.attachment('registro-usuarios.csv');
        res.send(csv);
    } catch (error) {
        console.error('Error en el endpoint',error);
        res.status(500).send('Error datos');
    }    
});

router.get('/equipos', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.id AS equipo_id, e.nombre AS equipo_nombre, e.tipo_equipo, e.n_equipo, r.id AS repuesto_id, r.repuesto, r.descripcion, es.id AS estado_id, es.nombre AS estado_nombre, es.fecha_inicio, es.estado, es.falla, es.repuesto AS estado_repuesto, es.seccion, es.fecha_fin_estado, es.observaciones FROM equipos e LEFT JOIN repuestos r ON e.id = r.id_equipo LEFT JOIN estado_equipos es ON e.id = es.id_equipo'); 
        const data = result.rows;
    
        // Obtener los encabezados
        const headers = Object.keys(data[0]).join(','); // Encabezados separados por comas
    
        // Convierte los datos a CSV, añadiendo comillas para manejar comas en los datos
        const csvRows = data.map(row => {
            return Object.values(row)
                .map(value => {
                    // Escapar comillas dobles
                    const escapedValue = value.toString().replace(/"/g, '""');
                    // Envolver el valor en comillas si contiene comas o comillas dobles
                    return escapedValue.includes(',') || escapedValue.includes('"') ? `"${escapedValue}"` : escapedValue;
                })
                .join(','); // Usar coma como separador
        });
    
        // Combinar encabezados y datos
        const csv = [headers, ...csvRows].join('\n');
        
        // Establecer cabeceras para la descarga
        res.header('Content-Type', 'text/csv');
        res.attachment('registro-equipos.csv');
        res.send(csv);
    } catch (error) {
        console.error('Error en el endpoint',error);
        res.status(500).send('Error datos');
    }    
});

module.exports = router;