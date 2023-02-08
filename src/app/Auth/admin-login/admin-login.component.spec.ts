import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { AdminLoginService } from "../service/admin-login.service";
import { AdminLoginComponent } from "./admin-login.component";


describe('AdminLoginComponent  ---Component', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;
  let service: AdminLoginService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLoginComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule],
      providers: [AdminLoginService, Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLoginComponent);
    service= TestBed.inject(AdminLoginService);
    router= TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(100).toBe(100);
  });
  it(' Admin Login form invalid - adminlogin() ', ()=>{
    component.loginform={
      valid: false,
      value:{
        username: 'abcd',
        password:'abcdpwd'
      }
    }
    component.adminlogin();
  })
  it('admin login true - adminlogin() ', ()=>{
    component.loginform={
      valid: true,
      value:{
        username: 'abcd',
        password:'abcdpwd'
      }
    }
    const obj={
      username: 'abcd',
      password: 'abcdpwd'
    }
    spyOn(router, 'navigate')
    
    spyOn(service, 'AdminLoginCheck').and.returnValue(of(obj))
    component.adminlogin();
    expect(service.AdminLoginCheck).toHaveBeenCalled();
    expect(component.notauthenticateduser).toBeFalsy();
    expect(service.setPersona).toBe('admin');
    expect(service.isLoggedIn).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledWith(['dashboard'])

  })
  it('admin login false unauthenticated - adminlogin() ', ()=>{
    component.loginform={
      valid: true,
      value:{
        username: 'abcd',
        password:'abcdpwd'
      }
    }
    const obj={
      username: 'abcd',
      password: 'abcdp'
    }
    spyOn(router, 'navigate')
    
    spyOn(service, 'AdminLoginCheck').and.returnValue(of(obj))
    component.adminlogin();
    expect(service.AdminLoginCheck).toHaveBeenCalled();
    expect(component.notauthenticateduser).toBeTruthy();

  })

  it(' User Login form invalid - userlogin() ', ()=>{
    component.loginform={
      valid: false,
      value:{
        username: 'abcd',
        password:'abcdpwd'
      }
    }
    component.userlogin();
  })
  it('user login true - userlogin() ', ()=>{
    component.loginform={
      valid: true,
      value:{
        username: 'abcd',
        password:'abcdpwd'
      }
    }
    const obj=[{
      username: 'abcd',
      password: 'abcdpwd'
    }]
    spyOn(router, 'navigate')
    
    spyOn(service, 'userLoginCheck').and.returnValue(of(obj))
    component.userlogin();
    expect(service.userLoginCheck).toHaveBeenCalled();
    expect(component.notauthenticateduser).toBeFalsy();
    expect(service.setPersona).toBe('user');
    expect(service.isLoggedIn).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledWith(['dashboard'])

  })


});