import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetService } from '@app/services/get.service';

@Component({
  selector: 'app-promesa-ultima',
  templateUrl: './promesa-ultima.component.html',
  styles: [
  ]
})
export class PromesaUltimaComponent implements OnInit {
  persona: string;
  constructor(
    private router: Router,
    private getservices: GetService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.persona = localStorage.getItem('id_persona');
  }

  IrPromesa(): void{
    this.router.navigateByUrl('/home/promesa');
  }

  IrPromesaHistorica(): void{
    this.router.navigateByUrl('/home/promesa-historica');
  }
}
