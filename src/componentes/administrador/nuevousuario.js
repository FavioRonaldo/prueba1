import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

class nuevousuario extends Component {

    state={
        nombre: '',
        apellido: '',
        contraseña: '',
        codigo: '',
        rol: ''
    }
    //agregar usuario
    agregarusuario = e =>{
        e.preventDefault();

        //extraer valores del state
        const nuevousuario={...this.state}
        
        //extraer firestore de props
        const {firestore, history}= this.props

        //guardarlo en la base de datos
        firestore.add({collection: 'usuarios'}, nuevousuario)
        .then(() =>history.push('/usuario'))


    }

    //toma los valores del input
    leerdatos= e =>{
        this.setState({
             [e.target.name]: e.target.value
        })
    }
    render(){
       return( 
        <div className="row">
                    <div className="col-12 mb-4">
                         <Link to='/usuario' className="btn btn-secondary">
                            <i className="fas fa-arrow cricle-left"></i>{' '}
                            Volver al listado
                        </Link>
                    </div>
                    <div className="col-12">
                        <h2>
                            <i className="fas fa-user-plus"></i>{' '}
                                Nuevo usuario
                        </h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-80 mt-5">
                            <form
                            onSubmit={this.agregarusuario}
                            >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input type="text" className="form-control" name="nombre"
                                    placeholder="Nombre del usuario" required
                                    onChange={this.leerdatos}
                                    value={this.state.nombre}/>
                                </div>
                                <div className="form-group">
                                    <label>Apellido:</label>
                                    <input type="text" className="form-control" name="apellido"
                                    placeholder="Apellido del usuario" required
                                    onChange={this.leerdatos}
                                    value={this.state.apellido}/>
                                </div>
                                <div className="form-group">
                                    <label>Codigo:</label>
                                    <input type="text" className="form-control" name="codigo"
                                    placeholder="Codigo del usuario" required
                                    onChange={this.leerdatos}
                                    value={this.state.codigo}/>
                                </div>
                                <div className="form-group">
                                    <label>Contraseña:</label>
                                    <input type="password" className="form-control" name="contraseña"
                                    placeholder="Contraseña del usuario" required
                                    onChange={this.leerdatos}
                                    value={this.state.contraseña}/>
                                </div>
                                <div className="form-group">
                                    <label>Rol:</label>
                                    <input type="text" className="form-control" name="rol"
                                    placeholder="Rol del usuario" required
                                    onChange={this.leerdatos}
                                    value={this.state.rol}/>
                                </div>
                                <input type="submit"
                                value="Agregar usuario"
                                className="btn btn-success"/>
                            </form>
                        </div>
                    </div>
            </div>
        
        );
    }
}
nuevousuario.propTypes = {
    firestore: PropTypes.object.isRequired
}
export default firestoreConnect() (nuevousuario);