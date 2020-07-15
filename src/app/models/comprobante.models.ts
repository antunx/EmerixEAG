export interface ComprobantesLst {
  ErrorCode: number;
  ErrorMessage: string;
  Comprobantes: Comprobante[];
}

export interface Comprobante {
  IdPersona: number;
  IdCuenta: number;
  NumeroComprobante: string;
  IdMoneda: number;
  Importe: number;
  Fecha: Date;
  IdMedioPago: number;
  Comentario: string;
  IdComprobante: number;
  MedioPago: string;
  Moneda: string;
}

