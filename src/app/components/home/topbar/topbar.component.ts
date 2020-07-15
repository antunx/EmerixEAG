import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GetService } from '@services/get.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {

  constructor(
    private router: Router,
    private getservices: GetService,
    private translate: TranslateService) { }

  Name: string;
  ngOnInit(): void {
    this.Name = localStorage.getItem('Name');
  }

}
