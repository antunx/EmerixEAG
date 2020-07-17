import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetService } from '@app/services/get.service';

@Component({
  selector: 'app-promesa-historica',
  templateUrl: './promesa-historica.component.html',
  styles: [
  ]
})
export class PromesaHistoricaComponent implements OnInit {
  IdPersona: string;
  constructor(
    private router: Router,
    private getservices: GetService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.IdPersona = localStorage.getItem('version_core');
  }


}
