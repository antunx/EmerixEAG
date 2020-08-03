export interface Promesa {
  ErrorCode: number;
  ErrorMessage: string;
  Cuentas: Cuenta[];
  IdTipoPromesa: number;
  ActivoMonto: boolean;
  ActivoProducto: boolean;
  ActivoParcial: boolean;
  DiasMaximo: number;
  DiasMaximoParam: number;
  Mensajes: Mensaje[];
  DeudaTotal: number;
  PagoMinimo: number;
}

interface Mensaje {
  Mensaje: string;
  Termino: string;
  OpeOk: string;
  OpeNoOk: string;
}

interface Cuenta {
  Check: boolean;
  IdCuenta: number;
  NombreProducto: string;
  DiasMora: number;
  IdMoneda: number;
  CodigoMoneda: string;
  Deuda: number;
}
