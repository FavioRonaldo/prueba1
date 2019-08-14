import React,{Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect, reactReduxFirebase} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';


class editarhorario extends Component {
    state={
        resultado:[],
        val:true,
        laboratorio:''
    }

    //crear refs
    materiaImput=React.createRef();
    hora_iniImput=React.createRef();
    hora_finImput=React.createRef();
    profesorImput=React.createRef();
    laboratorioImput=React.createRef();

    //edita el horario
    editarhorario = e => {
        e.preventDefault();
        //crear objeto a actualizar
        const horarioactualizado={
            materia : this.materiaImput.current.value,
            hora_ini: this.hora_iniImput.current.value,
            hora_fin: this.hora_finImput.current.value,
            laboratorio: this.state.laboratorio,
            profesor: this.profesorImput.current.value
            
        }
        //extraer firestore y hidtory de props
        const {horario,firestore,history}=this.props;

        
        //almacenar en la base de datos firestore
        firestore.update({
            collection: 'horarios',
            doc: horario.id
        },horarioactualizado).then(history.push('/horarios'))

    }
    laboratorios=()=>{
       
        //extraer firestore
        const {firestore}=this.props;

        //hacer la consulta
        firestore.collection('laboratorios').onSnapshot((snapshot)=>{
            const datos = snapshot.docs.map((dato)=>({
              id: dato.id,
              ...dato.data()
            }))
            this.setState({
                resultado: datos
            })
            
        })
       
        
        
    }
    leerdatos= e =>{
        this.setState({
             [e.target.name]: e.target.value
        })
       
        
    }
    render(){
        if(this.state.val){
            this.laboratorios();
            this.state.val=false;
            
        }
        const{horario}= this.props;
        if(!horario) return <Spinner />
        
        
       return( 
        <div className="row">
        <div className="col-12 mb-4">
             <Link to='/horarios' className="btn btn-secondary">
                <i className="fas fa-arrow-circle-left"></i>{' '}
                Volver al listado
            </Link>
        </div>
        <div className="col-12">
            <h2>
                <i className="fas fa-user"></i>{' '}
                    Editar horario
            </h2>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-80 mt-5">
                <form
                onSubmit={this.editarhorario}
                >
                    <div className="form-group">
                    <label>Materia:</label>
                        <input type="text" className="form-control" name="materia"
                        placeholder="Nombre de la materia" required
                        ref={this.materiaImput}
                        defaultValue={horario.materia}/>
                    </div>
                    <div className="form-group">
                    <label>Hora inicio:</label>
                        <input type="time" className="form-control" name="hora_ini"
                        placeholder="Apellido del usuario" required
                        ref={this.hora_iniImput}
                        defaultValue={horario.hora_ini}/>
                    </div>
                    <div className="form-group">
                    <label>Laboratorio:</label>

                    <select
                    className="form-control"
                    name="laboratorio"
                    onChange={this.leerdatos}
                    onLoad={this.laboratorios}
                    defaultValue={horario.laboratorio}
                    >

                        
                        {this.state.resultado.map(datos=>(
                        
                        <option key={datos.id}                                            
                        value={datos.nombre}
                        defaultValue={horario.laboratorio}
                        >{datos.nombre}</option>
                        ))}                             
                    </select>


                       
                    </div>
                    <div className="form-group">
                    <label>Hora Fin:</label>
                        <input type="time" className="form-control" name="hora_fin"
                        placeholder="Codigo del usuario" required
                        ref={this.hora_finImput}
                        defaultValue={horario.hora_fin}/>
                    </div>
                    <div className="form-group">
                    <label>Profesor:</label>
                        <input type="text" className="form-control" name="profesor"
                        placeholder="Nombre del profesor" required
                        ref={this.profesorImput}
                        defaultValue={horario.profesor}/>
                    </div>
                    
                    <input type="submit"
                    defaultValue="Editar horario"
                    className="btn btn-success"/>
                </form>
            </div>
        </div>
</div>
        
        );
    }
}
editarhorario.propTypes={
    firestore: PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [
        {
            collection : 'horarios',
            storeAs : 'horario',
            doc : props.match.params.id
        }
    ]), 
    connect(({ firestore: { ordered }}, props ) => ({
        horario : ordered.horario && ordered.horario[0]
    }))
)(editarhorario);