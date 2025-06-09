const sql = require('msnodesqlv8'); //libreria 

// Conexión a la base de datos
const connectionString = 'Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-FF290ON\\SQLEXPRESS;Database=ClubTitanes;Trusted_Connection=Yes;';

const consulta = 'j';

//Consulta con SQL
const query = `SELECT * FROM Persona WHERE nombre LIKE '%${consulta}%' or apellido LIKE '%${consulta}%' or dni LIKE '%${consulta}%'`;

// Ejecutamos la consulta y mostramos resultado de la misma
sql.query(connectionString, query, (err, rows) => {
  if (err) {
    console.error('❌ Error al consultar personas:', err);
    return;
  }

  console.log('✅ Lista de personas que coinciden con la busqueda:');
  console.table(rows); // Muestra los resultados en formato de tabla
  
});
