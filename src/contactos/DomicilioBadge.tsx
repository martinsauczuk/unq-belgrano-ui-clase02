import { Domicilio } from '../domain/domain';

type DomicilioBadgeProps = Domicilio;

export const DomicilioBadge: React.FC<DomicilioBadgeProps> = ({ calle, numero }) => {
   

    return( 
        <span className="badge text-bg-info">
            Calle: <b>{calle}</b> 
            Nro. {numero}
        </span>
    )
}



