import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Company } from '../company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) { }

  addCompany(company: Company) {

    return this.http.post('http://localhost:3000/company', company)
      .pipe(map((data: Company) => {
        return data;
      }))

  }

  getCompany(): Observable<any> {
    return this.http.get('http://localhost:3000/company')

  }

  delete(id:number){
    return this.http.delete('http://localhost:3000/company/'+ id);
  }

  update(id:number, company:any){
    return this.http.put('http://localhost:3000/company/'+ id, company);
  }
}
