import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Mensaje } from './mensaje.model';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactoComponent {

  mensajeForm: FormGroup;
  motivos: string[] = [];
  
  
  constructor(private fb: FormBuilder) {
    this.mensajeForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$'), Validators.minLength(1), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$'), Validators.minLength(1), Validators.maxLength(50)]],
      fechaNacimiento: ['', Validators.required],
      correo:  ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      motivo: [[], Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.motivos = [
      'Consulta General',
      'Fútbol',
      'Básquet',
      'Natación',
      'Handball',
      'Gimnasio',
      'Ajedrez',
      'Rugby',
      'Gimnasia artística',
      'Karate',
      'Judo',
      'Atletismo',
      'Tenis',
      'Vóley',
      'Nivel inicial (niños)',
      'Coach deportivo',
      'Reclamos'
    ]};

  submit() {
    this.mensajeForm.markAllAsTouched();

    if (this.mensajeForm.valid) {

      const msj = new Mensaje(
        this.mensajeForm.get('nombre')?.value,
        this.mensajeForm.get('apellido')?.value,
        this.mensajeForm.get('fechaNacimiento')?.value,
        this.mensajeForm.get('correo')?.value,
        this.mensajeForm.get('telefono')?.value,
        this.mensajeForm.get('motivo')?.value,
        this.mensajeForm.get('mensaje')?.value
      );


      console.log(msj);

      alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto');
      
      this.LimpiarFormulario();
    } else {
      alert('Revisá los campos obligatorios a completar.');
    }
  }


  LimpiarFormulario() {
    this.mensajeForm.reset();}
}
