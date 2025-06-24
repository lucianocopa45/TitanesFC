import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  usuario: any;
  nombre: any;
  rol: any;
  apellido: any;
  ngOnInit(): void {
    try {
      const usuarioStorage = sessionStorage.getItem('usuario');

      if (usuarioStorage) {
      this.usuario = JSON.parse(usuarioStorage);
      this.nombre = this.usuario.nombre;
      this.rol = this.usuario.rol;
      this.apellido = this.usuario.apellido;

      console.log("Usuario cargado desde sessionStorage:", this.usuario);
      }
    } catch (error) {
      console.error("No se cargo usuario", error);
    }

  }

  cerrarSesion() {
  localStorage.clear();
  window.location.href = '/panel';
}
}
