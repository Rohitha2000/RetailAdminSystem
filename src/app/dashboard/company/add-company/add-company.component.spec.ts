import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Company } from '../company.model';
import { CompanyService } from '../service/company.service';

import { AddCompanyComponent } from './add-company.component';

describe('AddCompanyComponent', () => {
  let component: AddCompanyComponent;
  let fixture: ComponentFixture<AddCompanyComponent>;
  let service: CompanyService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyComponent ],
      imports:[HttpClientTestingModule, HttpClientModule],
       providers:[Router, CompanyService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompanyComponent);
    service= TestBed.inject(CompanyService)
    router= TestBed.get(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCompanies()', ()=>{
    const cat:Company[]= [{
      company_id: '343',
      company_name: 'abcd',
      company_description: 'abcsde'
    },
    {
      company_id: '22',
      company_name: 'abcd',
      company_description: 'abcsde'
    }
  ]
    spyOn(service, 'getCompany').and.returnValue(of(cat));
    component.getCompanies();
    expect(component.companydata).toEqual(cat);
  })

  it('randomint', ()=>{
    const num= component.getRandomInt();
    expect(typeof num).toBe('number')
  })

it('Data Equal - checkCategory()', ()=>{
     
     component.companydata=[{
      company_id: 'C23',
      company_name: 'abcd',
      company_description: 'abcsde'
     }]
     const obj={
      company_id: '23',
      company_name: 'abcd',
      company_description: 'abcsde'
    }
    component.inputdata= obj;
     spyOn(component, 'getRandomInt').and.returnValue(23);
     component.checkCompanyID();
     expect(component.inputdata.company_id).toEqual('C23')


  })
   it('Data not Equal - checkCompanyID()', ()=>{
     
     component.companydata=[{
      company_id: '22',
      company_name: 'abcd',
      company_description: 'abcsde'
     }]
     const obj={
      company_id: '22',
      company_name: 'abcd',
      company_description: 'abcsde'
    }
    component.inputdata= obj;
     spyOn(component, 'getRandomInt').and.returnValue(33);
     component.checkCompanyID();
     expect(component.inputdata.company_id).toEqual('C33')


  })

  it('saveCompany',()=>{
    spyOn(component, 'getCompanies').and.callThrough;
    component.company_form={
      invalid: false,
      value:{
        
        company_name: 'ads',
      company_description: 'asdsds'
      }
    }
    const obj={
      company_id:'33',
      company_name: 'ads',
      company_description: 'asdsds'
    }
    component.inputdata= obj;
   spyOn(component, 'checkCompanyID').and.returnValue(-1)
   spyOn(router, 'navigate')
   spyOn(service, 'addCompany').and.returnValue(of({}));
   
    component.saveCompany();
    //expect(component.inputdata).toEqual(component.category_form)
    expect(service.addCompany).toHaveBeenCalled();
  })


  it('saveCompany',()=>{
    spyOn(service,'addCompany');

    spyOn(component, 'getCompanies').and.callThrough;
    component.company_form={
      invalid: true,
      value:{
        
        company_name: '',
      company_description: ''
      }
    }

    component.saveCompany();
    expect(service.addCompany).not.toHaveBeenCalled()
  });
  
});
