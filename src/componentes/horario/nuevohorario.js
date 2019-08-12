import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

class nuevohorario extends Component {

    state={
        materia: '',
        profesor: '',
        hora_ini: '',
        hora_fin: '',
        laboratorio: ''
    }
    //agregar usuario
    agregarusuario = e =>{
        e.preventDefault();

        //extraer valores del state
        const nuevohorario={...this.state}
        
        //extraer firestore de props
        const {firestore, history}= this.props

        //guardarlo en la base de datos
        firestore.add({collection: 'horarios'}, nuevohorario)
        .then(() =>history.push('/horarios'))


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
                         <Link to='/horarios' className="btn btn-secondary">
                            <i className="fas fa-arrow cricle-left"></i>{' '}
                            Volver al listado
                        </Link>
                    </div>
                    
                    <div className="row justify-content-center">
                        <div className="col-md-80 mt-5">
                            <form
                            onSubmit={this.agregarusuario}
                            >
                                <div className="form-group">
                                    <label>Materia:</label>
                                    <input type="text" className="form-control" name="materia"
                                    placeholder="Nombre de la materia" required
                                    onChange={this.leerdatos}
                                    value={this.state.materia}/>
                                </div>
                                <div className="form-group">
                                    <label>Hora inicio:</label>
                                    <input type="time" className="form-control" name="hora_ini"
                                    placeholder="Apellido del usuario" required
                                    onChange={this.leerdatos}
                                    value={this.state.hora_ini}/>
                                </div>
                                <div className="form-group">
                                    <label>Hora Fin:</label>
                                    <input type="time" className="form-control" name="hora_fin"
                                    placeholder="Codigo del usuario" required
                                    onChange={this.leerdatos}
                                    value={this.state.hora_fin}/>
                                </div>
                                <div className="form-group">
                                    <label>Profesor:</label>
                                    <input type="text" className="form-control" name="profesor"
                                    placeholder="Nombre del profesor" required
                                    onChange={this.leerdatos}
                                    value={this.state.profesor}/>
                                </div>
                                <div className="form-group">
                                    <label>Laboratorio:</label>
                                    <input type="text" className="form-control" name="laboratorio"
                                    placeholder="Nombre del Laboratorio" required
                                    onChange={this.leerdatos}
                                    value={this.state.laboratorio}/>
                                </div>
                                
                                <input type="submit"
                                value="Agregar Horario"
                                className="btn btn-success"/>
                            </form>
                        </div>
                    </div>
            </div>
        
        );
    }
}
nuevohorario.propTypes = {
    firestore: PropTypes.object.isRequired
}
export default firestoreConnect() (nuevohorario);