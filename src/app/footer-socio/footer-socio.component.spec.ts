import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSocioComponent } from './footer-socio.component';

describe('FooterSocioComponent', () => {
  let component: FooterSocioComponent;
  let fixture: ComponentFixture<FooterSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
