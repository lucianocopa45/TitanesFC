import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
})
export class ActividadComponent implements OnInit {
  formActividad: FormGroup;
  actividades: any[] = [];
  editando = false;
  idEditando: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formActividad = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      dia: ['', Validators.required],
      horario: ['', Validators.required],
      lugar: ['', Validators.required],
      precio: [0, Validators.required],
      cupo_maximo: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {
    this.http.get<any[]>('http://localhost:3000/api/actividades').subscribe(data => {
      this.actividades = data;
    });
  }

  guardarActividad(): void {
    const actividad = this.formActividad.value;
    if (this.editando && this.idEditando !== null) {
      this.http.put(`http://localhost:3000/api/actividades/${this.idEditando}`, actividad).subscribe(() => {
        this.cargarActividades();
        this.formActividad.reset();
        this.editando = false;
        this.idEditando = null;
      });
    } else {
      this.http.post('http://localhost:3000/api/actividades', actividad).subscribe(() => {
        this.cargarActividades();
        this.formActividad.reset();
      });
    }
  }

  editarActividad(act: any): void {
    this.formActividad.patchValue(act);
    this.editando = true;
    this.idEditando = act.id_actividad;
  }

  eliminarActividad(id: number): void {
    this.http.delete(`http://localhost:3000/api/actividades/${id}`).subscribe(() => {
      this.cargarActividades();
    });
  }
}
