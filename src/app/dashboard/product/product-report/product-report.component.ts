import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.css']
})
export class ProductReportComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['ID', 'Code', 'Name', 'Category', 'Cost', 'Actions'];

  constructor(private service:ProductService) { }

  ngOnInit() {
    this.fetchdata();
  }

  fetchdata(){
    this.service.getProducts().subscribe((res)=>{
        this.dataSource= res ;
    })
  }

  deleteProduct(pid: number) {
    for (let data of this.dataSource) {
      if (data.id === pid) {
        this.service.delete(data.id).subscribe(() => {
          this.fetchdata();
        });
      }
    }
  }

}
