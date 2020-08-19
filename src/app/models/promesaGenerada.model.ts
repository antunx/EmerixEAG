export interface PromGen {
    totalPagar: number;
    deudaTotal: number;
    cuentas: Cuenta[];
    mensajes: Mensajes;
    formaPromesa: string;
    cliente: string;
    formaPago: string;
    fechaPromesa: string;
    fechaPromesaVencimiento: string;
    idTipoPromesa: number;
  }
  
  interface Mensajes {
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
    ImportePago: number;
  }