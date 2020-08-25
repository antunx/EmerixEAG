export interface AcuerdosLst {
  ErrorCode: number;
  ErrorMessage: string;
  Acuerdos: Acuerdo[];
}

export interface Acuerdo {
  IdAcuerdo: number;
  NombreAcuerdo: string;
  FechaGenerada: Date;
  EstadoNombre: string;
  EstadoCodigo: string;
  ImporteAnticipo: number;
  CantidadProductos: number;
  CantidadCuotas: number;
  DeudaTotal: number;
  ImporteQuita: number;
  ImporteRefinanciar: number;
  VerBotonAnticipo: boolean;
  Cuentas: Cuenta[];
}

export interface Cuenta {
  NombreProducto: string;
  Deuda: number;
}
