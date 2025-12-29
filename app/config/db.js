const mysql = require('mysql2/promise');
const loadConfig = require('./config')

const pool = mysql.createPool(loadConfig.connectionString, {
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
