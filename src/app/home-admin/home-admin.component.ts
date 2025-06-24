import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { listaInscripciones } from '../models/Inscripcion';
import { listaActividades } from '../models/Actividad';
import { SociosService } from '../service/socios.service';

@Component({
  selector: 'app-home-admin',
  imports: [RouterModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit{
arrayHistorial: any[]=[];
imagen: string = '';
filtroInscripcion = listaInscripciones;
filtroActividades = listaActividades;

filtrarInscripcion: any[]=[];
inscripcionActivaSocios: any[]=[];
  constructor(private socioService: SociosService){
  }
ngOnInit(): void {

this.socioService.getSocios().subscribe({
  next: (res) => {
    // Filtrar socios con al menos una inscripción
    const sociosConInscripcion = res.filter(socio => 
      socio.actividadesSocio && socio.actividadesSocio.length > 0
    );


    const ultimos5 = sociosConInscripcion.slice(-5).reverse(); // los más recientes arriba

    this.inscripcionActivaSocios = ultimos5.map(socio => ({
      nombreSocio: socio.nombre,
      apellidoSocio: socio.apellido,
      nombreActividad: socio.actividadesSocio[0]?.nombre || 'Sin actividad',
      fecha: 'Sin fecha' 
    }));
  },
  error: () => {
    alert('Error al cargar socios');
  }
});

  console.log(this.inscripcionActivaSocios);

this.inscripcionActivaSocios = this.inscripcionActivaSocios.slice(-5);

console.log(this.inscripcionActivaSocios)
}

}
