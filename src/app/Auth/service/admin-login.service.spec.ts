import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminLoginService } from './admin-login.service';



describe('AdminLoginService', () => {
  let service: AdminLoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AdminLoginService ]
    });
    service = TestBed.inject(AdminLoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data from the API - AdminLoginCheck()', () => {
    const dummyData = [{ username: 'rohitha', password: 'abc123' }];

    service.AdminLoginCheck().subscribe(data => {
      expect(localStorage.getItem('token')).toEqual('Ad89191034');
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`http://localhost:3000/admin`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
  
  it('should get data from the API - userLoginCheck()', () => {
    const dummyData = [{ username: 'rohi', password: 'abcde' }];

    service.userLoginCheck().subscribe(data => {
      expect(localStorage.getItem('token')).toEqual('Ur90098808');
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`http://localhost:3000/user`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should set the value of isLoggedIn correctly - setLoggedIn()', () => {
    service.setLoggedIn(true);
    expect(service.isLoggedIn).toBe(true);

    service.setLoggedIn(false);
    expect(service.isLoggedIn).toBe(false);
  });

  it('should return the value of isLoggedIn correctly - isUserLoggedIn()', () => {
    service.isLoggedIn = true;
    expect(service.isUserLoggedIn).toBe(true);

    service.isLoggedIn = false;
    expect(service.isUserLoggedIn).toBe(false);
  });

});
