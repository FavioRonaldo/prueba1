import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { compose} from 'redux';
import {connect} from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';



class navbar extends Component {
    state={
        usuarioautenticado: false
    }

    //recibe los props automaticamente
    
    static getDerivedStateFromProps(props,state){
        const {auth}=props;
        if(auth.uid){
            return {usuarioautenticado :true}
        }else {return {usuarioautenticado :false}}
    }



   //cerrar sesion
   cerrarsesion =()=>{
       const {firebase} =this.props;
       firebase.logout();
   } 
    render(){
        const {usuarioautenticado} = this.state;

        //extraer dato de autenticacion

        const {auth} = this.props
    return( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
<nav className="navbar navbar-light">
    <span className="navbar-brand mb-0 h1">
        Administrador de Horarios
    </span>
</nav>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarColor01">
    <ul className="navbar-nav mr-auto">
    <li className="nav-item">
                <Link to={'/realidadaumentada'} className="nav-link">
                 Realidad Aumentada
                </Link>
    </li>  
    </ul>
    {usuarioautenticado ?(
    <ul className="navbar-nav mr-auto">
    
    
    <li className="nav-item">
                <Link to={'/usuario'} className="nav-link">
                Usuarios
                </Link>
    </li>
    <li className="nav-item">
                <Link to={'/horarios'} className="nav-link">
                 Horarios
                </Link>
    </li> 
   
    </ul>
    ):null}
    
    
    {usuarioautenticado ? (

        <ul className="navbar--nav-ml-auto">
            <li className="nav-item">
                <a href="#!" className="nav-link">
                    {auth.email}
                </a>
            </li>
            <li className="nav-item">
                <button
                type="button"
                className="btn btn-danger "
                onClick={this.cerrarsesion}
                >
                    Cerrar Sesión
                </button>
            </li>
        </ul>
    ):null}
    
</div>
</nav>
    );
}
}
navbar.propTypes={
    firestore: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
export default compose(
    firebaseConnect(),
    connect((state,props)=>({
        auth: state.firebase.auth
    }))
)(navbar);