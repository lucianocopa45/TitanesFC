import { Routes } from '@angular/router';

import { SociosComponent } from './socios/socios.component';
import { ActividadComponent } from './actividad/actividad.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { InicioSocioComponent } from './inicio-socio/inicio-socio.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SocioLayoutComponent } from './socio-layout/socio-layout.component';
import { ContactoComponent } from './contact/contact.component';


export const routes: Routes = [
  {
    path: '',
    component: SocioLayoutComponent,
    children: [
      { path: '', component: InicioSocioComponent },
      { path: 'panel', component: InicioSocioComponent },
      { path: 'miPerfil', component: MiPerfilComponent },
      { path: 'contacto', component: ContactoComponent }
    ]
  },
{
  path: 'home',
  component: AdminLayoutComponent,
  children: [
    { path: '', component: HomeAdminComponent }, // esto carga en /home
    { path: 'socios', component: SociosComponent },
    { path: 'profesores', component: ProfesorComponent },
    { path: 'actividades', component: ActividadComponent },
    { path: 'reportes', component: ReportesComponent }
  ]
}
];  
