export interface postPromesa{
    Cuentas: Cuenta[];
    DeudaTotal: number;
    FormaPago: string;
    FormaPromesa: string;
    IdPersona: number;
    IdTipoPromesa: number;
    PromesaFecha: Date;
    PromesaMonto: number;
}

interface Cuenta{
    Deuda: number;
    ImportePago: number;
    idCuenta: number;
    idMoneda: number;
}