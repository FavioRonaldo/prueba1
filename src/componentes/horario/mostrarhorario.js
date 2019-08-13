import React,{Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const mostrarhorario =({horario}) => {
    if(!horario) return <Spinner />
    
    return(
        
       <div className="row">
            <div className="col-md-5 mb-4">
                <Link to='/horarios' className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i>{' '}
                    Volver al Listado  
                </Link>
                
            </div>
            <div className="col-md-6">
                <Link to={`/horario/editar/${horario.id}`} className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt"></i>{' '}
                        Editar Horario
                </Link>
            </div>
            <hr className="mx-5 w-100"/>
            <div className="col-12">
                <h2 className="mb-4">
                    {horario.materia}
                </h2>
                <p>
                    <span className="font-weight-bold">
                        Horar Inicio:
                    </span>{' '}
                    {horario.hora_ini}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Hora Fin:
                    </span>{' '}
                    {horario.hora_fin}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Profesor:
                    </span>{' '}
                    {horario.profesor}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Laboratorio:
                    </span>{' '}
                    {horario.laboratorio}
                </p>
            </div>
       </div>
        
    );
    
}
mostrarhorario.propTypes ={
    firestore : PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [
        {
            collection : 'horarios',
            storeAs : 'horario',
            doc : props.match.params.id
        }
    ]), 
    connect(({ firestore: { ordered }}, props ) => ({
        horario : ordered.horario && ordered.horario[0]
    }))
)(mostrarhorario);