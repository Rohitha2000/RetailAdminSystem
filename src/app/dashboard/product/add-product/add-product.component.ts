import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import * as moment from 'moment';
import { Category } from '../../category/category.model';
import { CategoryService } from '../../category/service/category.service';
import { CompanyService } from '../../company/service/company.service';
import { Product } from '../product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  submitted:boolean;
  product_category: string[]=[];
  companies:string[]=[];
  now= new Date();
  today= moment(this.now).format('YYYY-MM-DD');
  expirydate= moment(new Date().setDate(new Date().getDate() + 5)).format('YYYY-MM-DD');

  
  product_form: FormGroup |any= new FormGroup({
    product_type: new FormControl('', Validators.required),
    product_code: new FormControl('', Validators.required),
    product_name: new FormControl('', Validators.required),
    product_totalstock: new FormControl(null, Validators.required),
    company_name: new FormControl('', Validators.required),
    product_costperitem: new FormControl(null, Validators.required),
    product_manufacturedate: new FormControl(null, Validators.required),
    product_expirydate: new FormControl(null, Validators.required),
    product_description: new FormControl('', Validators.required)
  })

  constructor(private cat_service: CategoryService, 
    private com_service:CompanyService,
    private service:ProductService, private router: Router) { }
 
   

  ngOnInit() {
    this.getCompanynames();
    this.getProductTypes();
   
  }

  getCompanynames(){
    this.com_service.getCompany().subscribe((res)=>{
      for(let company of res){
        this.companies.push(company.company_name);
      }
    })
  }

  getProductTypes(){
    this.cat_service.getCategory().subscribe((res)=>{
      for(let category of res){
        this.product_category.push(category.category_name);
      }
    })
  }

  saveProduct(){
    this.submitted= true;
    if (this.product_form.invalid) {
      return;
    }

    this.service.addProduct(this.product_form.value).subscribe((res)=>{
        this.router.navigate(['dashboard/product-report'])
    })


    
  }

}
