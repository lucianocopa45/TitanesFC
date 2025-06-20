import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Socio, listaSocios } from '../models/Socio';
import { Actividad, listaActividades } from '../models/Actividad';
import { Inscripcion, listaInscripciones } from '../models/Inscripcion';
@Component({
  selector: 'app-reportes',
  imports: [CommonModule,FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {

  ngOnInit(): void {
      this.estadoBuscador = false;
  }
    // Para el reporte de actividades del socio (por DNI)
    // socioEncontrado: any = null;
// actividadDelSocio: Actividad | null = null;

textoLabelCheckBox:string = '';
placeHolderCheckBox:string = '';

estadoBuscador: boolean = true;
profesorDeActividad: any = null;
  actividadesSocio: any[] = [];
  actividadAsignadaAlProfesor: Actividad | null = null;

  // Para el reporte de actividades con disponibilidad
  actividadesDisponibles: any[] = [];

  // Otras propiedades si estás usando:
  inscripciones = listaInscripciones;
  socios = listaSocios;
  actividades = listaActividades;
  sociosFiltrados: any[] = [];
  opcionSeleccionada: string = '';
  filtroBusqueda: string = '';
  resultado: number = 0;
  socioEncontrado: any = null;
actividadDelSocio: any = null;
  actividadesFiltradas: Actividad[] = [];
    busquedaRealizada: boolean = false;
    

  mostrarDetalles: { [dni: string]: boolean } = {};


buscar() {
  const filtro = this.filtroBusqueda.toLowerCase();

if (this.opcionSeleccionada === 'dni') {
  const dniFiltrado = this.filtroBusqueda.trim();
  this.socioEncontrado = this.socios.find(socio => socio.dni === dniFiltrado);

  if (this.socioEncontrado) {
    const inscripcionActiva = this.inscripciones.find(ins =>
      ins.id_socio === this.socioEncontrado.id_socio && ins.estado === true
    );

    if (inscripcionActiva) {
      this.actividadDelSocio = this.actividades.find(act =>
        act.id_actividad === inscripcionActiva.id_actividad
      );

      if (this.actividadDelSocio) {
        const profesoresGuardados = localStorage.getItem('profesores');
        if (profesoresGuardados) {
          const profesores = JSON.parse(profesoresGuardados);

          // Buscar profesor que tenga la actividad exacta asignada
          const profesor = profesores.find((prof: any) =>
            Array.isArray(prof.actividades) &&
            prof.actividades.some((act: any) =>
              act.id_actividad === this.actividadDelSocio!.id_actividad
            )
          );

          if (profesor) {
            this.profesorDeActividad = profesor;
            this.actividadAsignadaAlProfesor = profesor.actividades.find((act: any) =>
              act.id_actividad === this.actividadDelSocio!.id_actividad
            );
          } else {
            this.profesorDeActividad = null;
            this.actividadAsignadaAlProfesor = null;
          }
        } else {
          this.profesorDeActividad = null;
          this.actividadAsignadaAlProfesor = null;
        }
      } else {
        this.profesorDeActividad = null;
        this.actividadAsignadaAlProfesor = null;
      }
    } else {
      this.actividadDelSocio = null;
      this.profesorDeActividad = null;
      this.actividadAsignadaAlProfesor = null;
    }
  } else {
    this.actividadDelSocio = null;
    this.profesorDeActividad = null;
    this.actividadAsignadaAlProfesor = null;
  }
}

  else if (this.opcionSeleccionada === 'disponibilidad') {
    const diaFiltrado = this.filtroBusqueda.trim().toLowerCase();

    this.actividadesDisponibles = this.actividades.filter(actividad =>
      actividad.dia.toLowerCase() === diaFiltrado
    );
  }


  else if (this.opcionSeleccionada === 'socios') {
    const nombreFiltro = this.filtroBusqueda.trim().toLowerCase();

    if (nombreFiltro === '') {
          this.sociosFiltrados = [...this.socios];
    return;
    }else{
    this.sociosFiltrados = this.socios.filter( s => s.nombre.toLowerCase() === nombreFiltro);
    }

  }
}

ocultarBuscador(estado:boolean){
this.estadoBuscador = estado;
if (this.opcionSeleccionada === 'dni') {
  this.textoLabelCheckBox = 'Ingrese DNI del socio';
  this.placeHolderCheckBox = 'Ingrese DNI'
}
else if (this.opcionSeleccionada === 'socios') {
  this.textoLabelCheckBox = 'Ingrese nombre del socio';
  this.placeHolderCheckBox = 'Ingrese nombre'

}
}
limpiarCampos() {
this.filtroBusqueda = '';
this.socioEncontrado = null;
this.actividadDelSocio = null;
this.busquedaRealizada = false;
this.actividadesDisponibles = [];
this.sociosFiltrados = [];
}

}

