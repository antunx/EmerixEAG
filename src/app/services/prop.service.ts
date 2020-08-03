import { Injectable } from '@angular/core';
import { PromesaDetalle } from '../models/promesdetalle.model';

@Injectable({
  providedIn: 'root',
})
export class PropService {
  private promesaDetalle: PromesaDetalle;
  private desdeHome: boolean;
  private pago: any;

  constructor() {}

  setDetalle(item: PromesaDetalle, desdeHome: boolean): void {
    this.promesaDetalle = item;
    this.desdeHome = desdeHome;
  }

  getDetalle(): any {
    return { detalle: this.promesaDetalle, desdeHome: this.desdeHome };
  }

  setPago(obj: any): void{
    this.pago = obj;
  }

  getPego(): any{
    return this.pago;
  }
}
