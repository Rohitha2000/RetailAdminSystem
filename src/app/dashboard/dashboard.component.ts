import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLoginService } from '../Auth/service/admin-login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  persona:string;
  startSellorBuy_dashboard:string;
  constructor(private router: Router, private loginservice: AdminLoginService) { }

  ngOnInit(): void {
    this.persona= this.loginservice.setPersona;
    if(this.persona == 'admin'){
      this.startSellorBuy_dashboard= 'Start Sell'
    }
    else if( this.persona == 'user'){
      this.startSellorBuy_dashboard= 'Start Buy'
    }
  }
  
  
 

}
