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
  notauthenticateduser: boolean = false;
  submitted: boolean = false;
  constructor(private loginservice: AdminLoginService, private router: Router) { }

  ngOnInit(): void { }

  loginform = new FormGroup({
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
         this.loginservice.isLoggedIn= true;
        this.router.navigate(['dashboard'])
      }
      else {
        this.notauthenticateduser = true;
      }
    })

    


  }

}
