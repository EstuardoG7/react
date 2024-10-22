const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los proyectos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM proyectos';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los proyectos' });
    } else {
      res.json(result);
    }
  });
});

// Agregar un nuevo proyecto
router.post('/', (req, res) => {
  const { nombre, estado, hito, plazo, recurso } = req.body;
  const sql = 'INSERT INTO proyectos (nombre, estado, hito, plazo, recurso) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nombre, estado, hito, plazo, recurso], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al agregar el proyecto' });
    } else {
      res.status(201).json({ message: 'Proyecto agregado exitosamente' });
    }
  });
});

module.exports = router;
