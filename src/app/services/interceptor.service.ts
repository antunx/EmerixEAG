import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private helper = new JwtHelperService();
  constructor(
    private router: Router,
    private authService: AuthService)
  {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = this.authService.token();

    // SIMULA EL TOKEN VENCIDO
    /*
    (async () => {
      // Do something before delay
      console.log('before delay');

      await this.delay(20000);

      // Do something after
      console.log('after delay');
      this.router.navigateByUrl('/login');
      return;

    })();
    */

    let request = req;
    // console.log(request);
    // VERIFICA QUE TOKEN NO HAYA EXPIRADO Y REDIRIJE A LOGIN EN CASO DE EXPIRACION
    if (token && this.helper.isTokenExpired(token)) {
      // console.log('token expirado (InterceptorService)');
      this.router.navigateByUrl('/login');
      return;
    }

    // SI EXISTE CONFIGURA HEADERS DE FUTURAS HTTP
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
    }

    // EN CASO DE ERROR 401 (UNAUTHORIZED) REDIRIJE A LOGIN
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
          return;
        }

        return throwError(err);
      })
    );
  }

  delay(ms: number): any {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
