import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {
  formActividad: FormGroup;
  actividades: any[] = [];
  editando = false;
  idEditando: number | null = null;
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábados', 'Domingos'];
  horarios = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formActividad = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      dia: ['', Validators.required],
       horario: ['', Validators.required],
      lugar: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      cupo_maximo: [0, [Validators.required, Validators.min(0)]]
    });
  }

//CATEGORIAS DISPONIBLES
lugaresDisponibles = [
  'Cancha 01',
  'Cancha 2',
  'Cancha 3',
  'Gimnasio 1',
  'Gimnasio 2',
  'Gimnasio 3',
  'Pista 1',
  'Pista ',
  'Pileta'
];




//CATEGORIAS DISPONIBLES
categoriasDisponibles = [
  'Infantil',
  'Deporte',
  'Deporte Individual',
  'Deporte de Grupo',
  'Arte',
  'Arte Marcial'
];

//FRANJA HORARIA DISPONIBLE
   horariosDisponibles: string[] = [
  '09:00 - 11:00',
  '10:00 - 11:00',
  '10:00 - 12:00',
  '11:00 - 12:00',
  '15:00 - 17:00',
  '15:00 - 16:30',
  '16:00 - 17:00',
  '16:00 - 17:30',
  '17:00 - 18:00',
  '18:00 - 19:00',
  '17:00 - 18:00'
  ];

  ngOnInit(): void {
    this.cargarActividades();
  }
  
  cargarActividades(): void {
    this.http.get<any[]>('http://localhost:3000/api/actividades').subscribe(data => {
      this.actividades = data;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  guardarActividad(): void {
    if (this.formActividad.invalid) {
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const actividad = this.formActividad.value;
    if (this.editando && this.idEditando !== null) {
      this.http.put(`http://localhost:3000/api/actividades/${this.idEditando}`, actividad).subscribe({
        next: (resp) => {
          alert('Actividad actualizada');
          this.cargarActividades();
          this.formActividad.reset();
          this.editando = false;
          this.idEditando = null;
        },
        error: (err) => {
          alert('Error al actualizar: ' + err.error);
        }
      });
    } else {
      this.http.post('http://localhost:3000/api/actividades', actividad).subscribe({
        next: (resp) => {
          alert('Actividad registrada');
          this.cargarActividades();
          this.formActividad.reset();
        },
        error: (err) => {
          alert('Error al registrar: ' + err.error);
        }
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

editarActividad(act: any): void {
  console.log('Actividad a editar:', act);
  this.formActividad.patchValue({
    nombre: act.nombre,
    categoria: act.categoria,
    dia: act.dia,
    horario: act.horario,
    lugar: act.lugar,
    precio: act.precio,
    cupo_maximo: act.cupo_maximo
  });
  this.editando = true;
  this.idEditando = act.id_actividad;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

  eliminarActividad(id: number): void {
    if (confirm('¿Está seguro que desea eliminar esta actividad?')) {
      this.http.delete(`http://localhost:3000/api/actividades/${id}`).subscribe({
        next: (resp: any) => {
          alert(resp.mensaje);
          this.cargarActividades();
        },
        error: () => {
          alert('Error al eliminar');
        }
      });
    }
  }
}
