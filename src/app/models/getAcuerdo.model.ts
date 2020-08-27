export interface Acuerdo {
    ErrorCode: number;
    ErrorMessage: string;
    ExisteAcuerdo: boolean;
    DeudaTotal: number;
    DiasMora: number;
    Cuentas: Cuenta[];
    Mensajes: Mensaje[];
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
    TipoProducto: string;
  }
  