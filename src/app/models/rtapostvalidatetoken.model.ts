export interface RtapostValidateTokenModel {
  ErrorCode: number;
  ErrorMessage: string;
  IsValid: boolean;
  MessageValid: string;
  Jwt: string;
  Person: string;
  FullName: string;
  LastName: string;
  Name: string;
}

export interface DtDispositivo {
  Dispositivo: string;
  Browser: string;
  BrowserIdioma: string;
  SistemaOperativo: string;
}
