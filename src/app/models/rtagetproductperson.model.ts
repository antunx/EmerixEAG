export interface RtagetProductPersonModel {
  ErrorCode: number;
  ErrorMessage: string;
  Products: Product[];
}

export interface Product {
  IdProd: number;
  NameProd: string;
  IdTypeProd: number;
  NameTypeProd: string;
  Moneda: string;
  DaysDebt: number;
  AmountDebt: number;
  IsFreeDebt: boolean;
}
