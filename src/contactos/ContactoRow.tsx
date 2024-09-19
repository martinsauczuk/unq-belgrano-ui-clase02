type ContactoProps = {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    legajo?: string;
}


// export const ContactoRow = (contacto: ContactoProps) => {
    
//     return (
//         <tr>
//             <th scope="row">{contacto.id}</th>
//             <td>{contacto.nombre}</td>
//             <td>{contacto.apellido}</td>
//             <td>{contacto.email}</td>
//         </tr>
//     )

// }

// export const ContactoRow = ({ id, nombre, apellido, email}: ContactoProps) => {
    
//     return (
//         <tr>
//             <th scope="row">{id}</th>
//             <td>{nombre}</td>
//             <td>{apellido}</td>
//             <td>{email}</td>
//         </tr>
//     )

// }

// Esta es la forma que vamos a preferir en la cursada
export const ContactoRow: React.FC<ContactoProps> = ({ id, nombre, apellido, email, legajo }) => {
    
    // console.log({id, nombre, apellido, email, legajo});

    // const legajoDisplay = legajo 
    //     ? legajo 
    //     : 'Sin Legajo'

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{nombre}</td>
            <td>{apellido.toUpperCase()}</td>
            <td>{email.toLocaleLowerCase()}</td>
            <td>{legajo ? legajo : 'Sin Legajo'}</td>
        </tr>
    )

}