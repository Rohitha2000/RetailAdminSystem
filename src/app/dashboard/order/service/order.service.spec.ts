import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[OrderService]

    });
    service = TestBed.inject(OrderService);
     httpMock= TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get orders API call - getOrders()',()=>{
    const order= {
      "order_id": 531,
      "order_date": "2023-01-11T07:59:05.405Z",
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
    }

    service.getOrders().subscribe((res)=>{
      expect(res).toEqual(order);

    });

    const req= httpMock.expectOne('http://localhost:3000/order');
    expect(req.request.method).toBe('GET')
    req.flush(order);
  });

  it('post API call - addOrder()', ()=>{
    const order= {
      "order_id": 531,
      "order_date": "2023-01-11T07:59:05.405Z",
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
    }

    service.addOrder(order).subscribe((res)=>{
      expect(res).toEqual(order);
     })
     const req = httpMock.expectOne({ method:'POST', url: `http://localhost:3000/order`});
    expect(req.request.body).toEqual(order);
    req.flush(order)
  })

});
