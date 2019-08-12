import React,{Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect, reactReduxFirebase} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class editarsuscriptor extends Component{

    //crear refs
    nombreImput=React.createRef();
    apellidoImput=React.createRef();
    codigoImput=React.createRef();
    carreraImput=React.createRef();

    //edita el suscriptor
    editarsuscriptor = e => {
        e.preventDefault();
        //crear objeto a actualizar
        const suscriptoractualizado={
            nombre : this.nombreImput.current.value,
            apellido: this.apellidoImput.current.value,
            codigo: this.codigoImput.current.value,
            carrera: this.carreraImput.current.value
        }
        //extraer firestore y hidtory de props
        const {suscriptor,firestore,history}=this.props;

        
        //almacenar en la base de datos firestore
        firestore.update({
            collection: 'suscriptores',
            doc: suscriptor.id
        },suscriptoractualizado).then(history.push('/suscriptores'))

    }
    render(){
        
        const{suscriptor}= this.props;
        if(!suscriptor) return <Spinner />
        return( 
         <div className="row">
            <div className="col-12 mb-4">
                 <Link to='/suscriptores' className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i>{' '}
                    Volver al listado
                </Link>
            </div>
            <div className="col-12">
                <h2>
                    <i className="fas fa-user"></i>{' '}
                        Editar Suscriptor
                </h2>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-80 mt-5">
                    <form
                    onSubmit={this.editarsuscriptor}
                    >
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input type="text" className="form-control" name="nombre"
                            placeholder="Nombre del Suscriptor" required
                            ref={this.nombreImput}
                            defaultValue={suscriptor.nombre}/>
                        </div>
                        <div className="form-group">
                            <label>Apellido:</label>
                            <input type="text" className="form-control" name="apellido"
                            placeholder="Apellido del Suscriptor" required
                            ref={this.apellidoImput}
                            defaultValue={suscriptor.apellido}/>
                        </div>
                        <div className="form-group">
                            <label>Carrera:</label>
                            <input type="text" className="form-control" name="carrera"
                            placeholder="Carrera del Suscriptor" required
                            ref={this.carreraImput}
                            defaultValue={suscriptor.carrera}/>
                        </div>
                        <div className="form-group">
                            <label>Codigo:</label>
                            <input type="text" className="form-control" name="codigo"
                            placeholder="Codigo del Suscriptor" required
                            ref={this.codigoImput}
                            defaultValue={suscriptor.codigo}/>
                        </div>
                        <input type="submit"
                        defaultValue="Editar suscriptor"
                        className="btn btn-success"/>
                    </form>
                </div>
            </div>
    </div>
        );
    }
}
editarsuscriptor.propTypes={
    firestore: PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [
        {
            collection : 'suscriptores',
            storeAs : 'suscriptor',
            doc : props.match.params.id
        }
    ]), 
    connect(({ firestore: { ordered }}, props ) => ({
        suscriptor : ordered.suscriptor && ordered.suscriptor[0]
    }))
)(editarsuscriptor);