export interface prePago {
    TotalPagar: number;
    DeudaTotal: number;
    Mensajes: Mensajes;
    Cliente: string;
    Items: Item[];
    TipoPago: string;
  }
  
  export interface Item {
    Id: number;
    Nombre: string;
    Deuda: number;
    CodigoMoneda: string;
    Tipo: string;
    ImportePagar: number;
    Cuotas?: number[];
    DiasMora?: number;
    FechaPromesa?: string;
    FechaComprometida?: string;
  }
  
  export interface Mensajes {
    Mensaje: string;
    Termino: string;
    OpeOk: string;
    OpeNoOk: string;
  }
  