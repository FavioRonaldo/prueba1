import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

class nuevolibro extends Component{
    state={
        titulo:'',
        ISBN:'',
        existencia:'',
        editorial:''
    }
    agregarlibro = e =>{
        e.preventDefault();

        //extraer valores del state
        const nuevolibro=this.state;
        
        //extraer firestore de props
        const {firestore, history}= this.props

        //agregar arreglo de prestados
        nuevolibro.prestados=[];
        //guardarlo en la base de datos
        firestore.add({collection: 'libros'}, nuevolibro)
        .then(() =>history.push('/'))


    }


    
    //toma los valores del input
    leerdato= e =>{
        this.setState({
             [e.target.name]: e.target.value
        })
    }
    render() {
        return(
           <div className="row">
               <div className="col-12 mb-4">
                    <Link to="/">
                        <i className="fas fa-arrow-circle-left"></i>{''}
                        Volver
                    </Link>
               </div>
               <div className="col-12">
                   <h2>
                       <i className="fas fa-book"></i>{''}
                       Nuebo Libro
                   </h2>
                   <div className="row justify-content">
                       <div className="cold-md-8 mt-5">
                           <form 
                           onSubmit={this.agregarlibro}>
                               <div className="form-group">
                                   <label >Titulo</label>
                                   <input 
                                   type="text" 
                                   className="form-control"
                                   name="titulo"
                                   placeholder="Titulo o Nombre del libro"
                                   required
                                   value={this.state.titulo}
                                   onChange={this.leerdato}
                                   />
                               </div>
                               <div className="form-group">
                                   <label >Editorial</label>
                                   <input type="text" 
                                   className="form-control"
                                   name="editorial"
                                   placeholder="Nombre Editorial"
                                   required
                                   value={this.state.editorial}
                                   onChange={this.leerdato}
                                   />
                               </div>
                               <div className="form-group">
                                   <label >ISBN</label>
                                   <input type="text" 
                                   className="form-control"
                                   name="ISBN"
                                   placeholder="ISBN del libro"
                                   required
                                   value={this.state.ISBN}
                                   onChange={this.leerdato}
                                   />
                               </div>
                               <div className="form-group">
                                   <label >Existencia</label>
                                   <input type="number" 
                                   min="0"
                                   className="form-control"
                                   name="existencia"
                                   placeholder="Cantidad existente"
                                   required
                                   value={this.state.existencia}
                                   onChange={this.leerdato}
                                  />
                               </div>
                               <input type="submit"
                                value="Agregar Libro"
                                className="btn btn-success"/>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
        );
    }
}
nuevolibro.propTypes = {
    firestore: PropTypes.object.isRequired
}
export default firestoreConnect() (nuevolibro);