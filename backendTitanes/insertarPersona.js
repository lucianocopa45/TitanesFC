const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('./dbConfig');

router.post('/', async (req, res) => {
  try {
    const { nombre, apellido, dni, fechaNacimiento, direccion, telefono, especialidad, actividades } = req.body;
    let pool = await sql.connect(config);

    const result = await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('apellido', sql.VarChar, apellido)
      .input('dni', sql.VarChar, dni)
      .input('fechaNacimiento', sql.Date, fechaNacimiento)
      .input('direccion', sql.VarChar, direccion)
      .input('telefono', sql.VarChar, telefono)
      .input('especialidad', sql.VarChar, especialidad)
      .query(`
        INSERT INTO Persona (nombre, apellido, dni, fechaNacimiento, direccion, telefono, especialidad)
        OUTPUT INSERTED.id_persona
        VALUES (@nombre, @apellido, @dni, @fechaNacimiento, @direccion, @telefono, @especialidad)
      `);

    const id_persona = result.recordset[0].id_persona;

    // Insertar actividades del profesor en tabla intermedia si aplica...

    res.json({ id_persona });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
