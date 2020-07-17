import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  mensaje: string;
  /* nos permite enviar mensajes a multiples observadores */
  private enviarMensajeSubject = new Subject<string>();

  /* permite que nuestros componentes se puedan suscribir al subject */
  enviarMensajeObservable = this.enviarMensajeSubject.asObservable();

  /* guardo el mensaje en la variable mensaje y envia mensajes a todos nuestros suscriptores con la funciones next */
  enviarMensaje(mensaje: string): void {
    this.mensaje = mensaje;
    this.enviarMensajeSubject.next(mensaje);
  }

}
