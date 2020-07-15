export interface RtagetDetailProductModel {
  ErrorCode: number;
  ErrorMessage: string;
  ColumnCount: number;
  Headers: Column[];
  Rows: Column[];
}

export interface Column {
  Columna: string;
}
