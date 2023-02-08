import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../company.model';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
   submitted:boolean;
    companydata:Company[];
    inputdata:Company;


  constructor(private service:CompanyService, private router: Router) { }

  ngOnInit() {
    this.getCompanies();
  }

  company_form: FormGroup |any = new FormGroup({
    company_name: new FormControl('', Validators.required),
    company_description: new FormControl('', Validators.required)
  })

  saveCompany() {
    this.submitted = true;
    if (this.company_form.invalid) {
      return;
    }
    

    this.inputdata = this.company_form.value as Company;
    this.getCompanies();
    console.log("print data" + this.companydata)

    // this.inputdata.category_id= this.getRandomInt().toString();
    let uniqueid: boolean = false;
    while (uniqueid == false) {
       if (this.checkCompanyID() == -1) {
         uniqueid = true;
       }
    }

    if (uniqueid == true) {
      this.service.addCompany((this.inputdata) as Company)
        .subscribe((res)=>{
          this.router.navigate(['dashboard/company-report'])
        });
    }
  }


  getRandomInt() {
    return Math.floor(Math.random() * 760);
  }

  checkCompanyID(){
    this.inputdata.company_id = ("C").concat(this.getRandomInt().toString());
    for (let cat in this.companydata) {
      if (this.inputdata.company_id == this.companydata[cat].company_id) {
        return 1;
      }

    }
    return -1;
  }


  getCompanies(){
    this.service.getCompany().subscribe(res => {
      console.log("raw data" + JSON.stringify(res));
      this.companydata = (res) as Company[];
    })
  }

}
