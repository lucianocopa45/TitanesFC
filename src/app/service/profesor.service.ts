import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
private apiUrl = 'http://localhost:3000/api';


  constructor(private http: HttpClient) { }

  //METODO GET PARA OBTENER LISTA DE PROFESORES
  getProfesores(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/profesores`);
  }

  //METODO GET PARA OBTENER LA LISTA DE ACTIVIDADES PARA QUE UN PROFESOR SE ANOTE EN ELLAS
  getActividades(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/actividades`);
  }

 //METODO POST PARA CREAR PROFESOR
 crearProfesor( profesor :any):Observable<any>{
  return this.http.post(`${this.apiUrl}/profesores`, profesor);
 }

 //METODO DELETE PARA ELIMINAR PROFESOR
eliminarProfesor(id: number): Observable<any>{
  return this.http.delete(`${this.apiUrl}/profesores/${id}`);
}

//METODO PUT PARA ACTUALIZAR PROFESORES
actualizarProfesor(id:number, profesor: any):Observable<any>{
  return this.http.put(`${this.apiUrl}/profesores/${id}`, profesor);
}

}



