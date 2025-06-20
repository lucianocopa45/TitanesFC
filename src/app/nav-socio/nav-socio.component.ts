import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginAdminService } from '../service/login-admin.service';
import { Usuario } from '../models/Usuario.models';

@Component({
  selector: 'app-nav-socio',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './nav-socio.component.html',
  styleUrl: './nav-socio.component.css'
})
export class NavSocioComponent {
  email: string='';
  password: string='';
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
            //sessionStorage.setItem('usuario', JSON.stringify(response.usuario));
            console.log(rol);
            if (rol === 'ADMIN') {
              this.router.navigate(['/home']);
            }
            else{
              alert('Rol no reconocido: ' + response.rol);
            }
          },
          error: (error)=>{
            console.error("Error de login",error);
            
          }
      })
}




}
