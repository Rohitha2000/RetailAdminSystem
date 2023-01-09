import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(private service: CategoryService, private route: ActivatedRoute, 
    private router:Router ,private loc: Location) { }

  update_form = new FormGroup({
    category_name: new FormControl('', Validators.required),
    category_description: new FormControl('', Validators.required)
  })

  

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('cid');
    console.log("asdda", this.id)
    this.fetchCategory();
  }

  fetchCategory(){
         this.service.getCategory().
         subscribe((res)=>{
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
      console.log(JSON.stringify(res));
      this.loc.back();
    })
  }

}
