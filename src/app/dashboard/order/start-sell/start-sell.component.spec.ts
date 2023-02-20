import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AdminLoginService } from 'src/app/Auth/service/admin-login.service';
import { ProductService } from '../../product/service/product.service';
import { OrderService } from '../service/order.service';

import { StartSellComponent } from './start-sell.component';

describe('StartSellComponent', () => {
  let component: StartSellComponent;
  let fixture: ComponentFixture<StartSellComponent>;
  let adminservice: AdminLoginService;
  let orderservice: OrderService;
  let prodservice: ProductService;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSellComponent ],
      imports:[HttpClientTestingModule],
      providers:[AdminLoginService, OrderService, ProductService, Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartSellComponent);
    component = fixture.componentInstance;
    adminservice= TestBed.inject(AdminLoginService);
    orderservice= TestBed.inject(OrderService);
    prodservice= TestBed.inject(ProductService);
    router= TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnchanges', ()=>{
    spyOn(component, 'getProducts');
    component.ngOnChanges();
    expect(component.getProducts).toHaveBeenCalled();
  })

  it('ngOninit  -- admin', ()=>{
     spyOn(component, 'getProducts');
     spyOn(component, 'getOrdersData');
     adminservice.setPersona= 'admin';
     component.ngOnInit();
     expect(component.getProducts).toHaveBeenCalled();
     expect(component.getOrdersData).toHaveBeenCalled();
     expect(component.customer_button).toEqual('Start Sell');
     expect(component.save_button).toEqual('Save Sell');
  })

  it('ngOninit  -- user', ()=>{
    spyOn(component, 'getProducts');
    spyOn(component, 'getOrdersData');
    adminservice.setPersona= 'user';
    component.ngOnInit();
    expect(component.getProducts).toHaveBeenCalled();
    expect(component.getOrdersData).toHaveBeenCalled();
    expect(component.customer_button).toEqual('Start Buy');
    expect(component.save_button).toEqual('Save Buy');
 })

 it('getOrdersData() ',()=>{
  const obj=[{
    orderid: '343'
  }]
  spyOn(orderservice, 'getOrders').and.returnValue(of(obj))
  component.getOrdersData();
  expect(orderservice.getOrders).toHaveBeenCalled();
  expect(component.allOrderdata).toEqual(obj);
 })

 it('saveCustomer  ', ()=>{
  spyOn(component, 'OrderPreData');
  component.customer_form={
    invalid:  true
  }
  component.saveCustomer();
  expect(component.customer_submitted).toBeTruthy();
  expect(component.isCustomerdetails_notsaved).toBeTruthy();
  expect(component.OrderPreData).not.toHaveBeenCalled();
 })

 it('saveCustomer', ()=>{
  spyOn(component, 'OrderPreData');
  component.customer_form={
    invalid:  false,
    value:{
      customer_name:'rohi',
      customer_mobile: 9398706362
    }

  }
  component.saveCustomer();
  expect(component.customer_submitted).toBeTruthy();
  expect(component.OrderPreData).toHaveBeenCalled();
  expect(component.isCustomerdetails_notsaved).toBeFalsy();

 })
 it('randomint', ()=>{
  const num= component.getRandomInt();
  expect(typeof num).toBe('number')
})

it('checkorderid  same', ()=>{
  spyOn(component, 'getRandomInt').and.returnValue(23);
  component.allOrderdata=[{
    order_id: '23'

  }]
  component.checkOrderID();
  expect(component.getRandomInt).toHaveBeenCalled();
})


it('checkorderid  not same', ()=>{
  spyOn(component, 'getRandomInt').and.returnValue(23);
  component.allOrderdata=[{
    order_id: '213'

  }]
  component.checkOrderID();
  expect(component.getRandomInt).toHaveBeenCalled();
})

it('OrderPredata',()=>{
  component.uniqueid= false;
  component.customerDetails={
    customer_name:'rohi',
    customer_mobile: 9398706362
  }
  component.order={
    customer_details:''
  }
  spyOn(component, 'checkOrderID').and.returnValue(-1);
  component.OrderPreData();
  expect(component.checkOrderID).toHaveBeenCalled();
  expect(component.uniqueid).toBeTruthy();
  expect(component.order.customer_details).toEqual(component.customerDetails);

})

it('getProducts', ()=>{
 const obj=[{
  product_name: 'adsa'
 }]
 spyOn(prodservice, 'getProducts').and.returnValue(of(obj))
 component.getProducts();
 expect(prodservice.getProducts).toHaveBeenCalled();
 expect(component.products).toEqual(obj);
})

it('CheckIfProductPresent  same', ()=>{
  component.ordered_items=[{
    product_name: 'abcd'
  }]
  component.order_form={
    value:{
      product_name: 'abcd'
    }
  }
  component.CheckIfProductPresent();

})


it('CheckIfProductPresent   not same', ()=>{
  component.ordered_items=[{
    product_name: 'abcd'
  }]
  component.order_form={
    value:{
      product_name: 'ddd'
    }
  }
  component.CheckIfProductPresent();
  expect(100).toEqual(100)

})

it('less quantityy -- true', ()=>{
  component.products=[{
    product_name: 'abcd',
    product_totalstock: 12
  }]
  component.order_form={
    value:{
      product_name: 'abcd'
    }
  }
  component.lessQuantity(88);
  expect(component.lessquant).toBeTruthy();

})

it('less quantityy -- false', ()=>{
  component.products=[{
    product_name: 'abcd',
    product_totalstock: 212
  }]
  component.order_form={
    value:{
      product_name: 'abcd'
    }
  }
  component.lessQuantity(88);
  expect(component.lessquant).toBeFalsy();

})

it('deleteItem ', ()=>{
  component.ordered_items=[{
    order_id: 2323
  },{
    order_id: 33
  }]
  spyOn(component, 'getTotalAmount');
  component.deleteItem(0);
  expect(component.getTotalAmount).toHaveBeenCalled();
})

it('getTotalAmount', ()=>{
  component.ordered_items=[{
    order_id: 2323,
    total_cost: 23
  },{
    order_id: 33,
    total_cost:10
  }]
  component.getTotalAmount();
  expect(component.totalAmount).toEqual(33)
})

it('update stock', ()=>{
  component.ordered_items=[{
    product_name:'abcd',
    total_units:20
  }]
  component.products=[{
    product_name: 'abcd',
    product_totalstock: 90
  }]
  spyOn(prodservice, 'update').and.returnValue(of({}))
  component.updateStock();
  expect(prodservice.update).toHaveBeenCalled()
})

it('saveorder return ', ()=>{
  spyOn(component, 'updateStock');
  component.ordered_items=[]
  component.saveOrder();
  expect(component.updateStock).not.toHaveBeenCalled();
})

it('save order', ()=>{
  component.ordered_items=[{
    product_name:'abcd',
    total_units:20
  }]
  const obj={
    value: 233
  }
  spyOn(component, 'updateStock');
  spyOn(router, 'navigate')
  spyOn(orderservice, 'addOrder').and.returnValue(of(obj))
  component.saveOrder();
  expect(component.updateStock).toHaveBeenCalled();
  expect(orderservice.addOrder).toHaveBeenCalled();

})

it('saveorderitems', ()=>{
  spyOn(component, 'CheckIfProductPresent');
  component.lessquant = true;
  component.saveOrderItem();
  expect(component.CheckIfProductPresent).not.toHaveBeenCalled();
  expect(component.saveorderitem).toBeTruthy();
})

it('saveorderitem neww', ()=>{
  spyOn(component,'CheckIfProductPresent').and.returnValue(-1);
  component.no_of_orders=0;
  component.products=[{
    product_name: 'abcd',
    id:99,
    product_costperitem:22,
    

  }]
  component.order_form={
    value:{
     product_name: 'abcd',
     quantity:22
    }
  }
  spyOn(component, 'getTotalAmount');
  component.saveOrderItem();
  expect(component.CheckIfProductPresent).toHaveBeenCalled();
  expect(component.getTotalAmount).toHaveBeenCalled();
})

it('saveorderitem present', ()=>{
  spyOn(component,'CheckIfProductPresent').and.returnValue(1);
  component.order_form={
    value:{
      product_name: 'chips',
      quantity:3
    }
  }
  component.ordered_items=[{
    product_name: 'chips',
    total_units: 12,
    product_costperitem: 5,
    total_cost:60
  }]
  spyOn(component, 'lessQuantity').and.returnValue(false);
  spyOn(component,'getTotalAmount');
  component.saveOrderItem();
  expect(component.lessQuantity).toHaveBeenCalled();
  expect(component.getTotalAmount).toHaveBeenCalled();
})

it('saveorderitem present  return ', ()=>{
  spyOn(component,'CheckIfProductPresent').and.returnValue(1);
  component.order_form={
    value:{
      product_name: 'chips',
      quantity:3
    }
    
    }
  component.ordered_items=[{
    product_name: 'chips',
    total_units: 12,
    product_costperitem: 5,
    total_cost:60
  }]
  spyOn(component, 'lessQuantity').and.returnValue(true);
  spyOn(component,'getTotalAmount');
  

  component.saveOrderItem();
  expect(component.lessQuantity).toHaveBeenCalled();
  expect(component.getTotalAmount).not.toHaveBeenCalled();
  
})


});
