import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Admin } from '../admin-login/admin-login.component';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  isLoggedIn: boolean= false;

  constructor(private http: HttpClient) { }

  AdminLoginCheck(){
      return this.http.get('https://retailadmin-284a8-default-rtdb.firebaseio.com/Retail/Admin.json')
      .pipe(map((res: any)=>{
           return res;
      }))
  }
}
