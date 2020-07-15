import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGeneralGuard implements CanActivate {

  constructor( private router: Router) {}

  canActivate(): boolean {
    if ( localStorage.getItem('token') === '' || localStorage.getItem('token') === null) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }

}
