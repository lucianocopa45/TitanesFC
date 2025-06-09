import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosociosComponent } from './registrosocios.component';

describe('RegistrosociosComponent', () => {
  let component: RegistrosociosComponent;
  let fixture: ComponentFixture<RegistrosociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosociosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrosociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
