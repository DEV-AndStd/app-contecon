const express = require('express');
const router = express.Router();
const pool = require('../db')

// Endpoint GET para autenticar usuario
router.get('/', async (req, res) => {
  try {
      const { codigo, password } = req.query; // Usar req.query para una petición GET

      const query = `SELECT id, nombre, codigo FROM usuarios WHERE codigo = $1 AND password = $2`;
      const values = [codigo, password];
      const result = await pool.query(query, values);

      if (result.rows.length > 0) {
          res.json({ message: 'Autenticación exitosa', usuario: result.rows[0] });
      } else {
          res.status(401).json({ message: 'Credenciales incorrectas' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

router.post('/', async (req, res) => {
    try {
      const { nombre, password, rol, email, codigo } = req.body;
      const result = await pool.query(
        `INSERT INTO usuarios (nombre, password, rol, email, codigo) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nombre, password, rol, email, codigo]
      );
      res.json({ message: 'Usuario creado exitosamente', usuario: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al crear usuario' });
    }
  });

module.exports = router;