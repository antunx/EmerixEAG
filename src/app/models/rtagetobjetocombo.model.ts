export interface RtagetObjetoComboModel {
  ErrorCode: number;
  ErrorMessage: string;
  Items: Item[];
}

export interface Item {
  Id: number;
  Codigo: string;
  Nombre: string;
  Imagen: string;
}

export interface ItemDefault {
  Id: number;
  Code: string;
  Name: string;
  Imagen: string;
}
