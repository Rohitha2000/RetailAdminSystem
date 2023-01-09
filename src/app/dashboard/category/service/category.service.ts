import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  addCategory(category: Category) {

    return this.http.post('http://localhost:3000/category', category)
      .pipe(map((data: Category) => {
        return data;
      }))

  }

  getCategory(): Observable<any> {
    return this.http.get('http://localhost:3000/category')

  }

  delete(id:number){
    return this.http.delete('http://localhost:3000/category/'+ id);
  }

  update(id:number, category:any){
    return this.http.put('http://localhost:3000/category/'+ id, category);
  }

 


}
