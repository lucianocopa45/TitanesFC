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

 /* actividades = [
    {
      id_actividad: 1,
      nombre: 'Ajedrez',
      categoria: 'Arte',
      dia: 'Lunes',
      horario: '08:00 - 09:00',
      lugar: 'Sala Cultural',
      precio: 1500,
      cupo_maximo: 20,
      cantidad_anotados: 20
    },
    {
      id_actividad: 2,
      nombre: 'Tenis',
      categoria: 'Deporte Individual',
      dia: 'Sábados',
      horario: '10:00 - 12:00',
      lugar: 'Cancha 1',
      precio: 1200,
      cupo_maximo: 15,
      cantidad_anotados: 10
    },
    
  {
    id_actividad: 3,
    nombre: 'Fútbol Infantil',
    categoria: 'Infantil',
    dia: 'Lunes',
    horario: '18:00 - 19:00',
    lugar: 'Cancha 3',
    precio: 1200,
    cupo_maximo: 30,
    cantidad_anotados:20 
  },
  {
    id_actividad: 4,
    nombre: 'Básquet',
    categoria: 'Deporte de Equipo',
    dia: 'Jueves',
    horario: '18:00 - 19:00',
    lugar: 'Gimnasio 1',
    precio: 1500,
    cupo_maximo: 25,
    cantidad_anotados: 22
  },
  {
    id_actividad: 5,
    nombre: 'Natación',
    categoria: 'Deporte',
    dia: 'Miércoles',
    horario: '10:00 - 11:00',
    lugar: 'Pileta',
    precio: 2000,
    cupo_maximo: 30,
    cantidad_anotados: 30
  },
  {
    id_actividad: 6,
    nombre: 'Fútbol',
    categoria: 'Deporte Individual',
    dia: 'Viernes',
    horario: '19:00 - 20:00',
    lugar: 'Cancha 2',
    precio: 1600,
    cupo_maximo: 30,
    cantidad_anotados: 22
  },
  {
    id_actividad: 6,
    nombre: 'Vóley',
    categoria: 'Deporte de equipo',
    dia: 'Sábado',
    horario: '15:00 - 17:00',
    lugar: 'Gimnasio 2',
    precio: 1600,
    cupo_maximo: 20,
    cantidad_anotados: 17
  },
  {
    id_actividad: 7,
    nombre: 'Atletismo',
    categoria: 'Deporte Individual',
    dia: 'Lunes',
    horario: '10:00 - 12:00',
    lugar: 'Pista 1',
    precio: 1300,
    cupo_maximo: 25,
    cantidad_anotados: 16
  },
  {
    id_actividad: 8,
    nombre: 'Gimnasia Artística',
    categoria: 'Arte',
    dia: 'Martes',
    horario: '09:00 - 11:00',
    lugar: 'Gimnasio 3',
    precio: 1100,
    cupo_maximo: 15,
    cantidad_anotados: 14
  },
  {
    id_actividad: 9,
    nombre: 'Karate Infantil',
    categoria: 'Infantil',
    dia: 'Lunes',
    horario: '17:00 - 18:00',
    lugar: 'Gimnasio 1',
    precio: 1000,
    cupo_maximo: 15,
    cantidad_anotados: 11
  },
  {
    id_actividad: 10,
    nombre: 'Karate',
    categoria: 'Arte Marcial',
    dia: 'Miércoles',
    horario: '16:00 - 17:30',
    lugar: 'Gimnasio 3',
    precio: 1100,
    cupo_maximo: 20,
    cantidad_anotados: 8
  },
  {
    id_actividad: 11,
    nombre: 'Judo',
    categoria: 'Arte Marcial',
    dia: 'Viernes',
    horario: '15:00 - 16:30',
    lugar: 'Gimnasio 2',
    precio: 1100,
    cupo_maximo: 20,
    cantidad_anotados: 13
  },
  {
    id_actividad: 12,
    nombre: 'Judo Infantil',
    categoria: 'Infantil',
    dia: 'Martes',
    horario: '09:00 - 10:00',
    lugar: 'Gimnasio 2',
    precio: 1100,
    cupo_maximo: 15,
    cantidad_anotados: 9
  },
  {
    id_actividad: 13,
    nombre: 'Esgrima',
    categoria: 'Arte Marcial',
    dia: 'Miércoles',
    horario: '16:00 - 17:00',
    lugar: 'Gimnasio 1',
    precio: 2000,
    cupo_maximo: 15,
    cantidad_anotados: 15
  },
  {
    id_actividad: 14,
    nombre: 'Rugby',
    categoria: 'Deporte de equipo',
    dia: 'Lunes',
    horario: '16:00 - 17:30',
    lugar: 'Cancha 1',
    precio: 1900,
    cupo_maximo: 25,
    cantidad_anotados: 16
  },
  {
    id_actividad: 15,
    nombre: 'Hockey',
    categoria: 'Deporte en equipo',
    dia: 'Martes',
    horario: '17:00 - 19:30',
    lugar: 'Gimnasio 2',
    precio: 1110,
    cupo_maximo: 20,
    cantidad_anotados: 18
  },
  {
    id_actividad: 16,
    nombre: 'Handball',
    categoria: 'Deporte en equipo',
    dia: 'Viernes',
    horario: '09:00 - 10:00',
    lugar: 'Gimnasio 1',
    precio: 1000,
    cupo_maximo: 15,
    cantidad_anotados: 11
  },
  {
    id_actividad: 17,
    nombre: 'Handball infantil',
    categoria: 'Infantil',
    dia: 'Miércoles',
    horario: '16:00 - 17:00',
    lugar: 'Gimnasio 2',
    precio: 1000,
    cupo_maximo: 20,
    cantidad_anotados: 15
  },
  {
    id_actividad: 18,
    nombre: 'Mini Vóley',
    categoria: 'Infantil',
    dia: 'Sábado',
    horario: '9:00 - 10:30',
    lugar: 'Cancha 1',
    precio: 1400,
    cupo_maximo: 25,
    cantidad_anotados: 24
  },
  {
    id_actividad: 19,
    nombre: 'Gimnasia Infantil',
    categoria: 'Infantil',
    dia: 'Martes',
    horario: '16:30 - 18:30',
    lugar: 'Gimnasio 1',
    precio: 1110,
    cupo_maximo: 15,
    cantidad_anotados: 15
  },
    {
    id_actividad: 20,
    nombre: 'Mini Básquet',
    categoria: 'Infantil',
    dia: 'Sábado',
    horario: '17:00 - 18:30',
    lugar: 'Gimnasio 3',
    precio: 1210,
    cupo_maximo: 15,
    cantidad_anotados: 7
  }
  ];*/
  
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
    fechaNacimiento: profesor.fecha_nacimiento,
    direccion: profesor.direccion,
    telefono: profesor.telefono,
    especialidad: profesor.especialidad,
    actividades: profesor.actividades.map((a: any) => a.id_actividad),
    
  });

  this.editandoProfesorId = profesor.id_profesor;
  this.mostrarFormulario = true;
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
