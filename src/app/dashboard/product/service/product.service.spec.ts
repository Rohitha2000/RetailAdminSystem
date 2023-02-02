import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock= TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(()=>{
    httpMock.verify()
  });

  it('post API call - addProduct()', ()=>{
    const date= new Date();
    const prod= {
      "id": 3434,
      "product_type": "chocolate",
      "product_code": "M90003",
      "product_name": "fivestar",
      "product_totalstock": 14,
      "company_name": "Nestle",
      "product_costperitem": 10,
      "product_manufacturedate": date,
      "product_expirydate": date,
      "product_description": "five star chocolate",
    };
    

    service.addProduct(prod).subscribe((res)=>{
      expect(res).toEqual(prod);
     })
     const req = httpMock.expectOne({ method:'POST', url: `http://localhost:3000/product`});
    expect(req.request.body).toEqual(prod);
    req.flush(prod)
  });

  it('get API call - getProducts()', ()=>{
    const date= new Date();
    const prod={
    "id": 3434,
    "product_type": "chocolate",
    "product_code": "M90003",
    "product_name": "fivestar",
    "product_totalstock": 14,
    "company_name": "Nestle",
    "product_costperitem": 10,
    "product_manufacturedate": date,
    "product_expirydate": date,
    "product_description": "five star chocolate",
  };
  service.getProducts().subscribe((res)=>{
    expect(res).toEqual(prod);

  });

  const req= httpMock.expectOne('http://localhost:3000/product');
  expect(req.request.method).toBe('GET')
  req.flush(prod);
  });

  
  it('should delete a category successfully - delete()', () => {
    const id = 1;
  
    service.delete(id).subscribe();
  
    const req = httpMock.expectOne((request: HttpRequest<any>) => {
      return request.method === 'DELETE'
        && request.url === `http://localhost:3000/product/${id}`;
    });
  
    req.flush({});
  });

  it('should update a category successfully - update()', () => {
    const id = 1;
    const date= new Date();
    const prod={
    "id": 3434,
    "product_type": "chocolate",
    "product_code": "M90003",
    "product_name": "fivestar",
    "product_totalstock": 14,
    "company_name": "Nestle",
    "product_costperitem": 10,
    "product_manufacturedate": date,
    "product_expirydate": date,
    "product_description": "five star chocolate",
  };
    service.update(id, prod).subscribe();
  
    const req = httpMock.expectOne((request: HttpRequest<any>) => {
      return request.method === 'PUT'
        && request.url === `http://localhost:3000/company/${id}`
        && request.body === prod;
    });
  
    req.flush({});
  });
});
