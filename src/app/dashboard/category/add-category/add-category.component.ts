import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Category } from '../category.model';
import { CategoryService } from '../service/category.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  submitted:boolean= false;
  categorydata:Category[];
  inputdata:Category;

  constructor(private service:CategoryService, private router:Router) { }


  ngOnInit(): void {
    this.getCategories();
  }

  category_form = new FormGroup({
    category_name: new FormControl('', Validators.required),
    category_description: new FormControl('', Validators.required)
  })

  saveCategory() {
    this.submitted = true;
    if (this.category_form.invalid) {
      return;
    }

   
    this.inputdata = this.category_form.value as Category;
    this.getCategories();
    console.log("print data" + this.categorydata)

    // this.inputdata.category_id= this.getRandomInt().toString();
    let uniqueid: boolean = false;
    while (uniqueid == false) {
       if (this.checkCategoryID() == -1) {
         uniqueid = true;
       }
    }

    if (uniqueid == true) {
      this.service.addCategory((this.inputdata) as Category)
        .subscribe((res)=>{
          this.router.navigate(['dashboard/category-report'])
        });
    }

  }
  
   getRandomInt() {
    return Math.floor(Math.random() * 1000);
  }

  checkCategoryID(){
    this.inputdata.category_id = this.getRandomInt().toString();
    for (let cat in this.categorydata) {
      if (this.inputdata.category_id == this.categorydata[cat].category_id) {
        return 1;
      }

    }
    return -1;
  }

  getCategories(){
    this.service.getCategory().subscribe(res => {
      console.log("raw data" + JSON.stringify(res));
      this.categorydata = (res) as Category[];
    })
  }



}
