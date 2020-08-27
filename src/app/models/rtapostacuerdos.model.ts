export interface Acuerdos {
    ErrorCode: number;
    ErrorMessage: string;
    Acuerdos: Acuerdo[];
  }
  
  interface Acuerdo {
    Id: number;
    Nombre: string;
    MontoFinanciar: number;
    MontoQuita: number;
    MontoAnticipo: number;
    PlazoAnticipo: string;
    MontoPromedioCuota: number;
    FechaPrimerPago: string;
    Productos: Producto[];
  }
  
  interface Producto {
    Id: number;
    Nombre: string;
    Deuda: number;
  }
