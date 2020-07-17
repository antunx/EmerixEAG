import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicacionService } from '@app/services/comunicacion.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styles: [
  ]
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, private servicioComunicacion: ComunicacionService) { }

  ngOnInit(): void {
  }

  cambioTexto(mensaje: string): void {
    this.servicioComunicacion.enviarMensaje(mensaje);
  }

  Inicio(): void{
    this.cambioTexto('Inicio');
    this.router.navigateByUrl('/home');
  }

  MisCuentas(): void{
    this.cambioTexto('Mis Cuentas');
    this.router.navigateByUrl('/home/producto');
  }

  Pagar(): void{
    this.cambioTexto('Pagar');
    alert('Pagar(), en desarrollo');
  }

  RegistrarPago(): void{
    this.cambioTexto('Registrar Pago');
    alert('RegistrarPago(), en desarrollo');
  }

  Comprobantes(): void{
    this.cambioTexto('Comprobantes');
    alert('Comprobantes(), en desarrollo');
  }

  PromesasPago(): void{
    this.cambioTexto('Promesas de Pago');
    this.router.navigateByUrl('/home/promesa');
  }

  PlanPago(): void{
    this.cambioTexto('Plan de Pago');
    alert('PlanPago(), en desarrollo');
  }

  EstadoSolicitudes(): void{
    this.cambioTexto('Estado Solicitudes');
    alert('EstadoSolicitudes(), en desarrollo');
  }

  TuPerfil(): void{
    this.cambioTexto('Tu Perfil');
    alert('TuPerfil(), en desarrollo');
  }

  PreguntasFrecuentes(): void{
    this.cambioTexto('Preguntas Frecuentes');
    alert('PreguntasFrecuentes(), en desarrollo');
  }

  Salir(): void{
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
