import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';


const horarios=({horarios,firestore,history}) => {
   if(!horarios) return <Spinner />
   //Eliminar suscriptores
   const eliminarUsuario = id =>{
      //eliminar con firestore
      firestore.delete({
          collection : 'horarios',
          doc: id,
        });
        
   }

   return( 
    <div className="row cold-md-12 md-4">
        
       <div className="col-md-12 mb-4">
               <Link to="/horario/nuevo/" className=" btn btn-primary">
                   <i className="fas fa-plus"></i>{' '}Nuevo Horario
               </Link>
       </div>
    
       <div className="col-md-8">
                <h2>
                    <i className="fas fa-book"></i>{' '}Horario
                </h2>
       </div>
       <table className="table table-hover">
       <thead className="text-light bg-primary">
                    <tr className="table-dark">
                        <th scope="col">Materia</th>
                        <th scope="col">Hora inicio</th>
                        <th scope="col">Hora Fin</th>
                        <th scope="col">Profesor</th>
                        <th scope="col">Laboratorio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {horarios.map(usuario=>(
                      <tr key={usuario.id}>
                         <td>{usuario.materia}</td>
                         <td>{usuario.hora_ini}</td>
                         <td>{usuario.hora_fin}</td>
                         <td>{usuario.profesor}</td>
                         <td>{usuario.laboratorio}</td>
                         <td>
                               <Link to={`/horario/${usuario.id}`} 
                                    className="btn btn-success btn-block">
                                        <i className="fas fa-angle-double-right"></i>{' '}
                                        Mas Información
                                </Link>
                                <button type="button"className="btn btn-danger btn-block" 
                                onClick={()=>eliminarUsuario(usuario.id)}> 
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
horarios.propTypes ={
   firestore : PropTypes.object.isRequired,
   usuarios : PropTypes.array
}
export default compose(
   firestoreConnect([{collection : 'horarios'}]),
    connect((state, props) =>({
        horarios: state.firestore.ordered.horarios
    }))
)(horarios);