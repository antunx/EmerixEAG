import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetService } from '@services/get.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Notificacion } from '@app/models/rtagetnotificaciones.model';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styles: [
  ]
})
export class NotificacionesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  Notificaciones: Notificacion[];
  IdPersona: string;
  Cant: number;
  constructor(
    private getservices: GetService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.IdPersona = localStorage.getItem('version_core');
    this.llenarNotificaciones();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  llenarNotificaciones(): void{
    this.subscription.add(this.getservices.getNotificaciones(this.IdPersona).subscribe( (res) => {
      // console.log(res);
      this.Notificaciones = res.Notificaciones;
      this.Cant = this.Notificaciones.length;
    }, (err) => {
        console.log(err);
      }
    ));
  }
}
