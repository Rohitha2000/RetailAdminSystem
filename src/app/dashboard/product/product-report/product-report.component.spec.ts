import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductService } from '../service/product.service';

import { ProductReportComponent } from './product-report.component';

describe('ProductReportComponent', () => {
  let component: ProductReportComponent;
  let fixture: ComponentFixture<ProductReportComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductReportComponent ],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers:[ProductService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductReportComponent);
    service= TestBed.inject(ProductService)
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
    component.deleteProduct(1);
    expect(component.fetchdata).toHaveBeenCalled();
    expect(service.delete).toHaveBeenCalledWith(1);
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
    
    spyOn(service, 'getProducts').and.returnValue(of(obj));
   
    component.fetchdata();
    expect(service.getProducts).toHaveBeenCalled();
    expect(obj).toEqual(component.dataSource);
  })
});
