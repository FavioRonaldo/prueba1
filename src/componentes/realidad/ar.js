import React,{Component} from 'react';

import {firestoreConnect} from 'react-redux-firebase';

import PropTypes from 'prop-types';
import { AFrameRenderer, Marker } from 'react-web-ar';



class ar extends Component {
    state={
        
        val:true,
        resultado1:[],
        resultado2:[],
        val2:true,
        respuesta:'',
        respuesta2:''
  
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
            var acumulador='';
            for(var x=0;x<this.state.resultado1.length;x++){
             acumulador=acumulador+this.state.resultado1[x].materia+' '+this.state.resultado1[x].profesor+'\n'+
             this.state.resultado1[x].hora_ini+' '+this.state.resultado1[x].hora_fin+' '+this.state.resultado1[x].laboratorio+'\n'
             //console.log(this.state.resultado1[x].materia)
              
          }
            //console.log(acumulador)
            this.setState({
              respuesta: acumulador
            })
           // console.log(this.state.respuesta)
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

            var acumulador1='';
            for(var x=0;x<this.state.resultado2.length;x++){
             acumulador1=acumulador1+this.state.resultado2[x].materia+' '+this.state.resultado2[x].profesor+'\n'+
             this.state.resultado2[x].hora_ini+' '+this.state.resultado2[x].hora_fin+'\n'
             //console.log(this.state.resultado1[x].materia)
              
          }
            //console.log(acumulador1)
            this.setState({
              respuesta2: acumulador1
            })
            //console.log(this.state.respuesta2)
            
        })
        
       
        
        
    }
  

    render(){
      
        
    if(this.state.val) {  
        this.laboratorio1();
        console.log('consulta lab 1');
        
        this.state.val=false;
    }
    if(this.state.val2) {  
        this.laboratorio2();
        console.log('consulta lab 2');
        this.state.val2=false;
    }
    
    
   

   return (
       
    <AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
        <Marker parameters={{ preset: 'hiro' }}>
        <a-text value="hola"
        rotation="-90 0 0" color="green" height="2.5" width="2.5" position='-0.8 0.5 0'></a-text>
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