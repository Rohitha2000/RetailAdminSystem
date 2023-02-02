
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AdminLoginService } from '../service/admin-login.service';
import { RoleGuard } from './role.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoleGuard', () => {
  let guard: RoleGuard;

  let service:AdminLoginService;
  //let router:Router;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      
      providers: [RoleGuard, AdminLoginService, HttpClientTestingModule, {provide: Router, useValue: router}],
      
    });
    guard = TestBed.inject(RoleGuard);
    service= TestBed.inject(AdminLoginService);
    //router= TestBed.inject(Router);
    
  });

  it('should return true if user role matches the expected role', () => {
    
    service.setPersona= 'admin';
    let act:any= { data: { role: ['admin', 'user'] } };
    
    
    
    expect(guard.canActivate(act)).toBeTruthy();
  });




  it('should return false if user role does not match the expected role', () => {
    service.setPersona = 'user';
    const expectedRole = ['admin'];
    const route = { data: { role: expectedRole } };
    
    //const spy= spyOn(router, 'navigate');
    
    
    expect(guard.canActivate(route)).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});