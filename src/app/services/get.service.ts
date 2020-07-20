import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RtagetValidateUserModel } from '@models/rtagetvalidateuser.model';
import { RtagetDocumentTypeModel } from '@models/rtagetdocumenttype.model';
import { RtagetPageInfoModel } from '@models/rtagetpageinfo.model';
import { RtagetDebtPersonModel } from '@models/rtagetdebtperson.model';
import { RtagetProductPersonModel } from '@models/rtagetproductperson.model';
import { RtagetDetailProductModel } from '@models/rtagetdetailproduct.model';
import { PromesaImporte } from '@app/models/rtagetproductpromimporte.model';
import { RtagetDebtFreeModel } from '@models/rtagetdebtfree.model';
import { Promesa } from '@app/models/Promesa.model';
import {getPromesaPago} from '@models/getPromesaPago.model';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ComprobantesLst } from '@app/models/comprobante.models';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  private API_URL = environment.API_URL;
  private promesa: any;
  private promesaDetalle: any;

  constructor( private http: HttpClient ) {}

  getDocumentType(): Observable<RtagetDocumentTypeModel>{
    return this.http.get<RtagetDocumentTypeModel>(this.API_URL + 'eaglogin/getdocumenttype');
  }

  getValidateUser(login: string, tipoDoc: string): Observable<RtagetValidateUserModel> {
    let params = new HttpParams();
    params = params.append('UserLogin', login);
    params = params.append('TypeDoc', tipoDoc);
    return this.http.get<RtagetValidateUserModel>(this.API_URL + 'eaglogin/getvalidateuser', { params });
  }

  getPageInfo(code: string): Observable<RtagetPageInfoModel>{
    let params = new HttpParams();
    params = params.append('code', code);
    return this.http.get<RtagetPageInfoModel>(this.API_URL + 'eaglogin/getpageinfo', { params });
  }

  getDebtPerson(id: string): Observable<RtagetDebtPersonModel>{
    return this.http.get<RtagetDebtPersonModel>(this.API_URL + 'emerixautog/getdebtperson/' + id);
  }

  getProductPerson(id: string): Observable<RtagetProductPersonModel>{
    return this.http.get<RtagetProductPersonModel>(this.API_URL + 'emerixautog/getproductperson/' + id);
  }

  getProductDetail(IdProd: string): Observable<RtagetDetailProductModel>{
    let params = new HttpParams();
    params = params.append('IdProd', IdProd);
    return this.http.get<RtagetDetailProductModel>(this.API_URL + 'emerixautog/getdetailproduct' , { params });
  }

  getComprobantesDetail(IdPersona: string): Observable<ComprobantesLst>{
    return this.http.get<ComprobantesLst>(this.API_URL + 'emerixautog/getcomprobante/' + IdPersona);
  }

  getDebtFree(id: string): Observable<RtagetDebtFreeModel>{
    return this.http.get<RtagetDebtFreeModel>(this.API_URL + 'emerixautog/getdebtfree/' + id);
  }

  /** AGREGADO */
  getProductProm(id: string): Observable<Promesa> {
    return this.http.get<Promesa>(this.API_URL + 'emerixautog/getproductosprom/' + id);
  }

  postPromesa(promesa: any): void {
    this.promesa = promesa;
  }

  getPromesa(): Promesa {
    return this.promesa;
  }

  getProductPromImporte(id: string, importe: string): Observable<PromesaImporte> {
    let params = new HttpParams();
    params = params.append('Id', id);
    params = params.append('Importe', importe);
    return this.http.get<PromesaImporte>(this.API_URL + 'emerixautog/getproductospromImp', { params });
  }

  getPromesaPago(id: string, ultimas: string): Observable<getPromesaPago> {
    let params = new HttpParams();
    params = params.append('Id', id);
    params = params.append('ultimas', ultimas);
    return this.http.get<getPromesaPago>(this.API_URL + 'emerixautog/getpromesas', { params });
  }

  setDetalle(item: any): void{
    this.promesaDetalle = item;
  }

  getDetalle(): void{
    return this.promesaDetalle;
  }
}
