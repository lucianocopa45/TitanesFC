import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfesorService } from '../service/profesor.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-profesor',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.css'
})
export class ProfesorComponent implements OnInit {
  step = 1;
  personalForm: FormGroup;
  userForm: FormGroup;
  editForm: FormGroup;

  

  profesores: any[] = [];
  ultimoId = 0;
  editandoProfesorId: number | null = null;
  mostrarFormulario: boolean = false;


  especialidades: string[] = [
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
  'Coach deportivo',
];

  actividades: any[] = [];
  
  constructor(private fb: FormBuilder, private profesorService: ProfesorService)
   {
    this.personalForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$')]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$'), Validators.minLength(7), Validators.maxLength(10)]],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      actividades: [[], Validators.required],
      especialidad: ['', Validators.required]
    });

    this.userForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required],
    });

    this.editForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$')]],
    apellido: ['', [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$')]],
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$'), Validators.minLength(7), Validators.maxLength(10)]],
    fechaNacimiento: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
    actividades: [[], Validators.required],
    especialidad: ['', Validators.required],
    
  });
  }


  //Cargar actividades 
  ngOnInit(): void {
      this.profesorService.getActividades().subscribe({
        next: (res) =>{
          this.actividades = res;
        },
        error:() =>{
          alert('Error al cargar actividades');
        }
      });
      this.cargarProfesores();
  }

    cargarProfesores(){
      this.profesorService.getProfesores().subscribe(
        res => this.profesores = this.agruparProfesores(res),
        err => alert('Error al cargar profesores')
      );
    }

    //Agrupamos las actividades por profesor
    agruparProfesores(datos: any[]): any[] {
    const agrupados: any ={};

    for (const fila of datos){
      const id = fila.id_profesor;
  
      if (!agrupados[id]) {
      agrupados[id] = {
        id: fila.id_profesor,
        nombre: fila.nombre,
        apellido: fila.apellido,
        dni: fila.dni,
        fechaNacimiento: fila.fecha_nacimiento,
        direccion: fila.direccion,
        telefono: fila.telefono,
        especialidad: fila.especialidad,
        actividades: [],
        estado: fila.habilitado === 1 ? 'Activo' : 'Inactivo'
      };
    }
    agrupados[id].actividades.push({
      id_actividad: fila.id_actividad,
      nombre: fila.nombre_actividad,
      categoria: fila.categoria,
      dia: fila.dia,
      horario: fila.horario,
      lugar: fila.lugar,
      precio: fila.precio,
      cupo_maximo: fila.cupo_maximo,
      cantidad_anotados: fila.cantidad_anotados
    });

    }
    return Object.values(agrupados);
  }
  
  nextStep() {
    if (this.personalForm.valid) {
      this.step = 2;
    } else {
      alert('Por favor, completá todos los campos requeridos del paso 1.');
    }
  }

  prevStep() {
    this.step = 1;
  }

submit() {
  if (this.personalForm.valid && this.userForm.valid && this.matchPasswords()) {
    const nuevoProfesor={
      nombre: this.personalForm.value.nombre,
      apellido: this.personalForm.value.apellido,
      dni: this.personalForm.value.dni,
      fecha_nacimiento: this.personalForm.value.fechaNacimiento,
      direccion: this.personalForm.value.direccion,
      telefono: this.personalForm.value.telefono,
      especialidad: this.personalForm.value.especialidad,
      actividades: this.personalForm.value.actividades,
      email: this.userForm.value.correo,
      contrasena: this.userForm.value.contrasena

    };
console.log(nuevoProfesor);
  this.profesorService.crearProfesor(nuevoProfesor).subscribe({
    next: () =>{
      alert('Registro exitoso!');
      this.personalForm.reset();
      this.userForm.reset();
      this.step = 1;
      this.cargarProfesores();

    },
    error: () =>{
      alert('Error al registrar profesor');
    }
  });
  } else {
    alert('Revisá los campos y asegurate de que las contraseñas coincidan.');
  }
}


  matchPasswords(): boolean {
    return this.userForm.value.contrasena === this.userForm.value.confirmarContrasena;
  }

editarProfesor(profesor: any) {
  this.editForm.patchValue({
    nombre: profesor.nombre,
    apellido: profesor.apellido,
    dni: profesor.dni,
    fechaNacimiento: this.formatearFecha(profesor.fechaNacimiento),
    direccion: profesor.direccion,
    telefono: profesor.telefono,
    especialidad: profesor.especialidad,
    actividades: profesor.actividades.map((a: any) => a.id_actividad),
    
  });

  this.editandoProfesorId = profesor.id;
  this.mostrarFormulario = true;
}

formatearFecha(fecha: any): string  | null{
  if (!fecha) return null;

  const d = new Date(fecha);
  if (isNaN(d.getTime())) return null;

  const year = d.getFullYear();
  const month =String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;

}

eliminarProfesor(id_profesor: number) {
  const confirmado = confirm('¿Estás seguro de eliminar este profesor?');
  if (confirmado) {
    this.profesorService.eliminarProfesor(id_profesor).subscribe({
      next: () =>{
        alert('Profesor eliminado correctamente'); 
        this.cargarProfesores(); 
      },
      error: () =>{
        alert('Error al eliminar profesor');
      }
    });
    
  }
}
guardarEdicion() {
  if (this.editForm.valid && this.editandoProfesorId !==null) {
    const profesorActualizado = {
      nombre: this.editForm.value.nombre,
      apellido: this.editForm.value.apellido,
      dni: this.editForm.value.dni,
      fecha_nacimiento: this.editForm.value.fechaNacimiento,  
      direccion: this.editForm.value.direccion,
      telefono: this.editForm.value.telefono,
      especialidad: this.editForm.value.especialidad,
      actividades: this.editForm.value.actividades, 
      
    };

    this.profesorService.actualizarProfesor(this.editandoProfesorId, profesorActualizado).subscribe({
      next: () => {
      alert('Datos personales actualizados correctamente');
      this.cancelarEdicion();
      this.cargarProfesores();
      },
      error: () => {
        alert('Error al actualizar profesor');
      }
    }); 
  } else {
    alert('Por favor completá todos los campos del formulario de edición.');
  }
}

cancelarEdicion() {
  this.editandoProfesorId = null;
  this.editForm.reset();
  this.mostrarFormulario = false;
}
}
