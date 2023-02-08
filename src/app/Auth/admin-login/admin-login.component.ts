import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from '../service/admin-login.service';


export interface Admin {
  username: string;
  password: string;
}

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})


export class AdminLoginComponent implements OnInit {
  admindetails: Admin;
  userDetails: Admin[];
  notauthenticateduser: boolean = false;
  submitted: boolean = false;
  constructor(private loginservice: AdminLoginService, private router: Router) { }

  ngOnInit(): void { }

  loginform : FormGroup | any= new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  adminlogin() {
    this.submitted= true;
    if(!this.loginform.valid){
      return;
    }


    this.loginservice.AdminLoginCheck().subscribe((response) => {
      this.admindetails = response as Admin;
      
      if ((this.loginform.value.username == this.admindetails.username) &&
        (this.loginform.value.password == this.admindetails.password)) {
        this.notauthenticateduser = false;
        this.loginservice.setPersona= "admin";
         this.loginservice.isLoggedIn= true;
         console.log("persona ::: "+this.loginservice.setPersona);
        this.router.navigate(['dashboard'])
      }
      else {
        this.notauthenticateduser = true;
      }
    })

  }

  userlogin() {
    this.submitted= true;
    if(!this.loginform.valid){
      return;
    }


    this.loginservice.userLoginCheck().subscribe((response) => {
      this.userDetails = response as Admin[];
      for(let user of this.userDetails){
      if ((this.loginform.value.username == user.username) &&
        (this.loginform.value.password == user.password)) {
        this.notauthenticateduser = false;
        this.loginservice.setPersona= "user";
         this.loginservice.isLoggedIn= true;
         console.log("user successfull")
         console.log("persona ::: "+this.loginservice.setPersona);
        this.router.navigate(['dashboard'])
      }
    }
      
        
      
    })

  }



}
