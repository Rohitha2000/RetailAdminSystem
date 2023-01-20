import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Admin } from '../admin-login/admin-login.component';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  isLoggedIn: boolean= false;
  setPersona:string;

  constructor(private http: HttpClient) { }

  AdminLoginCheck(){
      return this.http.get('http://localhost:3000/admin').pipe(map((res:any)=>{
        const token= 'Ad89191034';
        localStorage.setItem('token', token);
        return res;
      }))
  }

  userLoginCheck(){
    return this.http.get('http://localhost:3000/user').pipe(map((res:any)=>{
      const token= 'Ur90098808';
      localStorage.setItem('token', token);
      return res;
    }))
  }



  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  get isUserLoggedIn() {
    return this.isLoggedIn;
  }
}
