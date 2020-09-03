export interface pagoGen {
    Items: Item[];
    TotalPagar: number;
    Cliente: string;
  }
  
  interface Item {
    id: number;
    importe: number;
    tipo: string;
    cuotas: number[];
  }