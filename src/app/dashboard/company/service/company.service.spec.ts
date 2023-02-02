import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CategoryService } from '../../category/service/category.service';
import { Company } from '../company.model';

import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CompanyService ]
    });
    service = TestBed.inject(CompanyService);
    httpMock= TestBed.inject(HttpTestingController);
  });
  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check API call - addCompany()',()=>{
    const comp= {
      company_id: '444',
      company_name: 'bingo',
      company_description: 'bingo company'
    };
    const result= {
      id: 3,
      company_id: '444',
      company_name: 'bingo',
      company_description: 'bingo company'
    };
     service.addCompany(comp).subscribe((res)=>{
      expect(res).toEqual(result);
     })
     const req = httpMock.expectOne({ method:'POST', url: `http://localhost:3000/company`});
    expect(req.request.body).toEqual(comp);
    req.flush(result)

  });

  it('should get data from the API - getCompany()', () => {
    const result= {
      id: 3,
      company_id: '444',
      company_name: 'bingo',
      company_description: 'bingo company'
    };
    service.getCompany().subscribe(data => {
      expect(data).toEqual(result);
    });
  
    const req = httpMock.expectOne(`http://localhost:3000/company`);
    expect(req.request.method).toBe('GET');
    req.flush(result);
  });


  it('should delete a category successfully - delete()', () => {
    const id = 1;
  
    service.delete(id).subscribe();
  
    const req = httpMock.expectOne((request: HttpRequest<any>) => {
      return request.method === 'DELETE'
        && request.url === `http://localhost:3000/company/${id}`;
    });
  
    req.flush({});
  });

  it('should update a category successfully - update()', () => {
    const id = 1;
    const comp= {
      company_id: '444',
      company_name: 'bingo',
      company_description: 'bingo company'
    };  
    service.update(id, comp).subscribe();
  
    const req = httpMock.expectOne((request: HttpRequest<any>) => {
      return request.method === 'PUT'
        && request.url === `http://localhost:3000/company/${id}`
        && request.body === comp;
    });
  
    req.flush({});
  });

});
