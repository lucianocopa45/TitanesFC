
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