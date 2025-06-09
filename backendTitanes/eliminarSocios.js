const sql = require('msnodesqlv8');
const readline = require('readline');

// Cadena de conexión
const connectionString = 'Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-FF290ON\\SQLEXPRESS;Database=ClubTitanes;Trusted_Connection=Yes;';

// Leer valor de búsqueda desde la terminal
const busqueda = 'corder';

if (!busqueda) {
  console.error('❌ Por favor ingresa un valor de búsqueda (DNI, nombre o apellido). Ejemplo: node eliminarSocios.js juan');
  process.exit(1);
}

// Buscar personas que coincidan
const queryBuscar = `
  SELECT p.id_persona, p.nombre, p.apellido, p.dni, u.id_usuario
  FROM Persona p
  LEFT JOIN Usuario u ON p.id_persona = u.id_persona
  WHERE p.nombre LIKE ? OR p.apellido LIKE ? OR p.dni LIKE ?
`;

const likeBusqueda = `%${busqueda}%`;

sql.query(connectionString, queryBuscar, [likeBusqueda, likeBusqueda, likeBusqueda], (err, rows) => {
  if (err) {
    console.error('❌ Error al buscar personas:', err);
    return;
  }

  if (!rows || rows.length === 0) {
    console.log('⚠️ No se encontraron personas que coincidan con la búsqueda.');
    return;
  }

  console.log('✅ Personas encontradas:');
  console.table(rows);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('✋ Ingresa el ID de la persona que deseas eliminar (id_persona): ', (inputIdPersona) => {
    const idPersona = parseInt(inputIdPersona);

    if (isNaN(idPersona)) {
      console.error('❌ ID inválido.');
      rl.close();
      return;
    }

    // Buscar id_usuario
    const queryUsuario = 'SELECT id_usuario FROM Usuario WHERE id_persona = ?';

    sql.query(connectionString, queryUsuario, [idPersona], (err, userRows) => {
      if (err) {
        console.error('❌ Error al buscar usuario:', err);
        rl.close();
        return;
      }

      const idUsuario = userRows.length > 0 ? userRows[0].id_usuario : null;

      // Eliminar Socio (si existe)
      if (idUsuario) {
        const deleteSocio = 'DELETE FROM Socio WHERE id_socio = ?';
        sql.query(connectionString, deleteSocio, [idUsuario], (err) => {
          if (err) console.warn('⚠️ No se pudo eliminar el socio (puede no existir):', err.message);
        });
      }

      // Eliminar Usuario (si existe)
      const deleteUsuario = 'DELETE FROM Usuario WHERE id_persona = ?';
      sql.query(connectionString, deleteUsuario, [idPersona], (err) => {
        if (err) {
          console.error('❌ Error al eliminar usuario:', err);
          rl.close();
          return;
        }

        // Eliminar Persona
        const deletePersona = 'DELETE FROM Persona WHERE id_persona = ?';
        sql.query(connectionString, deletePersona, [idPersona], (err) => {
          if (err) {
            console.error('❌ Error al eliminar persona:', err);
            rl.close();
            return;
          }

          console.log(`✅ Persona con ID ${idPersona} eliminada correctamente de Socio, Usuario y Persona.`);
          rl.close();
        });
      });
    });
  });
});
