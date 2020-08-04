export interface RtagetNotificacionesModel {
  ErrorCode: number;
  ErrorMessage: string;
  Notificaciones: Notificacion[];
}

export interface Notificacion {
  Notificacion: string;
}
