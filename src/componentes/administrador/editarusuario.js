import React,{Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect, reactReduxFirebase} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';


class editarusuario extends Component {

    //crear refs
    nombreImput=React.createRef();
    apellidoImput=React.createRef();
    codigoImput=React.createRef();
    contraseñaImput=React.createRef();
    rolImput=React.createRef();

    //edita el usuario
    editarusuario = e => {
        e.preventDefault();
        //crear objeto a actualizar
        const usuarioactualizado={
            nombre : this.nombreImput.current.value,
            apellido: this.apellidoImput.current.value,
            codigo: this.codigoImput.current.value,
            rol: this.rolImput.current.value
            
        }
        //extraer firestore y hidtory de props
        const {usuario,firestore,history}=this.props;

        
        //almacenar en la base de datos firestore
        firestore.update({
            collection: 'usuarios',
            doc: usuario.id
        },usuarioactualizado).then(history.push('/usuario'))

    }
    render(){
        const{usuario}= this.props;
        if(!usuario) return <Spinner />
        console.log(usuario)
       return( 
        <div className="row">
        <div className="col-12 mb-4">
             <Link to='/usuarioes' className="btn btn-secondary">
                <i className="fas fa-arrow-circle-left"></i>{' '}
                Volver al listado
            </Link>
        </div>
        <div className="col-12">
            <h2>
                <i className="fas fa-user"></i>{' '}
                    Editar usuario
            </h2>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-80 mt-5">
                <form
                onSubmit={this.editarusuario}
                >
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" className="form-control" name="nombre"
                        placeholder="Nombre del usuario" required
                        ref={this.nombreImput}
                        defaultValue={usuario.nombre}/>
                    </div>
                    <div className="form-group">
                        <label>Apellido:</label>
                        <input type="text" className="form-control" name="apellido"
                        placeholder="Apellido del usuario" required
                        ref={this.apellidoImput}
                        defaultValue={usuario.apellido}/>
                    </div>
                    <div className="form-group">
                        <label>Rol:</label>
                        <input type="text" className="form-control" name="carrera"
                        placeholder="Carrera del usuario" required
                        ref={this.rolImput}
                        defaultValue={usuario.rol}/>
                    </div>
                    <div className="form-group">
                        <label>Codigo:</label>
                        <input type="text" className="form-control" name="codigo"
                        placeholder="Codigo del usuario" required
                        ref={this.codigoImput}
                        defaultValue={usuario.codigo}/>
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input type="text" className="form-control" name="codigo"
                        placeholder="Codigo del usuario" required
                        ref={this.contraseñaImput}
                        defaultValue={usuario.contraseña}/>
                    </div>
                    <input type="submit"
                    defaultValue="Editar usuario"
                    className="btn btn-success"/>
                </form>
            </div>
        </div>
</div>
        
        );
    }
}
editarusuario.propTypes={
    firestore: PropTypes.object.isRequired
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
)(editarusuario);