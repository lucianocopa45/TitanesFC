import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getActividades(): Observable<any> {
    return this.http.get(`${this.baseUrl}/actividades`);
  }

  getProfesores(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profesores`);
  }

  registrarProfesor(profesor: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar-profesor`, profesor);
  }

  eliminarProfesor(id_persona: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar-profesor/${id_persona}`);
  }
}
