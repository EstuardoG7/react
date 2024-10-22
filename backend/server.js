import {PORT} from './config.js'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Archivo de conexión a la base de datos


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Procesar JSON en el cuerpo de las peticiones

// Ruta para obtener todos los proyectos
app.get('/proyectos', (req, res) => {
  db.query('SELECT * FROM proyectos', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Ruta para guardar un nuevo proyecto
app.post('/proyectos', (req, res) => {
  const { nombre, estado, hito, fechaInicio, fechaFinal, recurso, diasDuracion } = req.body;

  const query = 'INSERT INTO proyectos (nombre, estado, hito, fechaInicio, fechaFinal, recurso, diasDuracion) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [nombre, estado, hito, fechaInicio, fechaFinal, recurso, diasDuracion];

  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('Proyecto guardado exitosamente');
    }
  });
});

// Ruta para eliminar un proyecto
app.delete('/proyectos/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM proyectos WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Proyecto eliminado exitosamente');
    }
  });
});

// Ruta para actualizar un proyecto
app.put('/proyectos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, estado, hito, fechaInicio, fechaFinal, recurso, diasDuracion } = req.body;

  const query = 'UPDATE proyectos SET nombre = ?, estado = ?, hito = ?, fechaInicio = ?, fechaFinal = ?, recurso = ?, diasDuracion = ? WHERE id = ?';
  const values = [nombre, estado, hito, fechaInicio, fechaFinal, recurso, diasDuracion, id];

  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Proyecto actualizado exitosamente');
    }
  });
});

// Rutas para los escenarios

// Ruta para obtener todos los escenarios
app.get('/planes', (req, res) => {
  db.query('SELECT * FROM escenarios', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Ruta para guardar un nuevo escenario
app.post('/planes', (req, res) => {
  const { descripcion, casos, datos, criterios, proyectoId } = req.body;

  const query = 'INSERT INTO escenarios (descripcion, casos, datos, criterios, proyectoId) VALUES (?, ?, ?, ?, ?)';
  const values = [descripcion, casos, datos, criterios, proyectoId];

  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('Escenario guardado exitosamente');
    }
  });
});

// Ruta para eliminar un escenario
app.delete('/planes/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM escenarios WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Escenario eliminado exitosamente');
    }
  });
});

// Ruta para actualizar un escenario
app.put('/planes/:id', (req, res) => {
  const { id } = req.params;
  const { descripcion, casos, datos, criterios, proyectoId } = req.body;

  const query = 'UPDATE escenarios SET descripcion = ?, casos = ?, datos = ?, criterios = ?, proyectoId = ? WHERE id = ?';
  const values = [descripcion, casos, datos, criterios, proyectoId, id];

  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Escenario actualizado exitosamente');
    }
  });
});

// Rutas para los resultados de pruebas

// Ruta para obtener todos los resultados de pruebas
app.get('/resultados', (req, res) => {
  db.query('SELECT * FROM resultados_pruebas', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Ruta para guardar un nuevo resultado de prueba
app.post('/resultados', (req, res) => {
  const { prueba, resultado, error, proyectoId } = req.body;

  const query = 'INSERT INTO resultados_pruebas (prueba, resultado, error, proyectoId) VALUES (?, ?, ?, ?)';
  const values = [prueba, resultado, error || 'Sin errores', proyectoId];

  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('Resultado de prueba guardado exitosamente');
    }
  });
});

// Ruta para eliminar un resultado de prueba
app.delete('/resultados/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM resultados_pruebas WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Resultado de prueba eliminado exitosamente');
    }
  });
});

// Ruta para actualizar un resultado de prueba
app.put('/resultados/:id', (req, res) => {
  const { id } = req.params;
  const { prueba, resultado, error, proyectoId } = req.body;

  const query = 'UPDATE resultados_pruebas SET prueba = ?, resultado = ?, error = ?, proyectoId = ? WHERE id = ?';
  const values = [prueba, resultado, error || 'Sin errores', proyectoId, id];

  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Resultado de prueba actualizado exitosamente');
    }
  });
});

// Rutas para los defectos

// Ruta para obtener todos los defectos
app.get('/defectos', (req, res) => {
  db.query('SELECT * FROM defectos', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Ruta para guardar un nuevo defecto
app.post('/defectos', (req, res) => {
  const { descripcion, clasificacion, miembroAsignado, estado, solucion, proyectoId } = req.body;

  const query = 'INSERT INTO defectos (descripcion, clasificacion, miembroAsignado, estado, solucion, proyectoId) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [descripcion, clasificacion, miembroAsignado, estado, solucion || null, proyectoId];

  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('Defecto guardado exitosamente');
    }
  });
});

// Ruta para eliminar un defecto
app.delete('/defectos/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM defectos WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Defecto eliminado exitosamente');
    }
  });
});

// Ruta para actualizar un defecto
app.put('/defectos/:id', (req, res) => {
  const { id } = req.params;
  const { descripcion, clasificacion, miembroAsignado, estado, solucion, proyectoId } = req.body;

  const query = 'UPDATE defectos SET descripcion = ?, clasificacion = ?, miembroAsignado = ?, estado = ?, solucion = ?, proyectoId = ? WHERE id = ?';
  const values = [descripcion, clasificacion, miembroAsignado, estado, solucion || null, proyectoId, id];

  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Defecto actualizado exitosamente');
    }
  });
});

// Ruta para obtener el historial de un proyecto específico
app.get('/proyectos/:id/historial', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM historial_proyectos WHERE proyectoId = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Iniciar el servidor en el puerto 3001
app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:3001', PORT);
});
