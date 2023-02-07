import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Category } from '../category.model';
import { CategoryService } from '../service/category.service';
 import { AddCategoryComponent } from './add-category.component';

 describe('AddCategoryComponent', () => {
   let component: AddCategoryComponent;
   let fixture: ComponentFixture<AddCategoryComponent>;
   let service: CategoryService;
   let httpClient: HttpClient;
   let httpTestingController: HttpTestingController;
   let router: Router;
   beforeEach(async () => {
   
    
     await TestBed.configureTestingModule({
       declarations: [ AddCategoryComponent ],
       imports:[HttpClientTestingModule, HttpClientModule],
       providers:[Router]
     })
     .compileComponents();

     fixture = TestBed.createComponent(AddCategoryComponent);
     httpClient = TestBed.get(HttpClient);
     httpTestingController = TestBed.get(HttpTestingController);
     service= TestBed.inject(CategoryService)
     router= TestBed.get(Router);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

   it('should create', () => {
     expect(component).toBeTruthy();
   });
   it('should validate form when invalid', () => {
    component.category_form= {invalid:true};
    component.saveCategory();
    expect(component.category_form.invalid).toBeTruthy();
  });
  it('getCategories()', ()=>{
    const cat:Category[]= [{
      category_id: '343',
      category_name: 'abcd',
      category_description: 'abcsde'
    },
    {
      category_id: '22',
      category_name: 'abcd',
      category_description: 'abcsde'
    }
  ]
    spyOn(service, 'getCategory').and.returnValue(of(cat));
    component.getCategories();
    expect(component.categorydata).toEqual(cat);
  })

  it('randomint', ()=>{
    const num= component.getRandomInt();
    expect(typeof num).toBe('number')
  })
  it('saveCategory',()=>{
    spyOn(component, 'getCategories').and.callThrough;
    component.category_form={
      invalid: false,
      value:{
        category_id: '454',
        category_name: 'ads',
      category_description: 'asdsds'
      }
    }
    // component.category_form={
    //   category_name: 'ads',
    //   category_description: 'asdsds'
    // }
    const obj={
      category_id:'33',
      category_name: 'ads',
      category_description: 'asdsds'
    }
    component.inputdata= obj;
   spyOn(component, 'checkCategoryID').and.returnValue(-1)
   spyOn(router, 'navigate')
   spyOn(service, 'addCategory').and.returnValue(of({}));
   
    component.saveCategory();
    //expect(component.inputdata).toEqual(component.category_form)
    expect(service.addCategory).toHaveBeenCalled();
  })

  it('Data Equal - checkCategory()', ()=>{
     
     component.categorydata=[{
      category_id:'23',
      category_name: 'ads',
      category_description: 'asdsds'
     }]
     const obj={
      category_id:'33',
      category_name: 'ads',
      category_description: 'asdsds'
    }
    component.inputdata= obj;
     spyOn(component, 'getRandomInt').and.returnValue(23);
     component.checkCategoryID();
     expect(component.inputdata.category_id).toEqual('23')


  })
   it('Data Equal - checkCategory()', ()=>{
     
     component.categorydata=[{
      category_id:'23',
      category_name: 'ads',
      category_description: 'asdsds'
     }]
     const obj={
      category_id:'33',
      category_name: 'ads',
      category_description: 'asdsds'
    }
    component.inputdata= obj;
     spyOn(component, 'getRandomInt').and.returnValue(33);
     component.checkCategoryID();
     expect(component.inputdata.category_id).toEqual('33')


  })

 });




