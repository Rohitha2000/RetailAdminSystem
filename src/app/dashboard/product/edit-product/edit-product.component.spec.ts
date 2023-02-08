import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CategoryService } from '../../category/service/category.service';
import { CompanyService } from '../../company/service/company.service';
import { ProductService } from '../service/product.service';

import { EditProductComponent } from './edit-product.component';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let catservice: CategoryService;
  let service: ProductService;
  let comservice: CompanyService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[ProductService, CategoryService, CompanyService, Router,{ provide: ActivatedRoute,  
        useValue:
        { snapshot: { 
          paramMap: convertToParamMap( { 'pid': '23' } ) }}
     }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
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
  });

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

  it('fetchProduct()', ()=>{
    const obj=[{
        id: 23,
        product_name: 'dsd'
    }]
    spyOn(service, 'getProducts').and.returnValue(of(obj))
    
    component.fetchProduct();
    expect(service.getProducts).toHaveBeenCalled();
  
    expect(component.fetched_data).toEqual(obj[0])
  })

  it('update Product invalid form ', ()=>{
    component.product_form={
      invalid:true
    }
    component.fetched_data={
      id: 23,
      product_name: 'dsd'
  }
  spyOn(router, 'navigate');
  spyOn(service, 'update')
  component.updateProduct();
  expect(router.navigate).not.toHaveBeenCalled();
  expect(service.update).not.toHaveBeenCalled();
  })

  it('updateProduct()', ()=>{
    component.product_form={
      invalid:false
    }
    component.fetched_data={
      id: 23,
      product_name: 'dsd'
  }
  spyOn(router, 'navigate');
  spyOn(service, 'update').and.returnValue(of(component.fetched_data))
  component.updateProduct();
  expect(service.update).toHaveBeenCalledWith( component.fetched_data.id, component.fetched_data);
  expect(router.navigate).toHaveBeenCalledWith(['dashboard/product-report'])

  })
});
