import { Component } from '@angular/core';
import { AdminLoginService } from './Auth/service/admin-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RetailStoreAdmin';
  isLoggedIn = false;

  constructor(private authService: AdminLoginService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.authService.setLoggedIn(true);
      if(token.startsWith('A')){
         this.authService.setPersona= 'admin';
      }
      else if(token.startsWith('U')){
        this.authService.setPersona= 'user';
      }
    }
  }
}
