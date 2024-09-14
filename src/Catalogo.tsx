import { RevistaItem } from './RevistaItem';


export const Catalogo = () => {


    return(
        <div className="container">
            <RevistaItem titulo='Super pescadores del salado' descripcion='Iñaki y sus hazañas'/>
            <RevistaItem titulo='Crohet' descripcion='La señora con la aguja' />
        </div>
    )
}