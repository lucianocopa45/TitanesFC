import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactoComponent } from './contact.component';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario debería ser inválido al inicio', () => {
    expect(component.mensajeForm.valid).toBeFalse();
  });

  it('debería marcar todos los campos como tocados si el formulario es inválido', () => {
    spyOn(window, 'alert');
    component.submit();
    expect(window.alert).toHaveBeenCalledWith('Revisá los campos obligatorios a completar.');
  });

  it('debería enviar el formulario si es válido', () => {
    spyOn(window, 'alert');
    spyOn(console, 'log');

    component.mensajeForm.setValue({
      nombre: 'Juan',
      apellido: 'Pérez',
      fechaNacimiento: '2000-01-01',
      correo: 'juan@example.com',
      telefono: '123456789',
      motivo: 'Consulta General',
      mensaje: 'Este es un mensaje válido.'
    });

    component.submit();

    expect(component.mensajeForm.valid).toBeTrue();
    expect(window.alert).toHaveBeenCalledWith('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto');
    expect(console.log).toHaveBeenCalled();
  });

  it('debería limpiar el formulario', () => {
    component.mensajeForm.patchValue({
      nombre: 'Test',
      apellido: 'Apellido'
    });

    component.LimpiarFormulario();

    expect(component.mensajeForm.value.nombre).toBeNull();
    expect(component.mensajeForm.value.apellido).toBeNull();
  });
});
