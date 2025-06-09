import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


interface LoginResponse {
  message: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    rol: string;
  };
}

@Component({
  standalone: true,
  selector: 'app-login-form',
  imports: [HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginFormComponent {
  email = '';
  password = '';
  constructor(private http: HttpClient, private router: Router) {}

  // Cuando el formulario se envia esto
     onSubmit() {
  console.log('onSubmit ejecutado');
  console.log('Email:', this.email);
  console.log('Password:', this.password);

    const loginData = {
    email: this.email,
    password: this.password
  };

    this.http.post<LoginResponse>('http://localhost:3000/api/login', loginData).subscribe({
  next: (response) => {
    console.log('✅ Login exitoso:', response);

    // Guardar en sessionStorage
    sessionStorage.setItem('usuario', JSON.stringify(response.usuario));

    // Redirigir según el rol
const rol = response.usuario.rol.toUpperCase();

if (rol === 'PROFESOR') {
  this.router.navigate(['/profesores']);
} else if (rol === 'SOCIO') {
  this.router.navigate(['/socios']);
} else {
  alert('Rol no reconocido: ' + response.usuario.rol);
}
  },
error: (error: HttpErrorResponse) => {
  console.error('❌ Error en login:', error);
  alert('Usuario o contraseña incorrecta');
}
});
error: (error: HttpErrorResponse) => {
  console.error('❌ Error en login:', error);
  alert('Usuario o contraseña incorrecta');
}
      ;
  }
}