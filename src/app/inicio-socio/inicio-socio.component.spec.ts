import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSocioComponent } from './inicio-socio.component';

describe('InicioSocioComponent', () => {
  let component: InicioSocioComponent;
  let fixture: ComponentFixture<InicioSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioSocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
