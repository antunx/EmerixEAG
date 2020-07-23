import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  public chageLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.chageLoginStatusSubject.asObservable();

  login(tk: string): void {
    localStorage.setItem('token', tk);
    this.chageLoginStatusSubject.next(true);
  }

  logout(): void {
    localStorage.clear();
    this.chageLoginStatusSubject.next(false);
  }

  isLoggedIn(): boolean{
    if ( localStorage.getItem('token') === '' || localStorage.getItem('token') === null) {
      return false;
    } else {
      return true;
    }
  }

  token(): string{
    if ( localStorage.getItem('token') === '' || localStorage.getItem('token') === null) {
      return '';
    } else {
      return 'Bearer ' + localStorage.getItem('token').substring(22);
    }
  }
}
