import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-registroprofesores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgFor, HttpClientModule],
  templateUrl: './registroprofesores.component.html',
  styleUrls: ['./registroprofesores.component.css']
})
export class RegistroProfesoresComponent implements OnInit {
  formProfesor: FormGroup;
  step: number = 1;
  actividades: any[] = [];
  profesores: any[] = [];

  mostrarToast = false;
  mensajeToast = '';
  toastError = false;
  emailAnterior: string = '';
  contraseñaAnterior: string = '';  // <-- Agregado aquí
  especialidadesDisponibles: string[] = [
    'Entrenador de fútbol',
    'Entrenador de básquet',
    'Profesor de natación',
    'Entrenador de handball',
    'Preparador físico',
    'Instructor de ajedrez',
    'Entrenador de rugby',
    'Profesor de gimnasia artística',
    'Instructor de karate',
    'Instructor de judo',
    'Entrenador de atletismo',
    'Profesor de tenis',
    'Profesor de vóley',
    'Docente de nivel inicial (niños)',
    'Coach deportivo'
  ];

  editandoProfesorId: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formProfesor = this.crearFormulario();
  }

  ngOnInit(): void {
    this.cargarActividades();
    this.listarProfesores();
  }

  crearFormulario(): FormGroup {
    return this.fb.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        dni: ['', [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]],
        fecha_nacimiento: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        especialidad: [[], Validators.required],
        actividad: [[], Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordsIguales }
    );
  }

  passwordsIguales: ValidatorFn = (group: AbstractControl) => {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { noCoinciden: true };
  };

  cargarActividades() {
    this.http.get<any[]>('http://localhost:3000/api/actividades').subscribe({
      next: (data) => (this.actividades = data),
      error: (err) => console.error('Error cargando actividades', err)
    });
  }

listarProfesores() {
  this.http.get<any[]>('http://localhost:3000/api/profesores').subscribe((data) => {
    console.log('Profesores recibidos:', data);
    this.profesores = data;
  });
}

  actualizarEspecialidad(esp: string, event: any) {
    let espec = this.formProfesor.value.especialidad || [];
    if (event.target.checked) {
      if (!espec.includes(esp)) {
        espec.push(esp);
      }
    } else {
      espec = espec.filter((e: string) => e !== esp);
    }
    this.formProfesor.patchValue({ especialidad: espec });
    this.formProfesor.get('especialidad')?.markAsTouched();
  }

  actualizarActividad(id_actividad: number, event: any) {
    let actividades = this.formProfesor.value.actividad || [];
    if (event.target.checked) {
      if (!actividades.includes(id_actividad)) {
        actividades.push(id_actividad);
      }
    } else {
      actividades = actividades.filter((a: number) => a !== id_actividad);
    }
    this.formProfesor.patchValue({ actividad: actividades });
    this.formProfesor.get('actividad')?.markAsTouched();
  }

  tieneEspecialidad(esp: string): boolean {
    return (this.formProfesor.value.especialidad || []).includes(esp);
  }

  tieneActividad(id_actividad: number): boolean {
    return (this.formProfesor.value.actividad || []).includes(id_actividad);
  }

  limpiarFormulario() {
    this.formProfesor.reset();
    this.formProfesor.patchValue({
      especialidad: [],
      actividad: []
    });
    this.step = 1;
    this.editandoProfesorId = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  enviar() {
    if (this.formProfesor.invalid) {
      this.formProfesor.markAllAsTouched();
      return;
    }

    const especialidad = this.formProfesor.value.especialidad;
    const id_actividad = this.formProfesor.value.actividad;

const payload = {
  nombre: this.formProfesor.value.nombre,
  apellido: this.formProfesor.value.apellido,
  dni: this.formProfesor.value.dni,
  fecha_nacimiento: this.formProfesor.value.fecha_nacimiento,
  direccion: this.formProfesor.value.direccion,
  telefono: this.formProfesor.value.telefono,
  especialidad: especialidad,
  email: this.formProfesor.value.email,
  contraseña: this.formProfesor.value.password,
  id_actividad: id_actividad
};

if (this.editandoProfesorId) {
  const payloadEdicion = { ...payload };

  // Solo incluir en el payload si han sido modificados
  if (this.formProfesor.value.email !== this.emailAnterior) {
    payloadEdicion.email = this.formProfesor.value.email;
  } else {
    delete payloadEdicion.email;
  }

  if (this.formProfesor.value.password !== this.contraseñaAnterior) {
    payloadEdicion.contraseña = this.formProfesor.value.password;
  } else {
    delete payloadEdicion.contraseña;
  }

    this.http.put(`http://localhost:3000/api/profesores/${this.editandoProfesorId}`, payloadEdicion)


      .subscribe({
        next: () => {
          this.mostrarMensaje('Profesor modificado correctamente');
          this.limpiarFormulario();
          this.listarProfesores();
        },
        error: () => {
          this.mostrarMensaje('Profesor modificado correctamente', true)
          this.limpiarFormulario();
          this.listarProfesores();
        }
      });
    } else {
      this.http.post('http://localhost:3000/api/profesores', payload).subscribe({
        next: () => {
          this.mostrarMensaje('Profesor registrado correctamente');
          this.limpiarFormulario();
          this.listarProfesores();
        },
        error: (err) => {
          if (err.status === 409) {
            this.mostrarMensaje(err.error.mensaje, true);
          } else {
            this.mostrarMensaje('Error al registrar profesor', true);
          }
        }
      });
    }
  }

  mostrarMensaje(mensaje: string, esError: boolean = false) {
    this.mensajeToast = mensaje;
    this.toastError = esError;
    this.mostrarToast = true;
    setTimeout(() => (this.mostrarToast = false), 3000);
  }

  eliminarProfesor(id_profesor: number) {
    if (!confirm('¿Estás seguro de eliminar este profesor?')) return;

    this.http.delete(`http://localhost:3000/api/profesores/${id_profesor}`).subscribe({
      next: () => {
        this.mostrarMensaje('Profesor eliminado correctamente');
        this.listarProfesores();
      },
      error: () => this.mostrarMensaje('Error al eliminar profesor', true)
    });
  }

  modificarProfesor(profesor: any) {
    this.editandoProfesorId = profesor.id_profesor;
    this.step = 1;
    this.emailAnterior = profesor.email;
    this.contraseñaAnterior = profesor.password; // Solo si la tenés
    this.formProfesor.patchValue({
      nombre: profesor.nombre,
      apellido: profesor.apellido,
      dni: profesor.dni,
      fecha_nacimiento: this.formatDateForInput(profesor.fecha_nacimiento),
      direccion: profesor.direccion || '',
      telefono: profesor.telefono || '',
      especialidad: [profesor.especialidad],
      actividad: [profesor.id_actividad || this.actividades.find(a => a.nombre_actividad === profesor.actividad)?.id_actividad || ''],
      email: profesor.email || '',
      password: '', // Dejarlo vacío para que el usuario lo cambie si quiere
      confirmPassword: ''

    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  formatDateForInput(fecha: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    const mes = (d.getMonth() + 1).toString().padStart(2, '0');
    const dia = d.getDate().toString().padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
  }

  siguientePaso() {
    if (this.step === 1) {
      if (
        this.formProfesor.get('nombre')?.invalid ||
        this.formProfesor.get('apellido')?.invalid ||
        this.formProfesor.get('dni')?.invalid ||
        this.formProfesor.get('fecha_nacimiento')?.invalid ||
        this.formProfesor.get('direccion')?.invalid ||
        this.formProfesor.get('telefono')?.invalid ||
        this.formProfesor.get('especialidad')?.invalid ||
        this.formProfesor.get('actividad')?.invalid
      ) {
        this.formProfesor.markAllAsTouched();
        return;
      }
      this.step = 2;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.enviar();
    }
  }

  pasoAnterior() {
    if (this.step > 1) this.step--;
  }
}
