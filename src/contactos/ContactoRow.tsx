import { Contacto } from "../domain/domain"
import { DomicilioBadge } from './DomicilioBadge';

type ContactoProps = Contacto
// Esta es la forma que vamos a preferir en la cursada
export const ContactoRow: React.FC<ContactoProps> = ({  id, nombre, email, legajo, apellido, domicilio }) => {
    
    // console.log({id, nombre, apellido, email, legajo});

    // const legajoDisplay = legajo 
    //     ? legajo 
    //     : 'Sin Legajo'

    return (

        legajo && (
            <tr>
                <th scope="row">{id}</th>
                <td>{nombre}</td>
                <td>{apellido.toUpperCase()}</td>
                <td>{email.toLocaleLowerCase()}</td>
                <td>{legajo ? legajo : 'Sin Legajo'}</td>
                <td><DomicilioBadge {...domicilio} /></td>
                <td>
                    <i className="bi-tools"></i>
                </td>
            </tr>
        )

    )

}