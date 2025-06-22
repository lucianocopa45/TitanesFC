import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginAdminService } from '../service/login-admin.service';
import { Usuario } from '../models/Usuario.models';
declare var bootstrap: any;
@Component({
  selector: 'app-nav-socio',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './nav-socio.component.html',
  styleUrl: './nav-socio.component.css'
})
export class NavSocioComponent {
  email: string='';
  password: string='';
  @ViewChild('loginModal') loginModal!: ElementRef;
  //loginData: Usuario | undefined;
  constructor(private _apiServiceLogin: LoginAdminService, private router: Router){}
  onSubmit(){ 
    const loginData = {
    email: this.email,
    password: this.password
  };
      this._apiServiceLogin.validarUser(loginData).subscribe({
          //console.log(loginData);
          next: (response)=>{
          const rol = response.usuario.rol.toUpperCase(); // ✅ corrección

            console.log("Login exitoso",response);
            console.log(rol);

            if (rol === 'ADMIN') {
            const modalElement = this.loginModal.nativeElement;
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modalInstance.hide();
            sessionStorage.setItem('usuario', JSON.stringify(response.usuario));
            const usuarioGuardado = sessionStorage.getItem('usuario');
            console.log("Usuario guardado en sessionStorage:", usuarioGuardado);
              this.router.navigate(['/home']);
            }
            else{
              alert('Rol no reconocido: ' + rol);
              this.email = '';
              this.password = '';
            }
          },
          error: (error)=>{
            alert("Usuario o Contraseña incorrecto");
            console.error("Error de login",error);
            this.email = '';
            this.password = '';            
          }
      })
}




}
