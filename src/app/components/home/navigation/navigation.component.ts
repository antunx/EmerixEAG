import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styles: [
  ]
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  Inicio(): void{
    this.router.navigateByUrl('/home');
  }

  MisCuentas(): void{
    alert('MisCuentas(), en desarrollo');
  }

  Pagar(): void{
    alert('Pagar(), en desarrollo');
  }

  RegistrarPago(): void{
    alert('RegistrarPago(), en desarrollo');
  }

  Comprobantes(): void{
    alert('Comprobantes(), en desarrollo');
  }

  PromesasPago(): void{
    alert('PromesasPago(), en desarrollo');
  }

  PlanPago(): void{
    alert('PlanPago(), en desarrollo');
  }

  EstadoSolicitudes(): void{
    alert('EstadoSolicitudes(), en desarrollo');
  }

  TuPerfil(): void{
    alert('TuPerfil(), en desarrollo');
  }

  PreguntasFrecuentes(): void{
    alert('PreguntasFrecuentes(), en desarrollo');
  }

  Salir(): void{
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
