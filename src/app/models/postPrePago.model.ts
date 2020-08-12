export interface PrePago {
    IdPersona: string;
    Fecha: Date;
    ImporteTotal: number;
    Items: Item[];
  }
  
 interface Item {
    IdObjeto: number;
    Importe: number;
    TipoObjeto: string;
  }