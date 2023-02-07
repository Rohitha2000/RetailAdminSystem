import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductService } from '../../product/service/product.service';
import { OrderService } from '../service/order.service';

import { OrderReportComponent } from './order-report.component';

describe('OrderReportComponent', () => {
  let component: OrderReportComponent;
  let fixture: ComponentFixture<OrderReportComponent>;
  let service: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReportComponent ],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers:[OrderService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReportComponent);
     service= TestBed.inject(OrderService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Fetch data ', ()=>{
    const obj= [{
      "id": 1,
      "company_name": "biscuit",
      "company_description": "biscuit category",
      "company_id": "23"
    },
    {
      "id": 23,
      "company_name": "chocolate",
      "company_description": "Dairy Category",
      "company_id": "300"
    }];
    
    spyOn(service, 'getOrders').and.returnValue(of(obj));
   
    component.getOrderdata();
    expect(service.getOrders).toHaveBeenCalled();
    expect(obj).toEqual(component.dataSource);
  })
});
