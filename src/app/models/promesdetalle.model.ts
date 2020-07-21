export interface PromesaDetalle {
    IdTipoPromesa: number;
    PromesaFecha: string;
    PromesaMonto: number;
    CodigoMoneda: string;
    Estado: string;
    CantidadCuentas: number;
    Detalle: Detalle[];
  }

interface Detalle {
    NombreProducto: string;
    CodigoMoneda: string;
    ImportePago: number;
}
