import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { RegistroProfesoresComponent } from './registroprofesores.component';

describe('ProfesorComponent', () => {
  let component: RegistroProfesoresComponent;
  let fixture: ComponentFixture<RegistroProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroProfesoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});