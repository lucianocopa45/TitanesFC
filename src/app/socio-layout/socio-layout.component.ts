import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavSocioComponent } from '../nav-socio/nav-socio.component';
import { FooterSocioComponent } from '../footer-socio/footer-socio.component';

@Component({
  selector: 'app-socio-layout',
  imports: [RouterOutlet, NavSocioComponent, FooterSocioComponent],
  templateUrl: './socio-layout.component.html',
  styleUrl: './socio-layout.component.css'
})
export class SocioLayoutComponent {

}
