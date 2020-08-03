import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GetService } from '@app/services/get.service';
import { Cuota } from '@models/detallePrestamo.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detalle-planpago',
  templateUrl: './detalle-planpago.component.html',
  styles: [
  ]
})
export class DetallePlanpagoComponent implements OnInit {

  prestamo: Cuota[];
  cuotasSeleccionadas = [];
  montoPago: number = 0;
  error: boolean = false;
  @Input() idCuenta: string;
  @Output() TotalPago = new EventEmitter<Object>();

  constructor(private getService:GetService, private translate: TranslateService) { }

  ngOnInit(): void {
    // console.log(this.idCuenta)
    this.getService.getDetallePrestamo(this.idCuenta).subscribe(res=>{
      // console.log(res);
      res.Cuotas.map(cuota=>{
        if(cuota.Check){
          this.montoPago += cuota.ImporteTotal;
          this.cuotasSeleccionadas.push(cuota.IdPrestamoCuota);
        }
      });
      this.prestamo = res.Cuotas;
      // console.log(this.montoPago);
    });
  };

  cerrarPopup(){
    this.error = false;
    (document.getElementById(
      `overlay-error-detalle`
    ) as HTMLInputElement).classList.remove('active');
  }

  cambiarCheck(id:number, e): void{
    // console.log(e);
    this.prestamo.forEach((cuota)=>{
      if(cuota.IdPrestamoCuota === id){
        if(e.target.checked === true){
          this.montoPago += cuota.ImporteTotal;
          this.cuotasSeleccionadas.push(cuota.IdPrestamoCuota);
        } else{
          this.montoPago -= cuota.ImporteTotal;
          let i = this.cuotasSeleccionadas.indexOf(cuota.IdPrestamoCuota);
          if(id !== -1){
            this.cuotasSeleccionadas.splice(i,1);
          }
        };
        // console.log(this.montoPago);
        // console.log(this.cuotasSeleccionadas);
      };
    });
  };

  confirmarCuotas(e): void{
    e.preventDefault();
    // console.log(this.montoPago);

    if(this.montoPago <= 0 || isNaN(this.montoPago)){
      this.error = true;
      (document.getElementById(
        'overlay-error-detalle'
      ) as HTMLInputElement).classList.add('active');
      return;
    };

    let obj = {
      cuotas: this.cuotasSeleccionadas,
      monto: this.montoPago,
    };

    this.TotalPago.emit(obj);
    (document.getElementById(
      `overlay-${this.idCuenta}`
    ) as HTMLInputElement).classList.remove('active');
  }

  volver():void{
    (document.getElementById(
      `overlay-${this.idCuenta}`
    ) as HTMLInputElement).classList.remove('active');
  }

}

