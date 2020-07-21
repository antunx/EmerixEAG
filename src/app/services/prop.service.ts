import { Injectable } from '@angular/core';
import { PromesaDetalle } from '../models/promesdetalle.model';

@Injectable({
  providedIn: 'root',
})
export class PropService {
  private promesaDetalle: PromesaDetalle;

  constructor() {}

  setDetalle(item: PromesaDetalle): void {
    this.promesaDetalle = item;
  }

  getDetalle(): PromesaDetalle {
    return this.promesaDetalle;
  }
}
