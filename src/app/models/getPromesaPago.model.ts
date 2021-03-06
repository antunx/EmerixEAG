export interface getPromesaPago {
  ErrorCode: number;
  ErrorMessage: string;
  Promesas: Promesa[];
}

export interface Promesa {
  IdTipoPromesa: number;
  PromesaFecha: string;
  PromesaMonto: number;
  CodigoMoneda: string;
  Estado: string;
  CantidadCuentas: number;
  dia?: number;
  mes?: string;
  VerBotonPagar: boolean;
  Detalle: Array<Producto>;
}

export interface Producto {
  CodigoMoneda: string;
  ImportePago: number;
  NombreProducto: string;
}
