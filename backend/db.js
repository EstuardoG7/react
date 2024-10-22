// db.js
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, } from './config'
const mysql = require('mysql2');


// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: DB_HOST , // XAMPP por defecto usa localhost
  user: DB_USER,      // El usuario predeterminado de MySQL en XAMPP
  password: DB_PASSWORD ,     // Sin contraseña por defecto
  database: DB_NAME , // Nombre de la base de datos que creaste
port: DB_PORT,
});

// Probar conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

module.exports = connection;
