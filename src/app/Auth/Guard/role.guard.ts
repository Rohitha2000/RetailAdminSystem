import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AdminLoginService } from '../service/admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AdminLoginService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data["role"] as Array<string>;
    for(let roles of expectedRole){
    const userRole = this.authService.setPersona;
      if( userRole == roles){
        return true;
      }
    }
    return false;
  }
}