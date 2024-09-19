import { Header } from './Header';
import { TablaContactos } from './contactos/TablaContactos';


export const App = () => {

    // este array lo vamos a pasar como argumento a <TablaContactos>
    const misContactos = [
        {
            nombre: 'Martin',
            apellido: 'Sauczuk',
            id: 1,
            email: 'martin.sauczuk@gmail.com',
        },
        {
            nombre: 'Augusto',
            apellido: 'Kopack',
            id: 2,
            email: 'Augusto@Kopack.com',
        },
        {
            nombre: 'Gonzalo',
            apellido: 'Andrade',
            id: 3,
            email: 'elgonza@gmail.com',
        },
        {
            nombre: 'Iñaki',
            apellido: 'Urbizu',
            id: 4,
            email: 'Iñaki@Iñaki.com',
        },
        {
            nombre: 'Lucia',
            apellido: 'Perrone',
            id: 5,
            email: 'lu@perrone.com',
        }
    ];



    return (
        <>
            <Header />
            <TablaContactos contactos={misContactos} />
        </>
        
    )
}