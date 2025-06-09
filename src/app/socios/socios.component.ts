import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-socios',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent {
  step = 1;

  personalForm: FormGroup;
  userForm: FormGroup;
  editForm: FormGroup;

  socios: any[] = [];
  editandoSocioId: number | null = null;

categorias = [
  { nombre: 'Activo', costo: 5000 },
  { nombre: 'Adherente', costo: 3000 },
  { nombre: 'Cadete', costo: 2000 },
  { nombre: 'Vitalicio', costo: 0 }
];

actividades = [
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
    id_actividad: 7,
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
    id_actividad: 8,
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
    id_actividad: 9,
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
    id_actividad: 10,
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
    id_actividad: 11,
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
    id_actividad: 12,
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
    id_actividad: 13,
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
    id_actividad: 14,
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
    id_actividad: 15,
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
    id_actividad: 16,
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
    id_actividad: 17,
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
    id_actividad: 18,
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
    id_actividad: 19,
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
    id_actividad: 20,
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
    id_actividad: 21,
    nombre: 'Mini Básquet',
    categoria: 'Infantil',
    dia: 'Sábado',
    horario: '17:00 - 18:30',
    lugar: 'Gimnasio 3',
    precio: 1210,
    cupo_maximo: 15,
    cantidad_anotados: 7
  }
  ];

// getCostoTotal(idsActividades: number[]): number {
//   let total = 0;
//   if (idsActividades && idsActividades.length > 0) {
//     idsActividades.forEach(id => {
//       const actividad = this.actividades.find(act => act.id_actividad === id);
//       if (actividad) {
//         total += actividad.precio;
//       }
//     });
//   }
//   return total;
// }

getCostoTotal(socio: any): number {
  const costoCategoria = socio.categoria?.costo || 0;
  const costoActividades = socio.actividades?.reduce((total: number, act: any) => total + (act.costo || 0), 0) || 0;
  return costoCategoria + costoActividades;
}

  

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      categoria: [null, Validators.required],
      actividades: [[], Validators.required]
    });

    this.userForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  // Validación de coincidencia de contraseñas
  matchPasswords(): boolean {
    const pass = this.userForm.get('contrasena')?.value;
    const confirm = this.userForm.get('confirmarContrasena')?.value;
    return pass === confirm;
  }

  nextStep() {
    if (this.personalForm.valid) {
      this.step = 2;
    } else {
      this.personalForm.markAllAsTouched();
    }
  }

  prevStep() {
    this.step = 1;
  }

  submit() {
  if (this.personalForm.invalid || this.userForm.invalid || !this.matchPasswords()) {
    return;
  }


  const nuevoSocio = {
    id: this.socios.length + 1,
    ...this.personalForm.value,
    ...this.userForm.value,
    categoria: this.personalForm.value.categoria, 
    actividades: this.personalForm.value.actividades.map((a: any) => Number(a)) 
  };

    this.socios.push(nuevoSocio);
    this.personalForm.reset();
    this.userForm.reset();
    this.step = 1;
  }

  editarSocio(socio: any) {
    this.editandoSocioId = socio.id;
    this.editForm.setValue({
      nombre: socio.nombre,
      apellido: socio.apellido,
      dni: socio.dni,
      fechaNacimiento: socio.fechaNacimiento,
      direccion: socio.direccion,
      telefono: socio.telefono,
      categoria: socio.categoria,
    });
  }

  guardarEdicion() {
    if (this.editForm.valid && this.editandoSocioId !== null) {
      const index = this.socios.findIndex(s => s.id === this.editandoSocioId);
      if (index !== -1) {
        this.socios[index] = { ...this.socios[index], ...this.editForm.value };
        this.editandoSocioId = null;
        this.editForm.reset();
      }
    }
  }

  cancelarEdicion() {
    this.editandoSocioId = null;
    this.editForm.reset();
  }

  eliminarSocio(id: number) {
    this.socios = this.socios.filter(s => s.id !== id);
  }
}
