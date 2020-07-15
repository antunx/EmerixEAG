import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-footer',
  templateUrl: './login-footer.component.html'
})
export class LoginFooterComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }
}

