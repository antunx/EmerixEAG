import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComprobanteComponent } from './body/pago/comprobante/lista-comprobante.component';
import { InformarComprobanteComponent } from './body/pago/comprobante/informar-comprobante.component';

import { TopbarComponent } from './topbar/topbar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGeneralGuard } from '@app/guards/auth-general.guard';
import { DeudaComponent } from './body/deuda/deuda.component';
import { HomeComponent } from './home.component';
import { DefaultComponent } from './default.component';
import { ProductoComponent } from './body/producto/producto.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent,
    children: [
      {path: '', component: DefaultComponent, canActivate: [ AuthGeneralGuard ]},
      {path: 'lista_comprobante', component: ListaComprobanteComponent, canActivate: [ AuthGeneralGuard ]  },
      {path: 'informar_comprobante', component: InformarComprobanteComponent, canActivate: [ AuthGeneralGuard ]  },
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
