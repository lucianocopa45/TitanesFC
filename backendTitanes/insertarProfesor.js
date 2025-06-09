const sql = require('mssql');


async function insertarProfesor(data) {
  try {
    let pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('nombre', sql.VarChar, data.nombre)
      .input('apellido', sql.VarChar, data.apellido)
      .input('email', sql.VarChar, data.email)
      .input('telefono', sql.VarChar, data.telefono)
      .query('INSERT INTO Profesores (Nombre, Apellido, Email, Telefono) VALUES (@nombre, @apellido, @email, @telefono)');
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = insertarProfesor;
