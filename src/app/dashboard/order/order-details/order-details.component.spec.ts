import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { OrderService } from '../service/order.service';

import { OrderDetailsComponent } from './order-details.component';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let service: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsComponent,  ],
      imports:[RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      providers:[OrderService,
         { provide: ActivatedRoute,  
        useValue:
        { snapshot: { 
          paramMap: convertToParamMap( { 'orderid': '761' } ) }}
     }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsComponent);
    
    component = fixture.componentInstance;
    service= TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getOrder() ',fakeAsync(()=>{
    const date= new Date();
    const order=  [{
      "order_id": 531,
      "order_date": date,
      "customer_details": {
        "customer_name": "dfbdb",
        "customer_mobile": "64766476575676"
      },
      "orderitems": [
        {
          "product_id": 1,
          "product_name": "fivestar",
          "product_costperitem": 10,
          "total_units": 23,
          "total_cost": 230
        },
        {
          "product_id": 3,
          "product_name": "fuse",
          "product_costperitem": 10,
          "total_units": 11,
          "total_cost": 110
        }
      ],
      "total_amount": 340,
      "id": 1,
      "order_status": "paid"
    },
    {
      "order_id": "761",
      "order_date":date,
      "customer_details": {
        "customer_name": "rohitha",
        "customer_mobile": "9876877999"
      },
      "orderitems": [
        {
          "product_id": 4,
          "product_name": "scfs",
          "product_costperitem": 3,
          "total_units": 3,
          "total_cost": 9
        },
        {
          "product_id": 6,
          "product_name": "rtrtsr",
          "product_costperitem": 1,
          "total_units": 5,
          "total_cost": 5
        }
      ],
      "total_amount": 14,
      "id": 2,
      "order_status": "paid"
    }];
    
    const ord = [{order_id: '761'}, {order_id: '32'}];

     spyOn(service,'getOrders').and.returnValue(of(ord))
      
      component.getOrder();

  }))

  it('trueee', ()=>{
    expect(true).toBeTruthy();
  })
});
