export const listaInscripciones: Inscripcion[] = [
  { id_inscripcion: 1, id_socio: 1, id_actividad: 3, fecha_inscripcion: new Date(), estado: true },
  { id_inscripcion: 2, id_socio: 2, id_actividad: 1, fecha_inscripcion: new Date(), estado: true },
  { id_inscripcion: 3, id_socio: 3, id_actividad: 1, fecha_inscripcion: new Date(), estado: true },
  { id_inscripcion: 4, id_socio: 4, id_actividad: 1, fecha_inscripcion: new Date(), estado: true },
  { id_inscripcion: 5, id_socio: 5, id_actividad: 4, fecha_inscripcion: new Date(), estado: true },
  { id_inscripcion: 6, id_socio: 6, id_actividad: 2, fecha_inscripcion: new Date(), estado: true },
  { id_inscripcion: 7, id_socio: 7, id_actividad: 2, fecha_inscripcion: new Date(), estado: true },
  { id_inscripcion: 8, id_socio: 8, id_actividad: 5, fecha_inscripcion: new Date(), estado: true },
  { id_inscripcion: 9, id_socio: 9, id_actividad: 5, fecha_inscripcion: new Date(), estado: true },
  { id_inscripcion: 10, id_socio: 10, id_actividad: 6, fecha_inscripcion: new Date(), estado: true }

];

export interface Inscripcion {
  id_inscripcion: number;
  id_socio: number;
  id_actividad: number;
  fecha_inscripcion: Date;
  estado: boolean;
}