import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Category } from '../category.model';
import { CategoryService } from '../service/category.service';
import { map } from 'rxjs';

import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  fetched_data:any;
  id:string;
update_form!:FormGroup| any;
  constructor(private service: CategoryService, private route: ActivatedRoute, 
    private router:Router, private fb: FormBuilder ) { }

  

  

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('cid');
    this.update_form=this.fb.group({
      category_name: new FormControl('', Validators.required),
      category_description: new FormControl('', Validators.required)
    })
    this.fetchCategory();
  }

  fetchCategory(){
         this.service.getCategory().
         subscribe((res: any[])=>{
           for(let dt of res){
              if( dt.category_id === this.id){
                
                  this.fetched_data= dt ;
              }
           }
         })
  }


  updateCategory(){
    if(this.update_form.invalid){
      return;
    }

    this.service.update(this.fetched_data.id, this.fetched_data).subscribe((res)=>{
      
      this.router.navigate(['/dashboard/category-report'])
    })
  }

}
