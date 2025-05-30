import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SociosComponent } from './socios/socios.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ProfesorComponent } from './profesor/profesor.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'socios',component: SociosComponent},
    {path: 'profesores', component: ProfesorComponent},
    {path: 'reportes', component: ReportesComponent},
    {path: 'miPerfil', component: MiPerfilComponent}
];
