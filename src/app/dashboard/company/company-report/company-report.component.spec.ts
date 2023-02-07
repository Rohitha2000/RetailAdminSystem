import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { CompanyService } from '../service/company.service';

import { CompanyReportComponent } from './company-report.component';

describe('CompanyReportComponent', () => {
  let component: CompanyReportComponent;
  let fixture: ComponentFixture<CompanyReportComponent>;
  let service: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyReportComponent ],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [CompanyService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyReportComponent);
    service= TestBed.inject(CompanyService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete Company - deleteCompany()', ()=>{
    const obj= [{
      "id": 1,
      "company_name": "biscuit",
      "company_description": "biscuit category",
      "company_id": "23"
    },
    {
      "id": 23,
      "company_name": "chocolate",
      "company_description": "Dairy Category",
      "company_id": "300"
    }];
    spyOn(component,'fetchdata').and.callThrough();
    spyOn(service, 'delete').and.returnValue(of(null));
    component.dataSource= obj;
    component.deleteCompany('300');
    expect(component.fetchdata).toHaveBeenCalled();
    expect(service.delete).toHaveBeenCalledWith(23);
  })

  it('Fetch data ', ()=>{
    const obj= [{
      "id": 1,
      "company_name": "biscuit",
      "company_description": "biscuit category",
      "company_id": "23"
    },
    {
      "id": 23,
      "company_name": "chocolate",
      "company_description": "Dairy Category",
      "company_id": "300"
    }];
    
    spyOn(service, 'getCompany').and.returnValue(of(obj));
   
    component.fetchdata();
    expect(service.getCompany).toHaveBeenCalled();
    expect(obj).toEqual(component.dataSource);
  })
});
