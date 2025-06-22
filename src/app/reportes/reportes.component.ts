import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Socio } from '../models/Socio';
import { Actividad } from '../models/Actividad';
import { Inscripcion } from '../models/Inscripcion';
@Component({
  selector: 'app-reportes',
  imports: [CommonModule,FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
    // Para el reporte de actividades del socio (por DNI)
  actividadesSocio: any[] = [];

  // Para el reporte de actividades con disponibilidad
  actividadesDisponibles: any[] = [];

  // Otras propiedades si estás usando:
  sociosFiltrados: any[] = [];
  opcionSeleccionada: string = '';
  filtroBusqueda: string = '';
  resultado: number = 0;
  socioEncontrado: any = null;
actividadDelSocio: any = null;
  actividadesFiltradas: Actividad[] = [];
    busquedaRealizada: boolean = false;
    
inscripciones: Inscripcion[] = [
  { id_inscripcion: 1, id_socio: 1, id_actividad: 1, fecha_inscripcion: new Date(), estado: true },
  { id_inscripcion: 2, id_socio: 2, id_actividad: 2, fecha_inscripcion: new Date(), estado: true },
];
socios: Socio[]= [
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
    estadoSocio: false,
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
    estadoSocio: true,
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
    estadoSocio: true,
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
    estadoSocio: true,
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
actividades: Actividad [] = [
  {
    id_actividad: 1,
    nombre: 'Yoga',
    categoria: 'Bienestar',
    dia: 'Lunes',
    horario: '08:00 - 09:00',
    lugar: 'Sala 1',
    precio: 1500,
    cupo_maximo: 20,
    cantidad_anotados: 20
  },
  {
    id_actividad: 2,
    nombre: 'Zumba',
    categoria: 'Fitness',
    dia: 'Martes',
    horario: '18:00 - 19:00',
    lugar: 'Gimnasio',
    precio: 1200,
    cupo_maximo: 25,
    cantidad_anotados: 22
  },
  {
    id_actividad: 3,
    nombre: 'Natación',
    categoria: 'Deporte',
    dia: 'Miércoles',
    horario: '10:00 - 11:00',
    lugar: 'Pileta',
    precio: 2000,
    cupo_maximo: 30,
    cantidad_anotados: 30
  },
  {
    id_actividad: 4,
    nombre: 'Pilates',
    categoria: 'Bienestar',
    dia: 'Jueves',
    horario: '09:00 - 10:00',
    lugar: 'Sala 2',
    precio: 1600,
    cupo_maximo: 18,
    cantidad_anotados: 14
  },
  {
    id_actividad: 5,
    nombre: 'Boxeo',
    categoria: 'Deporte',
    dia: 'Viernes',
    horario: '20:00 - 21:00',
    lugar: 'Gimnasio',
    precio: 1800,
    cupo_maximo: 20,
    cantidad_anotados: 17
  },
  {
    id_actividad: 6,
    nombre: 'Funcional',
    categoria: 'Fitness',
    dia: 'Lunes',
    horario: '19:00 - 20:00',
    lugar: 'Patio',
    precio: 1300,
    cupo_maximo: 25,
    cantidad_anotados: 20
  },
  {
    id_actividad: 7,
    nombre: 'Spinning',
    categoria: 'Fitness',
    dia: 'Martes',
    horario: '07:00 - 08:00',
    lugar: 'Sala 3',
    precio: 1400,
    cupo_maximo: 15,
    cantidad_anotados: 13
  },
  {
    id_actividad: 8,
    nombre: 'Teatro',
    categoria: 'Arte',
    dia: 'Miércoles',
    horario: '17:00 - 19:00',
    lugar: 'Sala Cultural',
    precio: 1000,
    cupo_maximo: 20,
    cantidad_anotados: 19
  },
  {
    id_actividad: 9,
    nombre: 'Pintura',
    categoria: 'Arte',
    dia: 'Jueves',
    horario: '16:00 - 17:30',
    lugar: 'Sala Taller',
    precio: 1100,
    cupo_maximo: 10,
    cantidad_anotados: 8
  },
  {
    id_actividad: 10,
    nombre: 'Escalada',
    categoria: 'Deporte',
    dia: 'Viernes',
    horario: '15:00 - 16:30',
    lugar: 'Pared de escalada',
    precio: 1900,
    cupo_maximo: 12,
    cantidad_anotados: 10
  }
];
  mostrarDetalles: { [dni: string]: boolean } = {};

  mostrarInscripcionCompleta(insc: Inscripcion) {
    const socio = this.socios.find(s => s.id_socio === insc.id_socio);
    const actividad = this.actividades.find(a => a.id_actividad === insc.id_actividad);
    
    return {
      ...insc,
      socio,
      actividad
    };
  }

buscar() {
  const filtro = this.filtroBusqueda.toLowerCase();

  if (this.opcionSeleccionada === 'dni') {
    const dniFiltrado = this.filtroBusqueda.trim();

    // 1. Buscar al socio por DNI
    this.socioEncontrado = this.socios.find(socio => socio.dni === dniFiltrado);

    // 2. Si se encuentra el socio...
    if (this.socioEncontrado) {
      // 3. Buscar la inscripción activa del socio
      const inscripcionActiva = this.inscripciones.find(ins =>
        ins.id_socio === this.socioEncontrado.id_socio && ins.estado === true
      );

      // 4. Si tiene inscripción, buscar la actividad correspondiente
      if (inscripcionActiva) {
        this.actividadDelSocio = this.actividades.find(act =>
          act.id_actividad === inscripcionActiva.id_actividad
        );
      } else {
        this.actividadDelSocio = null;
      }
    } else {
      this.actividadDelSocio = null;
    }
  }

  else if (this.opcionSeleccionada === 'disponibilidad') {
    const diaFiltrado = this.filtroBusqueda.trim().toLowerCase();

    this.actividadesDisponibles = this.actividades.filter(actividad =>
      actividad.dia.toLowerCase() === diaFiltrado
    );
  }
//FILTRAR LOS SOCIOS QUE ESTAN INSCRIPTOS A ACTIVIDADES 
  // else if (this.opcionSeleccionada === 'socios') {
  //   const actividadesInscripto = this.inscripciones
  //     .filter(i => {
  //       const actividad = this.actividades.find(a => a.id_actividad === i.id_actividad);
  //       return actividad?.nombre.toLowerCase().includes(filtro);
  //     })
  //     .map(i => i.id_socio);

  //   this.sociosFiltrados = this.socios.filter(s => actividadesInscripto.includes(s.id_socio));
  // }

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

  limpiarCampos() {
  this.filtroBusqueda = '';
  this.socioEncontrado = null;
  this.actividadDelSocio = null;
  this.busquedaRealizada = false;
  this.actividadesDisponibles = [];
  this.sociosFiltrados = [];
  }

}

