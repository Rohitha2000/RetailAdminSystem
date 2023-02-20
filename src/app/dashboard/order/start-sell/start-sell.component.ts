import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from 'src/app/Auth/service/admin-login.service';
import { Product } from '../../product/product.model';
import { ProductService } from '../../product/service/product.service';
import { Customer, OrderDetails } from '../order.model';
import { OrderService } from '../service/order.service';



@Component({
  selector: 'app-start-sell',
  templateUrl: './start-sell.component.html',
  styleUrls: ['./start-sell.component.css']
})
export class StartSellComponent implements OnInit {

  isCustomerdetails_notsaved:boolean = true;
   customer_submitted:boolean = false;
   customerDetails:Customer;
   ordered_items:any[]=[];
   no_of_orders:any;
   products:any;
   order:any={};
   totalAmount=0;
   uniqueid:boolean = false;
   allOrderdata:any[];
   saveorderitem:boolean= false;
   customer_button:string;
   save_button:string;
   
  customer_form: FormGroup | any= new FormGroup({
    customer_name: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), Validators.maxLength(25), Validators.minLength(3)]),
    customer_mobile: new FormControl(null, [Validators.required,Validators.pattern("^[7-9][0-9]{9}$"),
                                       Validators.minLength(10), Validators.maxLength(10)]),
  })

  //order_form!: FormGroup;

  constructor(private service: OrderService, private pd_service:ProductService,
     private router:Router, private loginservice:  AdminLoginService) { 
     
     }
  ngOnChanges(){
    this.getProducts();
  }
  ngOnInit() {
    this.getProducts();
    this.getOrdersData();
    if(this.loginservice.setPersona== 'admin'){
      this.customer_button= 'Start Sell'
      this.save_button= 'Save Sell'
    }
    else if(this.loginservice.setPersona== 'user'){
      this.customer_button= 'Start Buy'
      this.save_button= 'Save Buy'
    }
   // this.buildForm();
   
  }
 
  order_form: FormGroup | any= new FormGroup({
    product_name:new FormControl(null, Validators.required),
    quantity: new FormControl(null,[Validators.required])
  })
 
  
  //this method is called after submitting customer details.
  saveCustomer(){
    this.customer_submitted =  true;
    
    if (this.customer_form.invalid) {
      return;
    }
     this.customerDetails= this.customer_form.value as Customer;
     this.OrderPreData();
     this.isCustomerdetails_notsaved =false;

  }

  getRandomInt() {
    return Math.floor(Math.random() * 870);
  }

  checkOrderID(){
    this.order.order_id = this.getRandomInt().toString();
    for (let allorder of this.allOrderdata) {
      if (this.order.order_id == allorder.order_id) {
        return 1;
      }

    }
    return -1;
  }

  // In order items form this method is called first.
  OrderPreData(){
    console.log(this.customerDetails);
    
    while (this.uniqueid == false) {
      if (this.checkOrderID() == -1) {
        this.uniqueid = true;
      }
   }
      this.order.customer_details= this.customerDetails ;
    
    this.order.order_date= new Date();
    
  }

  getProducts(){
    this.pd_service.getProducts().subscribe((res)=>{
       this.products= res;
    })
  }

  // when we add an item to the cart this item is called

  CheckIfProductPresent(){
    for (let item of this.ordered_items) {
      if (this.order_form.value.product_name == item.product_name) {
         return 1;

      }
      
    }
    return -1;
  }

 

  ngAfterViewInit(){
    this.getProducts();
  }
  lessquant:boolean= false;
  lessQuantity(quant){
    
      
    //this.pd_service.getProducts().subscribe((res)=>{
    //  this.products= res;
      let prodt= null;
      if(this.products != null){
      for(let prod of this.products){
          if(prod.product_name == this.order_form.value.product_name){
           prodt= prod;
          }
      }
      if( quant!= null && prodt.product_totalstock < quant){
        this.lessquant= true;
        return true;
     }
    
    
    }
   
  //  })
  this.lessquant= false;
    return false; 
}


  saveOrderItem(){
   this.saveorderitem= true;
    if(this.order_form.invalid || this.lessquant){

      return;
    }
    console.log(this.order_form.value);
    this.no_of_orders= this.ordered_items.length;
    console.log(this.no_of_orders);

    //check if item is adding  again in the cart which already present
    let product_present= this.CheckIfProductPresent();
    
    if (this.no_of_orders > 0 && product_present==1) {
      for (let item of this.ordered_items) {
        if (this.order_form.value.product_name == item.product_name) {
          if(this.lessQuantity(item.total_units + this.order_form.value.quantity)){
            return;
          };
          item.total_units = item.total_units + this.order_form.value.quantity;
          item.total_cost = item.total_units * item.product_costperitem;
          
        }

        }
        this.getTotalAmount();
     }
    else {

       for (let prod of this.products) {
         if (this.order_form.value.product_name == prod.product_name) {
           let obj = {
            product_id: prod.id,
            product_name: prod.product_name,
            product_costperitem: prod.product_costperitem,
            total_units: this.order_form.value.quantity,
            total_cost: (this.order_form.value.quantity) * (prod.product_costperitem)
          }
          this.ordered_items[this.no_of_orders] = obj;
        }

      }

      this.getTotalAmount();
    }
    this.order_form.reset();
  }

  


  // delete an item from cart
  deleteItem(index:any){
    this.ordered_items.splice(index,1);
    this.ordered_items;
    this.getTotalAmount();
  }



  getTotalAmount(){
    let total_amt=0;
    console.log(this.ordered_items)
         let arr= this.ordered_items.map(item=>{
           
          return total_amt += item.total_cost;
         })
   this.totalAmount= arr[arr.length-1];
         console.log(this.totalAmount);

  }

  // start selling and go to order report 

  updateStock(){
    for(let ord of this.ordered_items){
      for(let prod of this.products){
        if(prod.product_name == ord.product_name){
          prod.product_totalstock= prod.product_totalstock - ord.total_units;
          this.pd_service.update(ord.product_id, prod).subscribe();
        }
      }
    }

    
  }

  saveOrder(){
    if(this.ordered_items.length <= 0){
      return;
    }
    this.updateStock();
    const order_obj={
      order_id: this.order.order_id,
      order_date: this.order.order_date,
      customer_details: this.customerDetails,
      orderitems: this.ordered_items,
      total_amount: this.totalAmount,
      order_status:"paid"
    }

    this.service.addOrder(order_obj).subscribe((res)=>{
        this.router.navigate(["dashboard/sell/order-details", this.order.order_id])
      
    })

  }

  getOrdersData(){
    this.service.getOrders().subscribe((res)=>{
     
        this.allOrderdata= res;

    })

  }


}
