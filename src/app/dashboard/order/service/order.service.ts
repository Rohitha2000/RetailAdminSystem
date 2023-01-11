import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get('http://localhost:3000/order')

  }

  addOrder(order:any){
    return this.http.post('http://localhost:3000/order', order);
  }
}
