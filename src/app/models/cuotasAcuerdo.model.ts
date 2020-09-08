export interface CuotasAcuerdo {
    ErrorCode: number;
    ErrorMessage: string;
    Cuotas: Cuota[];
    EsAcuerdoVerbal: boolean;
  }
  
  interface Cuota {
    Cuota: number;
    Capital: number;
    Interes: number;
    Iva: number;
    CargosAdm: number;
    TotalCuota: number;
    CapitalRestante: number;
    FechaVencimiento: string;
  }