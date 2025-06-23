import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SociosService } from '../service/socios.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-socios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit {
  step = 1;

  personalForm: FormGroup;
  userForm: FormGroup;
  editForm: FormGroup;

  socios: any[] = [];
  editandoSocioId: number | null = null;

  categorias: any[] = [];
  actividades: any[] = [];

  constructor(private fb: FormBuilder, private sociosService: SociosService) {
    this.personalForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      categoria: [null, Validators.required], // Se espera un objeto Categoria
      actividades: [[], Validators.required] // Se espera un array de objetos Actividad
    });

    this.userForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required]
    });


    this.editForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      categoria: [null, Validators.required], // Se espera un objeto Categoria
      actividades: [[]] // Se espera un array de nombres de actividades (para el envío al backend)
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarActividades();
    this.cargarSocios();
  }

  // Validador personalizado para contraseñas
  matchPasswordsValidator() {
    return (group: FormGroup) => {
      const pass = group.get('contrasena')?.value;
      const confirm = group.get('confirmarContrasena')?.value;
      return pass === confirm ? null : { mismatch: true };
    };
  }

  cargarCategorias(): void {
    this.sociosService.getCategorias().subscribe({
      next: (res: any[]) => {
        this.categorias = res;
        console.log('Categorías cargadas:', this.categorias);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar categorías:', err);
        alert('Error al cargar categorías.');
      }
    });
  }

  cargarActividades(): void {
    this.sociosService.getActividades().subscribe({
      next: (res: any[]) => {
        this.actividades = res;
        console.log('Actividades cargadas:', this.actividades);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar actividades:', err);
        alert('Error al cargar actividades.');
      }
    });
  }

  cargarSocios(): void {
    this.sociosService.getSocios().subscribe({
      next: (res: any[]) => {
        // Mapear la respuesta del backend para que coincida con la estructura esperada por el frontend
        this.socios = res.map((socioApi: any) => ({
          id: socioApi.id, // backend ahora devuelve 'id' directamente
          nombre: socioApi.nombre,
          apellido: socioApi.apellido,
          dni: socioApi.dni,
          fechaNacimiento: socioApi.fechaNacimiento, // backend ahora devuelve 'fechaNacimiento' camelCase
          direccion: socioApi.direccion,
          telefono: socioApi.telefono,
          email: socioApi.email,
          categoria: socioApi.categoria, // backend ahora devuelve 'categoria' como objeto
          actividades: socioApi.actividades, // backend ahora devuelve 'actividades' como array de objetos
          estado: socioApi.estado // backend ahora devuelve 'estado' camelCase
        }));
        console.log('Socios cargados:', this.socios);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar socios:', err);
        alert('Error al cargar socios.');
      }
    });
  }



  nextStep() {
    if (this.personalForm.valid) {
      this.step = 2;
    } else {
      this.personalForm.markAllAsTouched();
      alert('Por favor, completá todos los campos requeridos del Paso 1.');
    }
  }

  prevStep() {
    this.step = 1;
  }

  // --- Operaciones CRUD (conectadas a la API) ---
  submit(): void {
    // Validar ambos formularios y el validador de grupo de contraseñas
    if (this.personalForm.invalid || this.userForm.invalid) { // Ya no necesitamos matchPasswords() aquí
      this.personalForm.markAllAsTouched();
      this.userForm.markAllAsTouched();
      alert('Revisa los campos y asegúrate de que las contraseñas coincidan.');
      return;
    }

    const personalData = this.personalForm.value;
    const userData = this.userForm.value;

    const socioParaCrear = {
      nombre: personalData.nombre,
      apellido: personalData.apellido,
      dni: personalData.dni,
      fecha_nacimiento: this.formatearFechaParaBD(personalData.fechaNacimiento),
      direccion: personalData.direccion,
      telefono: personalData.telefono,
      categoria: personalData.categoria.nombre, // Enviar solo el nombre de la categoría
      actividades: personalData.actividades.map((act: any) => act.nombre), // Enviar solo los nombres de las actividades
      email: userData.correo,
      contrasena: userData.contrasena
    };

    this.sociosService.crearSocio(socioParaCrear).subscribe({
      next: (res: any) => {
        alert('¡Registro de socio exitoso!');
        this.personalForm.reset();
        this.userForm.reset();
        this.step = 1;
        this.cargarSocios();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al registrar socio:', err);
        alert(`Error al registrar socio: ${err.error?.mensaje || 'Error desconocido'}.`);
      }
    });
  }

  eliminarSocio(id: number): void {
    const confirmado = confirm('¿Estás seguro de eliminar este socio? Esta acción es irreversible.');
    if (confirmado) {
      this.sociosService.eliminarSocio(id).subscribe({
        next: (res: any) => {
          alert('Socio eliminado correctamente.');
          this.cargarSocios();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al eliminar socio:', err);
          alert(`Error al eliminar socio: ${err.error?.mensaje || 'Error desconocido'}.`);
        }
      });
    }
  }

  editarSocio(socio: any): void {
    this.editandoSocioId = socio.id;

    const categoriaSeleccionada = this.categorias.find(cat => cat.nombre === socio.categoria?.nombre);

    const actividadesNombres = socio.actividades.map((act: any) => act.nombre);

    this.editForm.patchValue({
      nombre: socio.nombre,
      apellido: socio.apellido,
      dni: socio.dni,
      fechaNacimiento: this.formatearFechaParaInput(socio.fechaNacimiento),
      direccion: socio.direccion,
      telefono: socio.telefono,
      categoria: categoriaSeleccionada, 
      actividades: actividadesNombres 
    });
  }

  guardarEdicion(): void {
    if (this.editForm.invalid || this.editandoSocioId === null) {
      this.editForm.markAllAsTouched();
      alert('Por favor, completa todos los campos requeridos del formulario de edición.');
      return;
    }

    const dataEditada = this.editForm.value;

    const socioActualizado = {
      nombre: dataEditada.nombre,
      apellido: dataEditada.apellido,
      dni: dataEditada.dni,
      fecha_nacimiento: this.formatearFechaParaBD(dataEditada.fechaNacimiento),
      direccion: dataEditada.direccion,
      telefono: dataEditada.telefono,
      categoria: dataEditada.categoria.nombre, 
      actividades: dataEditada.actividades 
    };

    this.sociosService.actualizarSocio(this.editandoSocioId, socioActualizado).subscribe({
      next: (res: any) => {
        alert('Datos personales del socio actualizados correctamente.');
        this.cancelarEdicion();
        this.cargarSocios();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al actualizar socio:', err);
        alert(`Error al actualizar socio: ${err.error?.mensaje || 'Error desconocido'}.`);
      }
    });
  }

  cancelarEdicion(): void {
    this.editandoSocioId = null;
    this.editForm.reset();
  }

  // --- Funciones Auxiliares para la Vista ---
  getCostoActividades(socio: any): number {
    return socio.actividades?.reduce((total: number, act: any) => total + (act.precio || 0), 0) || 0;
  }

  getSelectedActivityNames(socio: any): string {
    return socio.actividades?.map((act: any) => act.nombre).join(', ') || 'Ninguna';
  }

  getCostoTotal(socio: any): number {
    // Asegurarse de que 'socio.categoria' y 'socio.categoria.costo' existan
    const costoCategoria = socio.categoria?.costo || 0;
    const costoActividades = this.getCostoActividades(socio);
    return costoCategoria + costoActividades;
  }

  formatearFechaParaInput(fecha: any): string | null {
    if (!fecha) return null;
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return null;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatearFechaParaBD(fecha: any): string | null {
    if (!fecha) return null;
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return null;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
