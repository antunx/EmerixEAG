export interface IPago {
  IdPagoMP: number;
  Id: number;
  Estado: string;
  EstadoDetalle?: string;
  Origen: string;
  MedioDePago: string;
}
