import React,{Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const mostrarusuario =({usuario}) => {
    if(!usuario) return <Spinner />
    
    return(
        
       <div className="row">
            <div className="col-md-5 mb-4">
                <Link to='/usuario' className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i>{' '}
                    Volver al Listado  
                </Link>
                
            </div>
            <div className="col-md-6">
                <Link to={`/usuario/editar/${usuario.id}`} className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt"></i>{' '}
                        Editar suscriptor
                </Link>
            </div>
            <hr className="mx-5 w-100"/>
            <div className="col-12">
                <h2 className="mb-4">
                    {usuario.nombre} {usuario.apellido}
                </h2>
                <p>
                    <span className="font-weight-bold">
                        Codigo:
                    </span>{' '}
                    {usuario.codigo}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Contraseña:
                    </span>{' '}
                    {usuario.contraseña}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Rol:
                    </span>{' '}
                    {usuario.rol}
                </p>
            </div>
       </div>
        
    );
    
}
mostrarusuario.propTypes ={
    firestore : PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [
        {
            collection : 'usuarios',
            storeAs : 'usuario',
            doc : props.match.params.id
        }
    ]), 
    connect(({ firestore: { ordered }}, props ) => ({
        usuario : ordered.usuario && ordered.usuario[0]
    }))
)(mostrarusuario);