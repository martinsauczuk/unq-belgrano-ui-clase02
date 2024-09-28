import { Title } from './Title';
import { Contacto } from './domain/domain'
import { ContactosTable } from './contactos/ContactosTable';
import { useState } from 'react';


export const App = () => {

    const appTitle = 'Lista de contactos';
    
    // let contador: number = 2;
    const [ contador, setContador] = useState<number>(0);



    // este array lo vamos a pasar como argumento a <TablaContactos>
    const misContactos: Contacto[] = [
        {
            nombre: 'Martin',
            apellido: 'Sauczuk',
            legajo: 16887,
            id: 1,
            email: 'martin.sauczuk@gmail.com',
            domicilio: {
                calle: 'Gutenberg',
                numero: 1257
            }
        },
        {
            nombre: 'Augusto',
            apellido: 'Kopack',
            id: 2,
            legajo: 498238,
            email: 'Augusto@Kopack.com',
            domicilio: {
                calle: 'Gutenberg',
                numero: 1257
            }
        },
        {
            nombre: 'Gonzalo',
            apellido: 'Andrade',
            legajo: 24323423,
            id: 3,
            email: 'elgonza@gmail.com',
            domicilio: {
                calle: 'Gutenberg',
                numero: 1257
            }
            // telefonos: [
            //     {
            //         numero: '1341423423',
            //         tipo: 'personal'
            //     },
            //     {
            //         numero: '3242434',
            //         tipo: 'trabajo'
            //     }
            // ]
        },
        {
            nombre: 'Iñaki',
            apellido: 'Urbizu',
            id: 4,
            email: 'Iñaki@Iñaki.com',
            domicilio: {
                calle: 'Gutenberg',
                numero: 1257
            }
        },
        {
            nombre: 'Lucia',
            apellido: 'Perrone',
            id: 5,
            email: 'lu@perrone.com',
            domicilio: {
                calle: 'Gutenberg',
                numero: 1257
            }
        },
    ];

    const onClickIncrement = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('alguien hizo click', event);
        // contador ++;
        // renderiza de nuevo todo lo que contenga contador

        setContador( (prevValue) =>  prevValue + 1);
        
    }


    return (
        <>
            <div className="container">
                <Title title={appTitle} />
                
                <div>
                    <span className="badge text-bg-info">{contador}</span>
                </div>

                <button
                    className='btn btn-outline btn-warning'
                    onClick={onClickIncrement}
                >Incrementar contador</button>

                <ContactosTable contactos={misContactos} color='blue'/>
            </div>
        </>
        
    )
}