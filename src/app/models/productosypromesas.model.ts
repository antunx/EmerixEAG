export interface porductosPromesas {
    ErrorCode: number;
    ErrorMessage: string;
    Productos: Producto[];
    Promesas: Promesa[];
    Mensajes: Mensaje[];
    DeudaTotal: number;
    ImporteMaximoTotal: number;
  }
  
  interface Mensaje {
    Mensaje: string;
    Termino: string;
    OpeOk: string;
    OpeNoOk: string;
  }
  
  export interface Promesa {
    Check: boolean;
    IdPromesa: number;
    FechaGenerada: string;
    FechaComprometida: string;
    CodigoMoneda: string;
    ImporteComprometido: number;
    ImporteMinimo: number;
  }
  
  export interface Producto {
    Check: boolean;
    IdCuenta: number;
    CodigoProducto: string;
    NombreProducto: string;
    DiasMora: number;
    IdMoneda: number;
    CodigoMoneda: string;
    Deuda: number;
    ImporteMaximo: number;
    InfoCotizacion: string;
    InfoMostrar: string;
    EsPrestamo: boolean;
    CuotasPrestamo: CuotasPrestamo[];
  }
  
  interface CuotasPrestamo {
    id_prestamo_cuota: number;
  }