import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario.models';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {

  urlLogin = 'http://localhost:3000/api/login';
  constructor(private _http: HttpClient) { }

  validarUser(usuario: any): Observable<any> {
    return this._http.post<any>(this.urlLogin, usuario);
  }

}
