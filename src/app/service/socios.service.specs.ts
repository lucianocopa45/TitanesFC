import { TestBed } from '@angular/core/testing';
import { SociosService } from './socios.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('SociosService', () => {
let service: SociosService;
//let httpTestingController: HttpTestingController;

// beforeEach(() => {
//     TestBed.configureTestingModule({
//     imports: [HttpClientTestingModule],
//     providers: [SociosService]
//     });
//     service = TestBed.inject(SociosService);
//     httpTestingController = TestBed.inject(HttpTestingController);
// });

beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SociosService);
});

// afterEach(() => {
//     httpTestingController.verify(); // Verifica que no haya peticiones pendientes
// });

it('should be created', () => {
    expect(service).toBeTruthy();
});

  // Puedes añadir más pruebas aquí para cada método del servicio, por ejemplo:
// it('should retrieve socios from the API', () => {
//     const dummySocios = [{ id: 1, nombre: 'Test Socio' }];
//     service.getSocios().subscribe(socios => {
//     expect(socios).toEqual(dummySocios);
//     });

//     const req = httpTestingController.expectOne('http://localhost:3000/api/socios');
//     expect(req.request.method).toBe('GET');
//     req.flush(dummySocios);
// });
// });
})