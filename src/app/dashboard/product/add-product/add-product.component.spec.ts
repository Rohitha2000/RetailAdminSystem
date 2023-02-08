import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { invalid } from 'moment';
import { of } from 'rxjs';
import { Category } from '../../category/category.model';
import { CategoryService } from '../../category/service/category.service';
import { CompanyService } from '../../company/service/company.service';
import { Product } from '../product.model';
import { ProductService } from '../service/product.service';

import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let catservice: CategoryService;
  let service: ProductService;
  let comservice: CompanyService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductComponent ],
      imports:[HttpClientTestingModule],
      providers:[ProductService, CategoryService, CompanyService, Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    catservice= TestBed.inject(CategoryService);
    comservice= TestBed.inject(CompanyService);
    service= TestBed.inject(ProductService);
    router= TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCompanynames()', ()=>{
    const obj=[{
      company_name: 'nestle',
      company_id:34
    },
  {
    company_name: 'lays',
    company_id: 99

  }]
    spyOn(comservice, 'getCompany').and.returnValue(of(obj))
    component.getCompanynames();
    const response:string[]= ['nestle', 'lays'];
    expect(comservice.getCompany).toHaveBeenCalled();
    expect(component.companies).toEqual(response)
  })

  it('Product Types()', ()=>{
    const obj=[{
      category_name: 'biscuits',
      category_id:34
    },
  {
    category_name: 'chips',
    category_id: 99

  }]
  const response:string[]= ['biscuits', 'chips']
    spyOn(catservice, 'getCategory').and.returnValue(of(obj));
    component.getProductTypes();
    expect(catservice.getCategory).toHaveBeenCalled();
    
    expect(component.product_category).toEqual(response)

  })

  it('invalid form',()=>{
    component.product_form={
      invalid: true
    }
    spyOn(service, 'addProduct');
    component.saveProduct();
    expect(service.addProduct).not.toHaveBeenCalled();
    expect(component.submitted).toBeTruthy();
  })
  it('saveProduct()', ()=>{
    const date= new Date();
    const data:Product={
      "product_type": "chocolate",
      "product_code": "M90003",
      "product_name": "fivestar",
      "product_totalstock": 0,
      "company_name": "Nestle",
      "product_costperitem": 10,
      "product_manufacturedate": date,
      "product_expirydate": date,
      "product_description": "five star chocolate"
    }
    component.product_form={
      invalid: false,
      value: data
    }
    spyOn(router, 'navigate');
    spyOn(service, 'addProduct').and.returnValue(of(data))
    
    component.saveProduct();
    expect(component.submitted).toBeTruthy();
    expect(service.addProduct).toHaveBeenCalledWith(data);
    expect(router.navigate).toHaveBeenCalledWith(['dashboard/product-report'])
  })
});
