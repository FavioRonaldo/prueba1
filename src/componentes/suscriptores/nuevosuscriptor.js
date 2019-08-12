import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';
class nuevosuscriptor extends Component{
    state={
        nombre: '',
        apellido: '',
        carrera: '',
        codigo: ''

    }
    //agregar suscriptor
    agregarSuscriptor = e =>{
        e.preventDefault();

        //extraer valores del state
        const nuevosuscriptor={...this.state}
        
        //extraer firestore de props
        const {firestore, history}= this.props

        //guardarlo en la base de datos
        firestore.add({collection: 'suscriptores'}, nuevosuscriptor)
        .then(() =>history.push('/suscriptores'))


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
                         <Link to='/suscriptores' className="btn btn-secondary">
                            <i className="fas fa-arrow cricle-left"></i>{' '}
                            Volver al listado
                        </Link>
                    </div>
                    <div className="col-12">
                        <h2>
                            <i className="fas fa-user-plus"></i>{' '}
                                Nuevo suscriptor
                        </h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-80 mt-5">
                            <form
                            onSubmit={this.agregarSuscriptor}
                            >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input type="text" className="form-control" name="nombre"
                                    placeholder="Nombre del Suscriptor" required
                                    onChange={this.leerdatos}
                                    value={this.state.nombre}/>
                                </div>
                                <div className="form-group">
                                    <label>Apellido:</label>
                                    <input type="text" className="form-control" name="apellido"
                                    placeholder="Apellido del Suscriptor" required
                                    onChange={this.leerdatos}
                                    value={this.state.apellido}/>
                                </div>
                                <div className="form-group">
                                    <label>Carrera:</label>
                                    <input type="text" className="form-control" name="carrera"
                                    placeholder="Carrera del Suscriptor" required
                                    onChange={this.leerdatos}
                                    value={this.state.carrera}/>
                                </div>
                                <div className="form-group">
                                    <label>Codigo:</label>
                                    <input type="text" className="form-control" name="codigo"
                                    placeholder="Codigo del Suscriptor" required
                                    onChange={this.leerdatos}
                                    value={this.state.codigo}/>
                                </div>
                                <input type="submit"
                                value="Agregar suscriptor"
                                className="btn btn-success"/>
                            </form>
                        </div>
                    </div>
            </div>
            );
        }
    
}
nuevosuscriptor.propTypes = {
    firestore: PropTypes.object.isRequired
}
export default firestoreConnect() (nuevosuscriptor);