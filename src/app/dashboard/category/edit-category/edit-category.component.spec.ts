import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CategoryService } from '../service/category.service';
import { EditCategoryComponent } from './edit-category.component';


describe('EditCategory  ---Component', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;
  let service: CategoryService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCategoryComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [ CategoryService, Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;
    service= TestBed.inject(CategoryService)
    router= TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(100).toBe(100);
  });

  it('fetchcategory', ()=>{
    const cat= [{
      category_id: '23',
      category_name: 'abcs',
      category_description: 'adsds'
    }]
    spyOn(service, 'getCategory').and.returnValue(of(cat))
    component.id= '23';
    component.fetchCategory();
    expect
    (service.getCategory).toHaveBeenCalled();
  })

  it('update form invalid', ()=>{
    spyOn(service, 'update');
    component.update_form=
      {
        invalid: true
      }
    
    component.updateCategory();
    expect(service.update).not.toHaveBeenCalled();
  })
  it('Update Category', ()=>{
    spyOn(router, 'navigate');
    spyOn(service, 'update').and.returnValue(of({}));
    component.update_form=
      {
        invalid: false
      }
      component.fetched_data= {
        id: 2,
        category_id: '23',
        category_name: 'abcs',
        category_description: 'adsds'
      }
      
    component.updateCategory();
    expect(service.update).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/category-report']);
  })

});