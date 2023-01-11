export interface Customer{
    customer_name:string;
    customer_mobile: number;
    
  }
  export interface OrderItems{
    product_id:number;
    product_name:string;
    product_costperitem:number;
    total_units:number;
    total_cost:number;
    
  }
  export class OrderDetails{
    order_id:number;
    order_date:Date;
    customer_details:Customer;
    orderitems:OrderItems[];
    total_amount:number;
    order_status:string;
  
  }