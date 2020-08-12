export interface rtaprepago {
    ErrorCode: number;
    ErrorMessage: string;
    Id: number;
    Preferencia: Preferencia[];
  }
  
  interface Preferencia {
    Propiedad: string;
    Valor: string;
    Activo: boolean;
  }