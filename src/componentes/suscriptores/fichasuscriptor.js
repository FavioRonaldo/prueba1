import React from 'react';

const fichasuscriptor  = ({alumno}) =>{
    return( 
        <div className="card my-3">
            <h3 className="card-header bg-primary text-white">Datos Solicitante</h3>
            <div className="card-body">
                <p className="fontweight-bold">Nombre: {''}
                    <span className="font-weight-normal">{alumno.nombre}</span>
                </p>
                <p className="fontweight-bold">Codigo: {''}
                    <span className="font-weight-normal">{alumno.codigo}</span>
                </p>
                <p className="fontweight-bold">Carrera: {''}
                    <span className="font-weight-normal">{alumno.carrera}</span>
                </p>
            </div>
        </div>
    );
}
export default fichasuscriptor;