import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listaInscripciones } from '../models/Inscripcion';
import { listaSocios } from '../models/Socio';
import { DatePipe } from '@angular/common';
import { listaActividades } from '../models/Actividad';

@Component({
  selector: 'app-home-admin',
  imports: [RouterModule, DatePipe],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit{
ngOnInit(): void {
  const inscripcionesActivas = this.filtroInscripcion.filter(i => i.estado === true);

  this.inscripcionActivaSocios = inscripcionesActivas.map(insc => {
    const socio = this.filtroSocios.find(s => s.id_socio === insc.id_socio);
    const actividad = this.filtroActividades.find(a => a.id_actividad === insc.id_actividad);

    return {
      nombreSocio: socio?.nombre,
      apellidoSocio:socio?.apellido,
      nombreActividad: actividad?.nombre,
      fecha: insc.fecha_inscripcion
    };
  });
  console.log(this.inscripcionActivaSocios);
// while (this.inscripcionActivaSocios.length>5) {
// this.inscripcionActivaSocios.shift(); 
// }
this.inscripcionActivaSocios = this.inscripcionActivaSocios.slice(-5);

console.log(this.inscripcionActivaSocios)
}
arrayHistorial: any[]=[];
imagen: string = '';
filtroInscripcion = listaInscripciones;
filtroSocios = listaSocios;
filtroActividades = listaActividades;

filtrarInscripcion: any[]=[];
inscripcionActivaSocios: any[]=[];


}
