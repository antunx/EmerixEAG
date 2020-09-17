import { Injectable } from '@angular/core';
import { PromesaDetalle } from '@app/models/promesdetalle.model';

@Injectable({
  providedIn: 'root',
})
export class PropService {
  private promesaDetalle: PromesaDetalle;
  private desdeHome: boolean;
  private AccessToken: string;
  private campaniaEspecial: boolean;

  constructor() {}

  setDetalle(item: PromesaDetalle, desdeHome: boolean): void {
    this.promesaDetalle = item;
    this.desdeHome = desdeHome;
  }

  getDetalle(): any {
    return { detalle: this.promesaDetalle, desdeHome: this.desdeHome };
  }

  setAccesToken(accesToken: string): void {
    this.AccessToken = accesToken;
  }

  getAccesToken(): string {
    return this.AccessToken;
  }

  setCampaniaEspecial(campaniaEspecial: boolean): void {
    this.campaniaEspecial = campaniaEspecial;
  }

  getCampaniaEspecial(): boolean {
    return this.campaniaEspecial;
  }
}
