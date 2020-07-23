export interface RtagetProductPersonModel {
  ErrorCode: number;
  ErrorMessage: string;
  Products: Product[];
}

export interface Product {
  IdProd: string;
  NameProd: string;
  IdTypeProd: string;
  NameTypeProd: string;
  Moneda: string;
  DaysDebt: number;
  AmountDebt: number;
  IsFreeDebt: boolean;
}
