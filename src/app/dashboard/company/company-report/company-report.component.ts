import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-company-report',
  templateUrl: './company-report.component.html',
  styleUrls: ['./company-report.component.css']
})
export class CompanyReportComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['ID', 'Name', 'Description', 'Actions'];

  constructor(private service: CompanyService) { }

  ngOnInit() {
    this.fetchdata();
  }


  fetchdata(){
    this.service.getCompany().subscribe((res)=>{
        this.dataSource= res ;
    })
  }


  deleteCompany(cid: string) {
    for (let data of this.dataSource) {
      if (data.company_id === cid) {
        this.service.delete(data.id).subscribe(() => {
          this.fetchdata();
        });
      }
    }
  }

  

}
