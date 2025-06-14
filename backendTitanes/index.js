const express = require('express');
const cors = require('cors');
const sql = require('msnodesqlv8');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const connectionString = 'Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-FF290ON\\SQLEXPRESS;Database=ClubTitanes;Trusted_Connection=Yes;';

// VALIDACIÓN BACKEND
function validarActividad(data) {
  const { nombre, categoria, dia, horario, lugar, precio, cupo_maximo } = data;
  const diasValidos = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  if (!nombre || !categoria || !dia || !horario || !lugar) {
    return 'Todos los campos de texto son obligatorios';
  }
  if (!diasValidos.includes(dia)) {
    return 'Día no válido. Debe ser uno de: ' + diasValidos.join(', ');
  }
  if (typeof precio !== 'number' || precio < 0) {
    return 'El precio debe ser un número positivo';
  }
  if (typeof cupo_maximo !== 'number' || cupo_maximo < 0) {
    return 'El cupo máximo debe ser un número positivo';
  }
  return null;
}

// RUTAS
app.get('/api/actividades', (req, res) => {
  const query = `
    SELECT 
      id_actividad,
      nombre,
      categoria,
      dia,
      horario,
      lugar,
      '$ ' + FORMAT(precio, 'N2', 'es-AR') AS precio,
      cupo_maximo,
      cantidad_anotados
    FROM Actividad
  `;
  sql.query(connectionString, query, (err, rows) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error en la consulta');
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/actividades', (req, res) => {
  const error = validarActividad(req.body);
  if (error) return res.status(400).send(error);

  const { nombre, categoria, dia, horario, lugar, precio, cupo_maximo } = req.body;
  const query = `
    INSERT INTO Actividad (nombre, categoria, dia, horario, lugar, precio, cupo_maximo, cantidad_anotados)
    OUTPUT INSERTED.*
    VALUES (?, ?, ?, ?, ?, ?, ?, 0)
  `;
  const params = [nombre, categoria, dia, horario, lugar, precio, cupo_maximo];

  sql.query(connectionString, query, params, (err, rows) => {
    if (err) {
      console.error('Error al insertar actividad:', err);
      res.status(500).send('Error al insertar actividad');
    } else {
      res.status(201).json(rows[0]);
    }
  });
});



app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
