import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GetService } from '@services/get.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @HostBinding('class') class = 'flex-column';
  constructor(
              private router: Router,
              private getservices: GetService,
              private translate: TranslateService
  ) { }
  IdPersona = '';

  ngOnInit(): void {
    this.IdPersona = localStorage.getItem('version_core');
  }
}
