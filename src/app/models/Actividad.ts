export interface Actividad {
  id_actividad: number;
  nombre: string;
  categoria: string;
  dia: string;
  horario: string;
  lugar: string;
  precio: number;
  cupo_maximo: number;
  cantidad_anotados: number;
}