import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AdminLoginService } from '../service/admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AdminLoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot | any): boolean {
    debugger;
    const expectedRole = route?.data["role"] as Array<string>;
    for(let roles of expectedRole){
      const userRole = this.authService.setPersona;
      if( userRole == roles){
        return true;
      }
    }
     this.router.navigate(['/dashboard'])
    return false;
  }
}