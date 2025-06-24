import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioLayoutComponent } from './socio-layout.component';

describe('SocioLayoutComponent', () => {
  let component: SocioLayoutComponent;
  let fixture: ComponentFixture<SocioLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocioLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocioLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
