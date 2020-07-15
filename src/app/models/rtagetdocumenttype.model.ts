export interface RtagetDocumentTypeModel {
  ErrorCode: number;
  ErrorMessage: string;
  TypeDoc: TypeDoc[];
}

export interface TypeDoc {
  IdTypeDoc: number;
  CodeTypeDoc: string;
  NameTypeDoc: string;
}
