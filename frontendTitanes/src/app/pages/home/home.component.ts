import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Importa esto

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule], // 👈 necesario para usar routerLink
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mostrarOpciones = false;

  constructor(private router: Router) {}

  irA(ruta: string) {
    this.mostrarOpciones = false;
    this.router.navigate([ruta]);
  }

  url = "https://imgs.search.brave.com/VP6-RoM8aPu_DIaJ2vHeeu885wE8RBzsb0aEA2R8mJE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9waXhs/ci5jb20vaW1hZ2Vz/L2dlbmVyYXRvci9o/b3ctdG8tZ2VuZXJh/dGUud2VicA";
actividades = [
  {
    nombre: 'Fútbol Infantil',
    descripcion: 'Entrenamiento lunes y miércoles a las 18hs.',
    img: 'https://picsum.photos/400/200?random=1'
  },
  {
    nombre: 'Vóley Mixto',
    descripcion: 'Sábados a las 16hs.',
    img: 'https://picsum.photos/400/200?random=2'
  },
  {
    nombre: 'Gimnasia Adultos',
    descripcion: 'Martes y jueves a las 19hs.',
    img: 'https://picsum.photos/400/200?random=3'
  }
];

}
