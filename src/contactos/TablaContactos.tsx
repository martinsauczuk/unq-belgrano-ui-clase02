import { ContactoRow } from './ContactoRow';



type TablaContactosProps = {
    contactos: { 
        apellido:   string;
        email:      string;
        id:         number;
        nombre:     string;
    }[]
};

export const TablaContactos: React.FC<TablaContactosProps> = ( { contactos } ) => {

    // console.log(contactos);
    
    return(
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Email</th>
                    <th scope="col">Legajo</th>

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
    )
}