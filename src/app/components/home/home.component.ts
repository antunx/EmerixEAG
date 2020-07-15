import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GetService } from '@services/get.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(
              private router: Router,
              private getservices: GetService,
              private translate: TranslateService
  ) { }
  persona = '';

  ngOnInit(): void {
    this.persona = localStorage.getItem('id_persona');
  }
}
