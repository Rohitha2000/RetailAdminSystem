import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category/service/category.service';
import { CompanyService } from '../service/company.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  fetched_data:any;
  id:string;

  constructor(private service: CompanyService, private route: ActivatedRoute, 
    private router:Router ,private loc: Location) { }

  update_form: FormGroup| any = new FormGroup({
    company_name: new FormControl('', Validators.required),
    company_description: new FormControl('', Validators.required)
  })

  

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('cmpid');
    console.log("asdda", this.id)
    this.fetchCompany();
  }

  fetchCompany(){
         this.service.getCompany().
         subscribe((res)=>{
           for(let dt of res){
              if( dt.company_id === this.id){
                
                  this.fetched_data= dt ;
              }
           }
         })
  }

  updateCompany(){
    if(this.update_form.invalid){
      return;
    }

    this.service.update(this.fetched_data.id, this.fetched_data).subscribe((res)=>{
      console.log(JSON.stringify(res));
      this.router.navigate(['/dashboard/company-report'])
    })
  }

}
