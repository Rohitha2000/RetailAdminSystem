import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CategoryService } from '../service/category.service';

import { EditCategoryComponent } from './edit-category.component';

describe('EditCategoryComponent', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;
  let service: CategoryService;
  let router: Router

  beforeEach(async () => {
    const updateForm = new FormGroup({
      category_name: new FormControl('', Validators.required),
      category_description: new FormControl('', Validators.required)
    });
    await TestBed.configureTestingModule({
      declarations: [ EditCategoryComponent ],
      imports: [HttpClientModule, HttpClientTestingModule,RouterTestingModule ],
      providers:[CategoryService, Router, HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategoryComponent);
    service= TestBed.inject(CategoryService);
    router= TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    component.update_form = {invalid: true, category_name:'', category_description:''};
   expect(component.update_form.invalid).toBeTruthy();
  });

  it('should update category', () => {
    debugger;
    component.update_form = {invalid: false};
    const obj={ id: 1, name: 'Test' };
    spyOn(router, 'navigate');
     spyOn(service, 'update').withArgs(1, obj).and.returnValue(
      of({ }));
    component.updateCategory();
    expect(component.update_form.invalid).toBeFalsy();
    expect(service.update).toHaveBeenCalledWith(1, obj);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
