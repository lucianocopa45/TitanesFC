// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // ✅ IMPORTAR
import { HomeComponent } from './pages/home/home.component';
import { SociosComponent } from './socios/socios.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { LoginFormComponent } from './login/login.component';
import { RegistroProfesoresComponent } from './registroprofesores/registroprofesores.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'socios', component: SociosComponent },
  { path: 'profesores', component: ProfesoresComponent },
  { path: 'login', component: LoginFormComponent },
  {   path: 'registroprofesores',
  component: RegistroProfesoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
