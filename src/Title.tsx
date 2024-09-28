

type TitleProps = {
    title: string
}
export const Title: React.FC<TitleProps> = ({ title }) => {

    // Este componente en un futuro le vamos a agregar mas cosas

    return (
        <>
            <div className="row">
                <h1>{title}</h1>
            </div>
            
        </>
    )
}