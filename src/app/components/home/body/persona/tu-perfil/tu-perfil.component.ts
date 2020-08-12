import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { GetService } from '@services/get.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { RtagetTuPerfilModel } from '@app/models/rtagettuperfil.model';
@Component({
  selector: 'app-tu-perfil',
  templateUrl: './tu-perfil.component.html',
  styles: [
  ]
})
export class TuPerfilComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  Nombre: string;
  Documento: string;
  Telefono: string;
  Mail: string;
  IdPersona: string;
  @HostBinding('class') class = 'pages-container flex-grow';
  constructor(
    private getservices: GetService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.IdPersona = localStorage.getItem('version_core');
    this.llenarDatosPerfil();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  llenarDatosPerfil(): void{
    this.subscription.add(this.getservices.getTuPerfil(this.IdPersona).subscribe( (res) => {
      // console.log(res);
      this.Nombre = res.Nombre;
      this.Telefono = res.Telefono;
      this.Documento = res.Documento;
      this.Mail  = res.Mail;
    }, (err) => {
        console.log(err);
      }
    ));
  }
}
