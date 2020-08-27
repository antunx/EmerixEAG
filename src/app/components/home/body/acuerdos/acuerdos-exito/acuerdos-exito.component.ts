import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acuerdos-exito',
  templateUrl: './acuerdos-exito.component.html',
  styles: [
  ]
})
export class AcuerdosExitoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  volverHome(): void{
    this.router.navigateByUrl('/home/default')
  }

  irPagar(): void {
    this.router.navigateByUrl('/home/pagar');
  }

}
