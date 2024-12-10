// src/db/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         
  password: 'p20013637973415101', 
  database: 'workshop1' 
});

module.exports = pool;
