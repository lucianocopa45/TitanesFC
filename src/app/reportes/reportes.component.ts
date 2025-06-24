import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { listaSocios } from '../models/Socio';
import { Actividad, listaActividades } from '../models/Actividad';
import { listaInscripciones } from '../models/Inscripcion';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule,FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {

  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
      this.estadoBuscador = false;

  }


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

socioDatos: any[] = [];
dniNoEncontrado = false;
  cargarActividades() {
    this.http.get<any[]>('http://localhost:3000/api/actividades').subscribe({
      next: (res) => this.actividades = res,
      error: () => alert('Error al cargar actividades')
    });
  }

  cargarSocios() {
    this.http.get<any[]>('http://localhost:3000/api/socios').subscribe({
      next: (res) => {
        this.socios = res;
        this.sociosFiltrados = [...res];
      },
      error: () => alert('Error al cargar socios')
    });
  }
  buscar() {
    const filtro = this.filtroBusqueda.trim().toLowerCase();

    if (this.opcionSeleccionada === 'dni') {
      if (!filtro) return;

      this.http.get<any[]>(`http://localhost:3000/api/socio/dni/${filtro}`).subscribe({
        next: (res) => {
          if (res.length > 0) {
            const socio = res[0];
            this.socioEncontrado = {
              nombre: socio.nombre_socio,
              apellido: socio.apellido_socio,
              dni: socio.dni
            };
            this.actividadDelSocio = {
              nombre: socio.nombre_actividad,
              dia: socio.dia,
              horario: socio.horario
            };
            this.profesorDeActividad = {
              nombre: socio.nombre_profesor,
              apellido: socio.apellido_profesor
            };
          } else {
            this.socioEncontrado = null;
            this.actividadDelSocio = null;
            this.profesorDeActividad = null;
          }
        },
        error: () => {
          this.socioEncontrado = null;
          this.actividadDelSocio = null;
          this.profesorDeActividad = null;
        }
      });
    }

else if (this.opcionSeleccionada === 'disponibilidad') {
  if (!filtro) {
    this.actividadesDisponibles = [];
    return;
  }

  // Obtener todas las actividades y filtrar por nombre
  this.http.get<any[]>(`http://localhost:3000/api/actividades`).subscribe({
    next: (res) => {
      const filtroDia = filtro.toLowerCase();
      this.actividadesDisponibles = res.filter(act =>
        act.dia.toLowerCase().includes(filtroDia)
      );
    },
    error: () => {
      this.actividadesDisponibles = [];
    }
  });
}

else if (this.opcionSeleccionada === 'socios') {
  if (!filtro) {
    // Trae todos los socios si no hay filtro
    this.http.get<any[]>(`http://localhost:3000/api/socios`).subscribe({
      next: (res) => {
        this.sociosFiltrados = res;
      },
      error: () => {
        this.sociosFiltrados = [];
      }
    });
  } else {
    // Trae todos los socios y filtra por nombre desde el front
    this.http.get<any[]>(`http://localhost:3000/api/socios`).subscribe({
      next: (res) => {
        const filtroNombre = filtro.toLowerCase();
        this.sociosFiltrados = res.filter(socio =>
          socio.nombre.toLowerCase().includes(filtroNombre)
        );
      },
      error: () => {
        this.sociosFiltrados = [];
      }
    });
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

