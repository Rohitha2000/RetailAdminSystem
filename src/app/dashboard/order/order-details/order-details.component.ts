import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  paramid:any;
  orderdata:any;
  orderArray:any[];

  constructor(private route:ActivatedRoute, private service:OrderService) { }

  ngOnInit(){
    this.getOrder();
  }

  getOrder(){

    this.paramid = this.route.snapshot.paramMap.get('orderid');
     this.service.getOrders().subscribe((res)=>{
      for(let ord of res){
        if( ord && ord.order_id === this.paramid){
          this.orderdata= ord;
          console.log(JSON.stringify(this.orderdata))
        }
      }
    })
    
  }
 



}
