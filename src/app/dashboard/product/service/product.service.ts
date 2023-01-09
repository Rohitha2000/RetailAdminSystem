import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../product.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  
  addProduct(product:Product){
    return this.http.post('http://localhost:3000/product', product)
      .pipe(map((data) => {
        return data;
      }))
  }
  getProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/product')

  }
  delete(id:number){
    return this.http.delete('http://localhost:3000/product/'+ id);
  }

  update(id:number, product:any){
    return this.http.put('http://localhost:3000/product/'+ id, product);
  }

}
