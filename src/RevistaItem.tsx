type RevistaItemArgs = {
    titulo: string,
    descripcion: string
}



export const RevistaItem = ( { titulo, descripcion }: RevistaItemArgs ) => {
    

    return(
        <div className="card">
            {/* <img src="." className="card-img-top" alt="..." /> */}
                <div className="card-body">
                <h5 className="card-title"><b>Titulo: </b>{titulo}</h5>
                <p className="card-text">{descripcion}</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    )
}