import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SociosComponent } from './socios/socios.component';
import { ProfesorComponent } from './profesores/profesores.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'socios',component: SociosComponent},
    {path: 'profesores', component: ProfesorComponent}
];
