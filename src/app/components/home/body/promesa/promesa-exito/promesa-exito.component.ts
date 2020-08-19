import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promesa-exito',
  templateUrl: './promesa-exito.component.html',
  styles: [
  ]
})
export class PromesaExitoComponent implements OnInit {

  constructor(private router:Router) { };

  ngOnInit(): void {
  };

  volverHome(): void{
    this.router.navigateByUrl('/home/default');
  };

  irPagar():void{
    this.router.navigateByUrl('/home/pagar');
  };

};
