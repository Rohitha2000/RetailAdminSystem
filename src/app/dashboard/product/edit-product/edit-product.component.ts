import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category/service/category.service';
import { CompanyService } from '../../company/service/company.service';
import { ProductService } from '../service/product.service';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  submitted:boolean;
  product_category: string[]=[];
  companies:string[]=[];
  paramid:string;
  fetched_data:any;
  now= new Date();
  today= moment(this.now).format('YYYY-MM-DD');
  expirydate= moment(new Date().setDate(new Date().getDate() + 5)).format('YYYY-MM-DD');

  product_form: FormGroup | any= new FormGroup({
    product_type: new FormControl('', Validators.required),
    product_code: new FormControl('', Validators.required),
    product_name: new FormControl('', Validators.required),
    product_totalstock: new FormControl('', Validators.required),
    company_name: new FormControl('', Validators.required),
    product_costperitem: new FormControl('', Validators.required),
    product_manufacturedate: new FormControl(new Date(), Validators.required),
    product_expirydate: new FormControl(new Date(), Validators.required),
    product_description: new FormControl('', Validators.required)
  })

  constructor(private cat_service: CategoryService, 
    private com_service:CompanyService,
    private service:ProductService, private router: Router, private route:ActivatedRoute
    ,private loc : Location) { }
 

  ngOnInit() {
    this.paramid = this.route.snapshot.paramMap.get('pid');
    this.getCompanynames();
    this.getProductTypes();
    this.fetchProduct();
   
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

  
  fetchProduct(){
    this.service.getProducts().
    subscribe((res)=>{
      for(let dt of res){
         if( (dt.id).toString() === this.paramid){
           
             this.fetched_data= dt ;
         }
      }
    })
}

  updateProduct(){
    if(this.product_form.invalid){
      return;
    }
    this.service.update(this.fetched_data.id, this.fetched_data).subscribe((res)=>{
      
      this.router.navigate(['dashboard/product-report'])
    })
  }

  }


