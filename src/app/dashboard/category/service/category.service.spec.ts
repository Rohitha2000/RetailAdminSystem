import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../category.model';
import { HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CategoryService ]
    });
    service = TestBed.inject(CategoryService);
    httpMock= TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checking API call for - addCategory()', ()=>{
    let cat: Category={
    category_id: '233',
    category_description:'bakery category',
    category_name:'bakery'};
    const response: any= [{ id: 1, category_id: '233', category_name: 'bakery', category_description: 'bakery category' }];
    
    service.addCategory(cat).subscribe((res)=>{   
      expect(res).toEqual(response);
    });
  const req = httpMock.expectOne({ method:'POST', url: `http://localhost:3000/category`});
    expect(req.request.body).toEqual(cat);
    req.flush(response)
   

});

it('should get data from the API - getCategory()', () => {
  const category = { id: 1, category_id: '233', category_name: 'bakery', category_description: 'bakery category' };

  service.getCategory().subscribe(data => {
    expect(data).toEqual(category);
  });

  const req = httpMock.expectOne(`http://localhost:3000/category`);
  expect(req.request.method).toBe('GET');
  req.flush(category);
});

it('should delete a category successfully - delete()', () => {
  const id = 1;

  service.delete(id).subscribe();

  const req = httpMock.expectOne((request: HttpRequest<any>) => {
    return request.method === 'DELETE'
      && request.url === `http://localhost:3000/category/${id}`;
  });

  req.flush({});
});

it('should update a category successfully - update()', () => {
  const id = 1;
  const category: Category = { category_id: '233', category_name: 'bakery', category_description: 'bakery category' };
    
  service.update(id, category).subscribe();

  const req = httpMock.expectOne((request: HttpRequest<any>) => {
    return request.method === 'PUT'
      && request.url === `http://localhost:3000/category/${id}`
      && request.body === category;
  });

  req.flush({});
});


});


