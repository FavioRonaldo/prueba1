import React,{Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect, reactReduxFirebase} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import FichaSuscriptor from '../suscriptores/fichasuscriptor';

// REDUX Actions
import { buscarUsuario } from '../../action/buscarusuarioactions';

class prestamolibro extends Component{
    state={
        noResultado: false,
        busqueda:''
    }
    //Buscar ALumno por codigo
    buscaralumno = e=>{
        e.preventDefault();


        //obtener el valor a buscar
        const {busqueda} = this.state;
        
        //extraer firestore
        const {firestore,buscarUsuario}=this.props;

        //hacer la consulta
        const coleccion= firestore.collection('suscriptores');
        const consulta = coleccion.where("codigo","==",busqueda).get();
        //leer resultados
        consulta.then(resultado =>{
           
            if(resultado.empty){
                //no hay resultado
                //almacenar en redux un objeto vacio
                buscarUsuario({})

                // actualizar el state en base a si hay resultados
               this.setState({
                    noResultado: true
                })
            }else{
                //si hay resultado
                // colocar el resultado en el state de Redux
                const datos = resultado.docs[0];
                buscarUsuario(datos.data());
                
                // actualizar el state en base a si hay resultados
               this.setState({
                    noResultado: false
                })
            }
        })
    }
    //almacena los datos del alumno para solicitar libro
    solicitarprestamo =() =>{
        const {usuario} = this.props;
        console.log(usuario);
        
        // fecha de alta
        usuario.fecha_solicitud = new Date().toLocaleDateString();

        // No se pueden mutar los pros, tomar una copia y crear un arreglo nuevo
        let prestados = [];
        prestados = [...this.props.libro.prestados, usuario];

        // Copiar el objeto y agregar los prestados
        const libro = {...this.props.libro};

        // eliminar los prestados anteriores
        delete libro.prestados;

        // asignar los prestados
        libro.prestados = prestados;

        // extraer firestore
        const {firestore, history} = this.props;

        // almacenar en la BD
        firestore.update({
            collection: 'libros',
            doc: libro.id
        }, libro ).then(history.push('/libro'));
    }

    //Almacenar el codigo en el state
    leerdato = e=>{
        this.setState({
            [e.target.name]: e.target.value
           
        })
        
    }


    render() {

        //extraer libro
        const {libro}= this.props;
        //mostrar spiner
        if(!libro)return <Spinner/>
        const {usuario} = this.props;
        let fichaalumno,btsolicitar;
        if(usuario.nombre){
            fichaalumno= <FichaSuscriptor
                            alumno={usuario}
                          />
            btsolicitar = <button type="button"
                                   className="btn btn-success btn-block"
                                   onClick={this.solicitarprestamo}
                                   >Solicitar prestamo</button>
        }else{
            fichaalumno= null;
            btsolicitar= null;
        }

        // Mostrar mensaje de error
        const {noResultado} = this.state;

        let mensajeResultado = '';
        if(noResultado) {
            mensajeResultado = <div className="alert alert-danger text-center font-weight-bold">No hay resultados para ese código.</div>
        } else {
            mensajeResultado = null;
        }


        return(
            <div className="row">
                <div className="col-12 mb-4 ">
                 <Link to='/' className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i>{' '}
                    Volver al listado
                </Link>
                </div>
                <div className="col-12 justify-content-center">
                <h2>
                    <i className="fas fa-book"></i>{' '}
                        Solicitar Prestamo de: {libro.titulo}
                </h2>
               
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <form
                            onSubmit={this.buscaralumno}
                            className="mb-4"
                            >
                                <legend className="color-primary text-center">
                                    Busca el Suscriptor por codigo
                                </legend>
                                <div className="form-group">
                                    <input
                                    type="text"
                                    name="busqueda"
                                    className="form-control"
                                    onChange={this.leerdato}

                                    />

                                </div>
                                <input value="Buscar Alumno" type="submit" className="btn btn-success btn-block"/>
                            </form>
                            {/*muestra la ficha del alumno y el boton para solicitar prestamo */}
                            {fichaalumno}
                            {btsolicitar}
                            {/* Muestra un mensaje de no resultados */}
                            
                            {mensajeResultado}
                        </div>
                    </div>
                
                </div>
            </div>
        );
    }
}prestamolibro.propTypes={
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
    connect(({ firestore: { ordered },usuario}, props ) => ({
        libro : ordered.libro && ordered.libro[0],
        usuario
    }), {  buscarUsuario })
) (prestamolibro);