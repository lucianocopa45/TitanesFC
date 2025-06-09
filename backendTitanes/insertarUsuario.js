const express = require('express');
const router = express.Router();
const sql = require('mssql');
const bcrypt = require('bcrypt');
const config = require('./dbConfig');

const SALT_ROUNDS = 10;

router.post('/', async (req, res) => {
  try {
    const { email, contrasena, id_persona, id_rol } = req.body;

    if (!email || !contrasena || !id_persona || !id_rol) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, SALT_ROUNDS);

    const fechaRegistro = new Date(); // Fecha actual
    const habilitado = true;

    let pool = await sql.connect(config);

    await pool.request()
      .input('email', sql.VarChar, email)
      .input('contrasena', sql.VarChar, hashedPassword)
      .input('id_persona', sql.Int, id_persona)
      .input('id_rol', sql.Int, id_rol)
      .input('habilitado', sql.Bit, habilitado)
      .input('fecha_de_registro', sql.DateTime, fechaRegistro)
      .query(`
        INSERT INTO Usuario (email, contraseña, id_persona, id_rol, habilitado, fecha_de_registro)
        VALUES (@email, @contrasena, @id_persona, @id_rol, @habilitado, @fecha_de_registro)
      `);

    res.status(200).json({ mensaje: 'Usuario registrado correctamente.' });

  } catch (error) {
    console.error('Error al insertar usuario:', error);
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
});

module.exports = router;
