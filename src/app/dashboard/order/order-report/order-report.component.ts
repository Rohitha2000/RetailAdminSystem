import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['ID', 'Customer Name', 'Mobile', 'Total Amount', 'Date', 'Actions'];

  constructor(private service: OrderService) { }

  ngOnInit() {
    this.getOrderdata();
  }

  getOrderdata(){
    this.service.getOrders().subscribe((res)=>{
      this.dataSource= res;
    })
  }

}
