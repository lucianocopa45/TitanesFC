import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SociosService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

 //Método GET para obtener la lista de socios.
  getSocios(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/socios`);
  }

//Método GET para obtener la lista de actividades disponibles.
  getActividades(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/actividades`);
  }

 //Método GET para obtener la lista de categorías de socios.
  getCategorias(): Observable<any[]>{ // Nuevo método para obtener categorías
    return this.http.get<any[]>(`${this.apiUrl}/categoriaSocio`);
  }

  //Método POST para crear un nuevo socio.
  crearSocio(socio: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/socios`, socio);
  }

//Método DELETE para eliminar un socio por su ID.
  eliminarSocio(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/socios/${id}`);
  }

//Método PUT para actualizar un socio existente.
  actualizarSocio(id: number, socio: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/socios/${id}`, socio);
  }
}