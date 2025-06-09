// backendTitanes/profesores.js
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

const connectionString = 'Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-FF290ON\\SQLEXPRESS;Database=ClubTitanes;Trusted_Connection=Yes;';

// Crear profesor completo (Usuario + Profesor + Asignación)
router.post('/profesores', (req, res) => {
  const {
    nombre,
    apellido,
    dni,
    telefono,
    especialidad,
    email,
    contraseña,
    id_actividad
  } = req.body;

  if (!nombre || !apellido || !dni || !telefono || !especialidad || !email || !contraseña || !id_actividad) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }

  const fechaRegistro = new Date().toISOString();
  const insertUsuario = `
    INSERT INTO Usuario (email, contraseña, id_persona, id_rol, habilitado, fecha_de_registro)
    VALUES ('${email}', '${contraseña}', NULL, 2, 1, '${fechaRegistro}');
    SELECT SCOPE_IDENTITY() AS id_usuario;
  `;

  sql.query(connectionString, insertUsuario, (err, rows) => {
    if (err) return res.status(500).json({ mensaje: 'Error al insertar usuario', error: err });

    const id_usuario = rows[0].id_usuario;

    const insertProfesor = `
      INSERT INTO Profesor (id_profesor, especialidad)
      VALUES (${id_usuario}, '${especialidad}');
    `;

    sql.query(connectionString, insertProfesor, (err2) => {
      if (err2) return res.status(500).json({ mensaje: 'Error al insertar profesor', error: err2 });

      const insertAsignacion = `
        INSERT INTO Asignacion_Profesor (id_profesor, id_actividad)
        VALUES (${id_usuario}, ${id_actividad});
      `;

      sql.query(connectionString, insertAsignacion, (err3) => {
        if (err3) return res.status(500).json({ mensaje: 'Error al asignar actividad', error: err3 });

        res.json({ mensaje: 'Profesor registrado correctamente con usuario y asignación' });
      });
    });
  });
});

// Listar profesores
router.get('/profesores', (req, res) => {
  const query = `
    SELECT p.id_profesor, u.email, pr.especialidad, a.nombre AS actividad
    FROM Profesor pr
    JOIN Usuario u ON pr.id_profesor = u.id_usuario
    LEFT JOIN Asignacion_Profesor ap ON pr.id_profesor = ap.id_profesor
    LEFT JOIN Actividad a ON ap.id_actividad = a.id_actividad
  `;

  sql.query(connectionString, query, (err, rows) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener profesores', error: err });
    res.json(rows);
  });
});

// Actualizar profesor
router.put('/profesores/:id', (req, res) => {
  const { id } = req.params;
  const { especialidad } = req.body;

  const query = `
    UPDATE Profesor
    SET especialidad = '${especialidad}'
    WHERE id_profesor = ${id}
  `;

  sql.query(connectionString, query, (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al actualizar profesor', error: err });
    res.json({ mensaje: 'Profesor actualizado correctamente' });
  });
});

// Eliminar profesor
router.delete('/profesores/:id', (req, res) => {
  const { id } = req.params;

  const eliminarAsignacion = `DELETE FROM Asignacion_Profesor WHERE id_profesor = ${id};`;
  const eliminarProfesor = `DELETE FROM Profesor WHERE id_profesor = ${id};`;
  const eliminarUsuario = `DELETE FROM Usuario WHERE id_usuario = ${id};`;

  sql.query(connectionString, eliminarAsignacion, (err1) => {
    if (err1) return res.status(500).json({ mensaje: 'Error al eliminar asignación', error: err1 });

    sql.query(connectionString, eliminarProfesor, (err2) => {
      if (err2) return res.status(500).json({ mensaje: 'Error al eliminar profesor', error: err2 });

      sql.query(connectionString, eliminarUsuario, (err3) => {
        if (err3) return res.status(500).json({ mensaje: 'Error al eliminar usuario', error: err3 });

        res.json({ mensaje: 'Profesor eliminado completamente' });
      });
    });
  });
});

module.exports = router;
