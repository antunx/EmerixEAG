export interface AcuerdosLst {
  ErrorCode: number;
  ErrorMessage: string;
  Acuerdos: Acuerdo[];
}

export interface Acuerdo {
  IdPersona: string;
  IdCuenta: string;
  NumeroAcuerdo: string;
  Tipo: string;
  Descripcion: string;
  Estado: string;
  IdMoneda: number;
  Importe: number;
  Fecha: Date;
  IdMedioPago: number;
  Comentario: string;
  IdAcuerdo: number;
  MedioPago: string;
  Moneda: string;
}

