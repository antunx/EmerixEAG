import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropService } from '@app/services/prop.service';
/*import { GetService } from '@app/services/get.service';
import { PostService } from '@app/services/post.service';*/
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pago-metodos',
  templateUrl: './pago-metodos.component.html',
  styles: [],
})
export class PagoMetodosComponent implements OnInit {
  // pago: any;
  @Input() pagoGeneradoStep: number;
  @Input() pago;
  @Output() volviendo = new EventEmitter<number>();
  constructor(
    private propService: PropService,
    // private postService: PostService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // this.pago = this.propService.getPego();
    // console.log(this.pago);
  }

  volver(): void {
    // this.pago = this.propService.getPego();
    console.log(this.pago);
    if (this.pago?.Items.length !== 0) {
      this.pagoGeneradoStep = this.pagoGeneradoStep - 1;
    } else {
      this.pagoGeneradoStep = this.pagoGeneradoStep - 2;
    }
    this.volviendo.emit(this.pagoGeneradoStep);
  }

  // siguiente(){
  //   console.log(this.pago)
  //   let obj = this.pago
  //   let Preference = [
  //     {
  //       "items": obj.cuentas,
  //       "payer": {
  //           "name": obj.persona.nombre,
  //           "surname": obj.persona.apellido,
  //           "email": obj.persona.email,
  //           "phone": {
  //               "number": obj.persona.telefono
  //           },
  //           "identification": {
  //               "type": obj.persona.tipo_documento,
  //               "number": obj.persona.nro_documento
  //           },
  //           "address": {
  //               "street_name": obj.persona.direccion,
  //               "street_number": obj.persona.direccion_nro,
  //               "zip_code": obj.persona.cp
  //           }
  //       },
  //       "back_urls": {
  //           "success": "https://www.success.com",
  //           "failure": "http://www.failure.com",
  //           "pending": "http://www.pending.com"
  //       },
  //       "auto_return": "approved",
  //       "installments": 12,
  //       "external_reference": "Reference_1234",
  //     }
  //   ]

  //   this.postService.postPreferenceMp(Preference).subscribe(res=>{
  //     console.log(res)
  //   }
  //   )
  // }
}
