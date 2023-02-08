import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Company } from '../company.model';
import { CompanyService } from '../service/company.service';

import { EditCompanyComponent } from './edit-company.component';

describe('EditCompanyComponent', () => {
  let component: EditCompanyComponent;
  let fixture: ComponentFixture<EditCompanyComponent>;
  let service: CompanyService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[CompanyService, Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCompanyComponent);
    service= TestBed.inject(CompanyService);
    router= TestBed.get(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('fetchCompany', ()=>{
    const cat= [{
      company_id: '23',
      company_name: 'abcs',
      company_description: 'adsds'
    }]
    spyOn(service, 'getCompany').and.returnValue(of(cat))
    component.id= '23';
    component.fetchCompany();
    expect
    (service.getCompany).toHaveBeenCalled();
  })

  it('update form invalid', ()=>{
    spyOn(service, 'update');
    component.update_form=
      {
        invalid: true
      }
    
    component.updateCompany();
    expect(service.update).not.toHaveBeenCalled();
  })

  it('Update Company', ()=>{
    spyOn(router, 'navigate');
    spyOn(service, 'update').and.returnValue(of({}));
    component.update_form=
      {
        invalid: false
      }
      component.fetched_data= {
        id: 2,
        company_id: '23',
        company_name: 'abcs',
        company_description: 'adsds'
      }
      
    component.updateCompany();
    expect(service.update).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/company-report']);
  })
});
