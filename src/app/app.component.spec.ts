import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AdminLoginService } from './Auth/service/admin-login.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let spyservice={
    setLoggedIn: jasmine.createSpy('setLoggedIn'),
    setPersona: jasmine.createSpy('setPersona')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ AppComponent ],
      providers: [ {provide: AdminLoginService, useValue: spyservice} ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
 
  });

  it('should set isLoggedIn to true when token is present in localStorage - Admin', () => {
   
    
    localStorage.setItem('token', 'Ad89191034');
    component.ngOnInit();
    expect(component.isLoggedIn).toBe(true);
    expect(spyservice.setLoggedIn).toHaveBeenCalledWith(true);
    expect(spyservice.setPersona).toEqual('admin');
  });


  it('should set isLoggedIn to true when token is present in localStorage - User', () => {
    localStorage.setItem('token', 'Ud2434545');
    component.ngOnInit();
    expect(component.isLoggedIn).toBe(true);
    expect(spyservice.setLoggedIn).toHaveBeenCalledWith(true);
    expect(spyservice.setPersona).toEqual('user');
   
  });
  
});
