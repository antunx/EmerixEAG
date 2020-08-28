import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RtapostGeneraTetokenModel } from '@models/rtapostgeneratetoken.model';
import { RtapostValidateTokenModel } from '@models/rtapostvalidatetoken.model';
import { Comprobante } from '@models/comprobante.models';
import { StandardPost } from '@app/models/standardpost.models';
import { Promesa } from '@models/postPromesa.model';
import { rtaPostPromesaPago } from '@models/rtapostpromesapago.model';
import { PrePago } from '@models/postPrePago.model';
import { rtaprepago } from '@models/rtapostprepago.model';
import { Preference } from '@models/rtaPreference.model';
import { CfgPreference } from '@models/postConfPreference.model';
import { ActualizarPreference } from '@models/postActualizarPreference.model';
import { rtaActualizarPreference } from '@models/rtaActualizarPreference.model';
import { Acuerdos } from '@models/rtapostacuerdos.model';
import { CuotasAcuerdo } from '@models/cuotasAcuerdo.model';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IPago } from '@app/models/postPago.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_URL = environment.API_URL;
  private MP_URL =
    'https://api.mercadopago.com/checkout/preferences?access_token=';

  constructor( private http: HttpClient) { }

  postGenerateToken( persona: string, tipoEnvio: string, destino: string ): Observable<RtapostGeneraTetokenModel>{
    const authData = { Person: persona , ModeSend: tipoEnvio, Destination: destino };
    return this.http.post<RtapostGeneraTetokenModel>(this.API_URL + 'eaglogin/postgeneratetoken', authData);
  }

  postValidateToken( login: string, persona: string, tokenCod: string ): Observable<RtapostValidateTokenModel>{
    const authData = { UserLogin: login , Person: persona , UserToken: tokenCod };
    return this.http.post<RtapostValidateTokenModel>(this.API_URL  + 'eaglogin/postvalidatetoken', authData);
  }

  postComprobante(comprobante: Comprobante): Observable<StandardPost>{
    return this.http.post<StandardPost>(this.API_URL  + 'emerixautog/ingresarcomprobante', comprobante);
  }

  postPromesaPago(promesa: Promesa): Observable<rtaPostPromesaPago> {
    return this.http.post<rtaPostPromesaPago>(this.API_URL + 'emerixautog/ingresarpromesa', promesa);
  }
  
  postPrePago(prepago: PrePago): Observable<rtaprepago> {
    return this.http.post<rtaprepago>(
      this.API_URL + 'emerixautog/ingresarpago',
      prepago
    );
  }

  postPreferenceMp(
    preference: CfgPreference,
    access_token: string
  ): Observable<Preference> {
    return this.http.post<Preference>(this.MP_URL + access_token, preference);
  }

  postActualizarPreference(
    actPreference: ActualizarPreference
  ): Observable<rtaActualizarPreference> {
    return this.http.post<rtaActualizarPreference>(
      this.API_URL + 'emerixautog/actualizarpreferencia',
      actPreference
    );
  }

  postPago(pago: IPago) {
    return this.http.post(
      this.API_URL + 'emerixautog/ingresarnotificacion',
      pago
    );
  }

  postPagoSinToken(pago: IPago) {
    return this.http.post(
      this.API_URL + 'emerixautog/ingresarnotificacion',
      pago
    );
  }

  postObtenerAcuerdos(ctas: {
    DeudaTotal: Number;
    DiasMora: number;
    Cuentas: any[];
  }): Observable<Acuerdos> {
    return this.http.post<Acuerdos>(
      this.API_URL + 'emerixautog/getacuerdos',
      ctas
    );
  }

  PostObtenerCuotasAcuerdo(acuerdo: {
    IdAcuerdo: string;
    IdTipoAcuerdo: string;
    Importe: string;
  }): Observable<CuotasAcuerdo> {
    return this.http.post<CuotasAcuerdo>(
      `${this.API_URL}emerixautog/getacuerdoscuotas`,
      acuerdo
    );
  }

  PostConfirmarAcuerdo(acuerdo): any {
    return this.http.post(
      `${this.API_URL}emerixautog/ingresaracuerdo`,
      acuerdo
    );
  }

}
