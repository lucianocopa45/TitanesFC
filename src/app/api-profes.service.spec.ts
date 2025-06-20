import { TestBed } from '@angular/core/testing';

import { ApiProfesService } from './api-profes.service';

describe('ApiProfesService', () => {
  let service: ApiProfesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProfesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
