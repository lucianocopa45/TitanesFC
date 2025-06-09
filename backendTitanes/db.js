// backendTitanes/db.js
const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'Kitanchorra_90',
  server: 'DESKTOP-FF290ON\\SQLEXPRESS',
  database: 'ClubTitanes',
  options: {
    trustServerCertificate: true,
  },
};

sql.connect(config)
  .then(() => console.log('🟢 Conectado a SQL Server'))
  .catch((err) => console.error('🔴 Error de conexión:', err));

module.exports = sql;
