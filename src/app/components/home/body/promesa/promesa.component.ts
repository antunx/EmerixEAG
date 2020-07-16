import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetService } from '@app/services/get.service';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [
  ]
})
export class PromesaComponent implements OnInit {

  constructor(private router: Router,
              private getservices: GetService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  IrPromesaMensaje(): void{
    this.router.navigateByUrl('/home/promesa-mensaje');
  }

  IrPromesaDetalle(): void{
    this.router.navigateByUrl('/home/promesa-detalle');
  }
}
