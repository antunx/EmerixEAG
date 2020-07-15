import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RtagetObjetoComboModel } from '../models/rtagetobjetocombo.model';

@Injectable({
  providedIn: 'root'
})
export class MetodosEstandarService {

  private API_URL = environment.API_URL;
  public Entidad: string;

  constructor(private http: HttpClient) { }
     UsuId = ''; // JSON.parse(localStorage.getItem('currentUser')).Id;

  getAll(): Observable<any> {
    // console.log(this.API_URL  + this.Entidad);
    return this.http.get<any>(this.API_URL + this.Entidad);
  }

  getById(id: string): Observable<any> {
    // console.log(this.API_URL  + this.Entidad);
    return this.http.get<any>(this.API_URL + this.Entidad + '/' + id);
  }

  create(entidad: any): Observable<any> {
    // console.log(this.API_URL  + '/create/' + this.Entidad);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    entidad.Usu =  this.UsuId;
    return this.http.post<any>(this.API_URL + this.Entidad + '/', entidad, httpOptions);
  }

  update(entidad: any): Observable<any> {
    // console.log(this.API_URL + this.Entidad + '_upd');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    entidad.Usu =  this.UsuId;
    return this.http.put<any>(this.API_URL + this.Entidad + '_upd', entidad, httpOptions);
  }

  deleteById(id: string): Observable<number> {
    // console.log(this.API_URL + this.Entidad + '?id=' + id);

    // forma 1
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<number>(this.API_URL + this.Entidad + '?id=' + id, httpOptions);
    /*
    let params = new HttpParams();
    params = params.append('id', id);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        params
      },
    };
    // forma 2
    return this.http.delete<number>(this.API_URL + this.Entidad, options);
    */
  }

  getObjectCombo(endPoint: string): Observable<RtagetObjetoComboModel> {
    // console.log(this.API_URL + 'emerixautog/' + endPoint);
    return this.http.get<RtagetObjetoComboModel>(this.API_URL + 'emerixautog/' + endPoint);
  }
}
