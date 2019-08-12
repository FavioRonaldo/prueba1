import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const suscriptores = ({suscriptores,firestore,history}) => {
    if(!suscriptores) return <Spinner />//<h1>Cargando...</h1>
    

   
    //Eliminar suscriptores
    const eliminarSuscriptor = id =>{
       //eliminar con firestore
       firestore.delete({
           collection : 'suscriptores',
           doc: id,
         });
         
    }
    
    return( 
        <div className="row">
            <div className="col-md-12 mb-4">
               <Link to="/suscriptores/nuevo" className=" btn btn-primary">
                   <i className="fas fa-plus"></i>{' '}Nuevo Suscriptor
               </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i>suscriptores
                </h2>
            </div>
            <table className="table table-hover ">
                <thead className="text-light bg-primary">
                    <tr className="table-dark">
                        <th scope="col">Nombre</th>
                        <th scope="col">Carrera</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {suscriptores.map(suscriptor => (
                        <tr key={suscriptor.id}>
                            <td>{suscriptor.nombre} {suscriptor.apellido}</td>
                            <td>{suscriptor.carrera}</td>
                            <td><Link to={`/suscriptores/${suscriptor.id}`} 
                                    className="btn btn-success btn-block">
                                        <i className="fas fa-angle-double-right"></i>{' '}
                                        Mas Información
                                </Link>
                                <button type="button"className="btn btn-danger btn-block" 
                                onClick={()=>eliminarSuscriptor(suscriptor.id)}> 
                                <i className="fas fa-trash-alt">{' '}
                                Eliminar
                                </i> 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

suscriptores.propTypes ={
    firestore : PropTypes.object.isRequired,
    suscriptores : PropTypes.array
}

export default compose(
    firestoreConnect([{collection : 'suscriptores'}]),
    connect((state, props) =>({
        suscriptores: state.firestore.ordered.suscriptores
    }))
)(suscriptores); 