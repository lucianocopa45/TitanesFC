export class Mensaje {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  correo: string;
  telefono: string;
  motivo: string;
  mensaje: string;

  constructor(
    nombre: string,
    apellido: string,
    fechaNacimiento: string,
    correo: string,
    telefono: string,
    motivo: string,
    mensaje: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.fechaNacimiento = fechaNacimiento;
    this.correo = correo;
    this.telefono = telefono;
    this.motivo = motivo;
    this.mensaje = mensaje;
  }
}
