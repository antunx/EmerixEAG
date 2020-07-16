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
  persona: string;
  constructor(
    private router: Router,
    private getservices: GetService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.persona = localStorage.getItem('id_persona');
  }


}
