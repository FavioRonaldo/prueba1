import React,{Component} from 'react';
import {firebaseConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

class login extends Component{
    state={
        email: '',
        password:''
    }

    //inica sesion en firebase 
    iniciarsesion= e=>{
        e.preventDefault();

        //extraer de firebase
        const {firebase} = this.props;

        //estraer state
        const{email,password}=this.state;

        //autenticar usuario
        firebase.login({
            email,
            password
        }).then(resultado => console.log('iniciaste Sesión'))
        .catch(error => console.log('hubo un error'))
    }

    //almacena lo que el usurio escribe en el state
    leerdatos =e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        return(
            <div className="row justify-content-center">
                <div className="cold-md-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                    <i className="fas fa-lock"></i>{' '}
                                    Iniciar Sesión
                            </h2>
                            <form 
                            onSubmit={this.iniciarsesion}>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input type="email"
                                    className="form-control"
                                    name="email"
                                    required
                                    value={this.state.email}
                                    onChange={this.leerdatos}/>
                                </div>
                                <div className="form-group">
                                    <label>Password: </label>
                                    <input type="password"
                                    className="form-control"
                                    name="password"
                                    required
                                    value={this.state.password}
                                    onChange={this.leerdatos}/>
                                </div>
                                <input type="submit"
                                className="btn btn-success btn-block"
                                value="Inicar Sesión"/>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}login.propTypes={
    firestore: PropTypes.object.isRequired,
    
}
export default firebaseConnect()(login);