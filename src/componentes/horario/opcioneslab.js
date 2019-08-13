import React,{Fragment} from 'react'

const OpcionesLab = ({dato}) => {
    return (
        <Fragment>
            <option value={dato.nombre}>{dato.nombre}</option>
        </Fragment>
    )
}

export default OpcionesLab;