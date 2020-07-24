import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RtapostGeneraTetokenModel } from '@models/rtapostgeneratetoken.model';
import { RtapostValidateTokenModel } from '@models/rtapostvalidatetoken.model';
import { Comprobante } from '@models/comprobante.models';
import { StandardPost } from '@app/models/standardpost.models';
import { Promesa } from '@models/postPromesa.model';
import { rtaPostPromesaPago } from '@models/rtapostpromesapago.model';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_URL = environment.API_URL;

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
}
