import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';


const Usuarios=({usuarios,firestore,history}) => {
   if(!usuarios) return <Spinner />
   //Eliminar suscriptores
   const eliminarUsuario = id =>{
      //eliminar con firestore
      firestore.delete({
          collection : 'usuarios',
          doc: id,
        });
        
   }

   return( 
    <div className="row cold-md-12 md-4">
       <div className="col-md-12 mb-4">
               <Link to="/usuario/nuevo" className=" btn btn-primary">
                   <i className="fas fa-plus"></i>{' '}Nuevo Usuario
               </Link>
       </div>
       <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i>Usuarios
                </h2>
       </div>
       <table className="table table-hover">
       <thead className="text-light bg-primary">
                    <tr className="table-dark">
                        <th scope="col">Nombres</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">Contraseña</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {usuarios.map(usuario=>(
                      <tr key={usuario.id}>
                         <td>{usuario.nombre} {usuario.apellido}</td>
                         <td>{usuario.rol}</td>
                         <td>{usuario.codigo}</td>
                         <td>{usuario.contraseña}</td>
                         <td>
                               <Link to={`/usuario/${usuario.id}`} 
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
Usuarios.propTypes ={
   firestore : PropTypes.object.isRequired,
   usuarios : PropTypes.array
}
export default compose(
   firestoreConnect([{collection : 'usuarios'}]),
    connect((state, props) =>({
        usuarios: state.firestore.ordered.usuarios
    }))
)(Usuarios);