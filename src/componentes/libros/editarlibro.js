import React,{Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect, reactReduxFirebase} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class editarlibro extends Component{
    //crear refs
    tituloImput=React.createRef();
    ISBNImput=React.createRef();
    existenciaImput=React.createRef();
    editorialImput=React.createRef();
    
    //edita el libro
    editarlibro = e => {
        e.preventDefault();
        //crear objeto a actualizar
        const libroactualizado={
            titulo : this.tituloImput.current.value,
            ISBN: this.ISBNImput.current.value,
            existencia: this.existenciaImput.current.value,
            editorial: this.editorialImput.current.value
            
        }
        //extraer firestore y hidtory de props
        const {libro,firestore,history}=this.props;

        
        //almacenar en la base de datos firestore
        firestore.update({
            collection: 'libros',
            doc: libro.id
        },libroactualizado).then(history.push('/'))

    }

    render() {
        const{libro}= this.props;
        if(!libro) return <Spinner />
        return(
            <div className="row">
                 <div className="col-12 mb-4">
                 <Link to='/' className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i>{' '}
                    Volver al listado
                </Link>
            </div>
            <div className="col-12">
                <h2>
                    <i className="fas fa-book"></i>{' '}
                        Editar Libro
                </h2>
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form 
                        onSubmit={this.editarlibro}>
                        <div className="form-group">
                            <label>Titulo:</label>
                            <input type="text" className="form-control" name="titulo"
                            placeholder="Titulo o Nombre del libro" required
                            ref={this.tituloImput}
                            defaultValue={libro.titulo}/>
                        </div>
                        <div className="form-group">
                            <label>ISBN:</label>
                            <input type="text" className="form-control" name="ISBN"
                            placeholder="ISBN del libro" required
                            ref={this.ISBNImput}
                            defaultValue={libro.ISBN}/>
                        </div>
                        <div className="form-group">
                            <label>Existencia:</label>
                            <input type="text" className="form-control" name="existencia"
                            placeholder="Existencia del libro" required
                            ref={this.existenciaImput}
                            defaultValue={libro.existencia}/>
                        </div>
                        <div className="form-group">
                            <label>Editorial:</label>
                            <input type="text" className="form-control" name="editorial"
                            placeholder="Editorial del libro" required
                            ref={this.editorialImput}
                            defaultValue={libro.editorial}/>
                        </div>
                        <input type="submit"
                        defaultValue="Editar libro"
                        className="btn btn-success"/>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
editarlibro.propTypes={
    firestore: PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [
        {
            collection : 'libros',
            storeAs : 'libro',
            doc : props.match.params.id
        }
    ]), 
    connect(({ firestore: { ordered }}, props ) => ({
        libro : ordered.libro && ordered.libro[0]
    }))
)(editarlibro);