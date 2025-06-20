export const listaSocios: Socio[]= [
  {
    id_socio:1,
    dni: "30111222",
    nombre: "Juan",
    apellido: "Pérez",
    fechaNacimiento: "1990-05-14",
    direccion: "Av. Siempre Viva 123",
    telefono: "1123456789",
    fechaIngreso: "2020-03-01",
    categoria: "Activo",
    urlFoto: "https://example.com/fotos/juan_perez.jpg",
    estadoSocio: true
  },
  {
    dni: "30222333",
    nombre: "María",
    apellido: "Gómez",
    fechaNacimiento: "1985-11-02",
    direccion: "Calle Falsa 456",
    telefono: "1134567890",
    fechaIngreso: "2018-07-15",
    categoria: "Vitalicio",
    urlFoto: "https://example.com/fotos/maria_gomez.jpg",
    estadoSocio: true,
    id_socio: 2
  },
  {
    dni: "30333444",
    nombre: "Lucía",
    apellido: "Fernández",
    fechaNacimiento: "2002-04-23",
    direccion: "Bv. Mitre 789",
    telefono: "1145678901",
    fechaIngreso: "2023-01-10",
    categoria: "Cadete",
    urlFoto: "https://example.com/fotos/lucia_fernandez.jpg",
    estadoSocio: true,
    id_socio: 3
  },
  {
    dni: "30444555",
    nombre: "Carlos",
    apellido: "Rodríguez",
    fechaNacimiento: "1978-09-30",
    direccion: "Ruta 3 km 45",
    telefono: "1156789012",
    fechaIngreso: "2015-05-20",
    categoria: "Activo",
    urlFoto: "https://example.com/fotos/carlos_rodriguez.jpg",
    estadoSocio: true,
    id_socio: 4
  },
  {
    dni: "30555666",
    nombre: "Ana",
    apellido: "Martínez",
    fechaNacimiento: "1995-12-05",
    direccion: "Av. San Martín 1500",
    telefono: "1167890123",
    fechaIngreso: "2019-10-30",
    categoria: "Adherente",
    urlFoto: "https://example.com/fotos/ana_martinez.jpg",
    estadoSocio: false,
    id_socio: 5
  },
  {
    dni: "30666777",
    nombre: "Diego",
    apellido: "López",
    fechaNacimiento: "2000-06-18",
    direccion: "Calle 9 de Julio 456",
    telefono: "1178901234",
    fechaIngreso: "2021-04-01",
    categoria: "Cadete",
    urlFoto: "https://example.com/fotos/diego_lopez.jpg",
    estadoSocio: true,
    id_socio: 6
  },
  {
    dni: "30777888",
    nombre: "Laura",
    apellido: "Díaz",
    fechaNacimiento: "1988-01-12",
    direccion: "Pasaje La Paz 99",
    telefono: "1189012345",
    fechaIngreso: "2010-02-14",
    categoria: "Vitalicio",
    urlFoto: "https://example.com/fotos/laura_diaz.jpg",
    estadoSocio: false,
    id_socio: 7
  },
  {
    dni: "30888999",
    nombre: "Martín",
    apellido: "Sánchez",
    fechaNacimiento: "1992-07-07",
    direccion: "Diagonal Norte 200",
    telefono: "1190123456",
    fechaIngreso: "2022-06-05",
    categoria: "Adherente",
    urlFoto: "https://example.com/fotos/martin_sanchez.jpg",
    estadoSocio: true,
    id_socio: 8
  },
  {
    dni: "30999000",
    nombre: "Paula",
    apellido: "Romero",
    fechaNacimiento: "1998-10-28",
    direccion: "Camino Real 34",
    telefono: "1101234567",
    fechaIngreso: "2024-03-12",
    categoria: "Activo",
    urlFoto: "https://example.com/fotos/paula_romero.jpg",
    estadoSocio: false,
    id_socio: 9
  },
  {
    dni: "31000111",
    nombre: "Facundo",
    apellido: "Alvarez",
    fechaNacimiento: "1996-02-17",
    direccion: "Ruta Provincial 5 km 10",
    telefono: "1112345678",
    fechaIngreso: "2021-08-25",
    categoria: "Adherente",
    urlFoto: "https://example.com/fotos/facundo_alvarez.jpg",
    estadoSocio: true,
    id_socio: 10
  }
];
export interface Socio {
  id_socio: number;
  dni: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;  // o Date, si querés manejar objetos Date
  direccion: string;
  telefono: string;
  fechaIngreso: string;    // o Date
  categoria: string;
  urlFoto: string;
  estadoSocio: boolean;
}