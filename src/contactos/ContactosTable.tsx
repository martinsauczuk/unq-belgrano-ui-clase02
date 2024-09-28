import { Contacto } from '../domain/domain';
import { ContactoRow } from './ContactoRow';



type ContactosTableProps = {
    contactos: Contacto[],
    color: string;
};

export const ContactosTable: React.FC<ContactosTableProps> = ( { contactos } ) => {

    // console.log(contactos);
    
    return(
        <div>
            <table className="table" >
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Email</th>
                        <th scope="col">Legajo</th>
                        <th scope="col">Domicilio</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        contactos.map( (contacto) => 
                            (
                                // <ContactoRow key={contacto.id} id={contacto.id} apellido={contacto.apellido} nombre={contacto.nombre} email={contacto.email} />
                                <ContactoRow key={contacto.id} { ...contacto } />
                            ) 
                        )       
                    }
                </tbody>
            </table>
        </div>
    )
}