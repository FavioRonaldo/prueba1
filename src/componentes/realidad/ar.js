import React,{Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { AFrameRenderer, Marker } from 'react-web-ar';



class ar extends Component {
    state={
        ini:'hola',
        val:true,
        resultado1: '',
        resultado2: '',
        val2:true
        
    }
    
    laboratorio1=()=>{
       
        //extraer firestore
        const {firestore}=this.props;

        //hacer la consulta
        firestore.collection('horarios').where("laboratorio","==","Laboratorio 1").onSnapshot((snapshot)=>{
            const datos = snapshot.docs.map((dato)=>({
              id: dato.id,
              ...dato.data()
            }))
            this.setState({
                resultado1: datos
            })
            console.log(this.state.resultado1)
        })
        
        
    }
    laboratorio2=()=>{
       
        //extraer firestore
        const {firestore}=this.props;

        //hacer la consulta
        firestore.collection('horarios').where("laboratorio","==","Laboratorio 2").onSnapshot((snapshot)=>{
            const datos = snapshot.docs.map((dato)=>({
              id: dato.id,
              ...dato.data()
            }))
            this.setState({
                resultado2: datos
            })
            console.log(this.state.resultado2)
        })
        
        
    }
  

    render(){
        
    if(this.state.val) {  
        this.laboratorio1();
        this.state.val=false;
    }
    if(this.state.val2) {  
        this.laboratorio2();
        this.state.val2=false;
    }
    
   

   return (
       
    <AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
        <Marker parameters={{ preset: 'hiro' }}>
        <a-text value="hola"
        rotation="-90 0 0" color="green" height="2.5" width="2.5" position='0 0.5 0'></a-text>
      <a-plane color="#CCC" height="1" width="2" rotation="-90 0 0"></a-plane>


        {/*<a-box color="blue" material="opacity: 1;" position="0 0.09 0" scale="0.4 0.8 0.8">
            <a-animation attribute="rotation" to="360 0 0" dur="5000" easing="linear" repeat="indefinite" />
   </a-box>           {this.state.resultado1.map(lab1=>(
            lab1.materia
        ))}*/}

        </Marker>
        <Marker parameters={{type: 'pattern', url: 'https://tecnobits.favioandrade.com/tarea/Laboratorios/lab2.patt' }}>
        <a-text value="hola"
        rotation="-90 0 0" color="green" height="2.5" width="2.5" position='0 0.5 0'></a-text>
      <a-plane color="#CCC" height="1" width="2" rotation="-90 0 0"></a-plane>


      </Marker>
      <Marker parameters={{type: 'pattern', url: 'https://tecnobits.favioandrade.com/tarea/Laboratorios/lab3.patt' }}>
        <a-text value="hola"
        rotation="-90 0 0" color="green" height="2.5" width="2.5" position='0 0.5 0'></a-text>
      <a-plane color="#CCC" height="1" width="2" rotation="-90 0 0"></a-plane>


      </Marker>
      <Marker parameters={{type: 'pattern', url: 'https://tecnobits.favioandrade.com/tarea/Laboratorios/lab1.patt' }}>
        <a-text value="hola"
        rotation="-90 0 0" color="green" height="2.5" width="2.5" position='0 0.5 0'></a-text>
      <a-plane color="#CCC" height="1" width="2" rotation="-90 0 0"></a-plane>


      </Marker>


    </AFrameRenderer>
);
        
   }    
}
ar.propTypes ={
   firestore : PropTypes.object.isRequired,
   usuarios : PropTypes.array
}
export default firestoreConnect()(ar);