//import { Actividad } from './Actividad';

export interface Profesor{
    id_profesor:       number;
    id_persona:        number;
    nombre:            string;
    apellido:          string;
    dni:               string;
    fecha_nacimiento:  Date;
    direccion:         string;
    telefono:          string;
    id_especialidad:   number;
    especialidad:      string;
    id_actividad:      number;
    nombre_actividad:  string;
    categoria:         string;
    dia:               string;
    horario:           string;
    lugar:             string;
    precio:            number;
    cupo_maximo:       number;
    cantidad_anotados: number;
    habilitado:        boolean;
}