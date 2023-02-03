import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { async, of, throwError } from 'rxjs';
import { CategoryService } from '../service/category.service';
import { CategoryReportComponent } from './category-report.component';




describe('CategoryReport', () => {
  let component: CategoryReportComponent;
  let fixture: ComponentFixture<CategoryReportComponent>;
  let httpClient: HttpClient;
  let catservice:CategoryService;
  let service = {
    delete: jasmine.createSpy('delete')
  }

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [CategoryReportComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [HttpClient, CategoryService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryReportComponent);
    component = fixture.componentInstance;
    catservice= TestBed.inject(CategoryService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should fetch data from the server', fakeAsync(() => {
    let data = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }];
    let spy = spyOn(httpClient, 'get').and.returnValue(of(data));
    component.fetchdata();
    tick();
    fixture.detectChanges();
    

    expect(component.dataSource).toEqual(data);
    expect(spy).toHaveBeenCalledWith('http://localhost:3000/category');
  }));

  it('should handle errors when fetching data', fakeAsync(() => {
    let spy = spyOn(httpClient, 'get').and.returnValue(throwError('Error'));
    let logSpy = spyOn(console, 'log');
    component.fetchdata();
   tick();
    fixture.detectChanges();
    expect(component.dataSource)?.toEqual(undefined);
    expect(logSpy).toHaveBeenCalledWith('error occuredError');
    expect(spy).toHaveBeenCalledWith('http://localhost:3000/category');
  }));


  it('call delete category', fakeAsync(()=>{
    
    
   const obj= [{
    "id": 1,
    "category_name": "biscuit",
    "category_description": "biscuit category",
    "category_id": "23"
  },
  {
    "id": 23,
    "category_name": "chocolate",
    "category_description": "Dairy Category",
    "category_id": "300"
  }];
    spyOn(component,'fetchdata').and.callThrough();
    spyOn(catservice, 'delete').and.returnValue(of(null));
    component.dataSource= obj;
    component.deleteCategory('23');
    tick();
    expect(component.fetchdata).toHaveBeenCalled();
    expect(catservice.delete).toHaveBeenCalledWith(1);
  }))
  

});