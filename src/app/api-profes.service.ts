import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from './models/Profesor.models';
@Injectable({
  providedIn: 'root'
})
export class ApiProfesService {

  url = 'http://localhost:3000/api/profesores';

  
  constructor(private _http: HttpClient) { }

  getAll():Observable<Profesor[]> {
    return this._http.get<Profesor[]>(this.url)
  }
}
