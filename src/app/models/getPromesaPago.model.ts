export interface getPromesaPago {
  ErrorCode: number;
  ErrorMessage: string;
  Promesas: Promesa[];
}

interface Promesa {
  IdTipoPromesa: number;
  PromesaFecha: string;
  PromesaMonto: number;
  CodigoMoneda: string;
  Estado: string;
  CantidadCuentas: number;
}
