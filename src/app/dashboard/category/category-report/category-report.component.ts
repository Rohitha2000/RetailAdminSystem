import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { CategoryService } from '../service/category.service';
import autoTable from 'jspdf-autotable'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-report',
  templateUrl: './category-report.component.html',
  styleUrls: ['./category-report.component.css']
})
export class CategoryReportComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['ID', 'Name', 'Description', 'Actions'];
  

//  @ViewChild('report', {static:false}) el:ElementRef;

//  makepdf(){
//   let pdf= new jsPDF('p', 'pt');
//   pdf.html(this.el.nativeElement,{
//     callback:(pdf)=>{
//       pdf.save("category-report.pdf")
//     }
//   })

 
//  }
  

  constructor(private service: CategoryService, private http: HttpClient) { }

  ngOnInit(){
    this.fetchdata();
  }


  

  deleteCategory(cid: string) {
    for (let data of this.dataSource) {
      if (data.category_id === cid) {
        this.service.delete(data.id).subscribe(() => {
          this.fetchdata();
        });
      }
    }

  }


  fetchdata(){

     const promise= this.http.get<any>('http://localhost:3000/category').toPromise();
     promise.then((data)=>{
      this.dataSource= (data)
      console.log(JSON.stringify(data))
     }).catch((error)=>{
      console.log("error occured"+ error)
     })
  }

  



}

