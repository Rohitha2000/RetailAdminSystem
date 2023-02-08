import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AdminLoginService } from '../Auth/service/admin-login.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: AdminLoginService;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatMenuModule, HttpClientTestingModule],
      declarations: [ DashboardComponent ],
      providers:[AdminLoginService, Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service= TestBed.inject(AdminLoginService)
    router= TestBed.inject(Router)
    fixture.detectChanges();
  });
  it('should ', () => {

    expect(component).toBeTruthy();
  });
  it('Admin Login', () => {
   
   service.setPersona='admin'
    component.logincheck();
    expect(component.startSellorBuy_dashboard).toEqual('Start Sell')
  });
  it('User Login', () => {
   
    service.setPersona='user'
   
     component.logincheck();
     expect(component.startSellorBuy_dashboard).toEqual('Start Buy')
   });

   it('logout', ()=>{
    spyOn(localStorage, 'clear');
    spyOn(router, 'navigate')
    component.logout();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/'])
   })
});

