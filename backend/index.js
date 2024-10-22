const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta base para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Backend del sistema de gestión de pruebas en funcionamiento');
});

// Escuchar en el puerto
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});

const proyectosRouter = require('./routes/proyectos');
app.use('/proyectos', proyectosRouter);
