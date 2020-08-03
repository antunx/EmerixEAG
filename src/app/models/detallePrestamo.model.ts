export interface DetallePrestamo {
    ErrorCode: number;
    ErrorMessage: string;
    Cuotas: Cuota[];
  }
  
export interface Cuota {
    Check: boolean;
    IdPrestamo: number;
    IdPrestamoCuota: number;
    NumeroCuota: number;
    ImporteCapital: number;
    FechaVemcimiento: string;
    CodigoEstado: string;
    ImporteTotal: number;
  }