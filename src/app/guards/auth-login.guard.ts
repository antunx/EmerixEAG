import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  constructor( private router: Router) {}

  canActivate(): boolean {
    if ( localStorage.getItem('genero')) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
