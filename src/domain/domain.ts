export type Contacto = {
    id: number;
    legajo?: number;
    nombre: string;
    apellido: string;
    email: string;
    domicilio: Domicilio;
}

export type Domicilio = {
    calle: string;
    numero: number;
}
