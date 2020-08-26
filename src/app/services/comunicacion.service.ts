import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  mensaje: string;
  /* permite enviar mensajes a multiples observadores */
  private enviarMensajeSubject = new Subject<string>();

  /* permite que nos podamos suscribir al subject */
  enviarMensajeObservable = this.enviarMensajeSubject.asObservable();

  /* envia mensajes a todos nuestros suscriptores */
  enviarMensaje(mensaje: string): void {
    this.mensaje = mensaje;
    this.enviarMensajeSubject.next(mensaje);
  }

}
