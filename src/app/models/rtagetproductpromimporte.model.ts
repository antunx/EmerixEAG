export interface PromesaImporte{
    Cuentas: Cuenta[];
    ErrorCode: number;
    ErrorMessage: string;
}

interface Cuenta{
    CodigoMoneda: string;
    Deuda: number;
    DiasMora: number;
    IdCuenta: number;
    IdMoneda: number;
    ImportePago: number;
    NombreProducto: string;
}