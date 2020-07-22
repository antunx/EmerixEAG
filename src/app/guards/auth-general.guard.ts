import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGeneralGuard implements CanActivate, CanActivateChild {

  constructor( private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // console.log('SI logueado (AuthGeneralGuard)');
      return true;
    }else{
      // console.log('No logueado (AuthGeneralGuard)');
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  // tslint:disable-next-line: max-line-length
  canActivateChild(): boolean {
    return this.canActivate();
  }
}
