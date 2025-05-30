import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SociosComponent } from './socios/socios.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { ReportesComponent } from './reportes/reportes.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'socios',component: SociosComponent},
    {path: 'profesores', component: ProfesoresComponent},
    {path: 'reportes', component: ReportesComponent},
    {path: 'miPerfil', component: MiPerfilComponent}
];
