const sql = require('msnodesqlv8');

// Conexión a la base de datos
const connectionString = 'Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-FF290ON\\SQLEXPRESS;Database=ClubTitanes;Trusted_Connection=Yes;';

// Consulta para obtener todas las personas
const query = 's.id_socio, p.nombre, p.apellido,p.dni,p.fecha_nacimiento,p.direccion, p.telefono, p.foto_url, u.email, u.habilitado, u.fecha_de_registro, u.ultimo_inicio_sesion, c.nombre AS categoria, c.descripcion AS descripcion_categoria, c.cuota, s.estado_socio FROM Socio s INNER JOIN Usuario u ON s.id_socio = u.id_usuario INNER JOIN Persona p ON u.id_persona = p.id_persona INNER JOIN Categoria c ON s.id_categoria = c.id_categoria;'

// Ejecutar la consulta
sql.query(connectionString, query, (err, rows) => {
  if (err) {
    console.error('❌ Error al consultar personas:', err);
    return;
  }

  console.log('✅ Lista de personas:');
  console.table(rows); // Muestra los resultados en formato de tabla
});
