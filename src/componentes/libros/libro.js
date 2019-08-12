import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const libro = ({libros,firestore,history}) =>{
    if(!libros) return <Spinner/>

    //Eliminar suscriptores
    const eliminarlibro = id =>{
        //eliminar con firestore
        firestore.delete({
            collection : 'libros',
            doc: id,
          });
          
     }
    return( 
        <div className="row">
            <div className="col-12 mb-4" className="btn btn-success">
                <Link to="/libro/nuevo">
                    <i className="fas fa-plus"></i>{' '}
                    Nuevo Libro
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-book"></i>{''}
                    Libros 
                </h2>
            </div>
            <table className="table table-hover mt-4">
                <thead className="text-light bg-primary">
                    <tr className="table-dark">
                        <th scope="col">Titulo del libro</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Editorial</th>
                        <th scope="col">Existencia</th>
                        <th scope="col">Cantidad disponible</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map(libro=>(
                        <tr key={libro.id}>
                            <td>{libro.titulo}</td>
                            <td>{libro.ISBN}</td>
                            <td>{libro.editorial}</td>
                            <td>{libro.existencia}</td>
                            <td>{libro.existencia - libro.prestados.length}</td>
                            <td>
                                <Link to={`/libro/mostrar/${libro.id}`} className="btn btn-success btn-block">
                                    <i className="fas-fa-angle-double-right"></i>{''}
                                    Mas informacio
                                </Link>
                                <button type="button" className="btn btn-danger btn-block"
                                onClick={()=>eliminarlibro(libro.id)}>
                                    <i className="fas fa-trash-alt"></i>{' '}
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
libro.propTypes ={
    firestore : PropTypes.object.isRequired,
    libros : PropTypes.array
}

export default compose(
    firestoreConnect([{collection : 'libros'}]),
    connect((state, props) =>({
        libros: state.firestore.ordered.libros
    }))
)(libro);