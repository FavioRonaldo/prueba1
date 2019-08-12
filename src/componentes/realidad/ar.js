import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { AFrameRenderer, Marker } from 'react-web-ar';




const horarios=({lab1,firestore,history}) => {
  // if(!lab1) return <Spinner />
   //Eliminar suscriptores
   

   return (
    <AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
        <Marker parameters={{ preset: 'hiro' }}>

        <a-box color="blue" material="opacity: 1;" position="0 0.09 0" scale="0.4 0.8 0.8">
            <a-animation attribute="rotation" to="360 0 0" dur="5000" easing="linear" repeat="indefinite" />
        </a-box>

        </Marker>
    </AFrameRenderer>
);
        
    
}
horarios.propTypes ={
   firestore : PropTypes.object.isRequired,
   usuarios : PropTypes.array
}
export default compose(
   firestoreConnect([{collection : 'lab1'}]),
    connect((state, props) =>({
        lab1: state.firestore.ordered.lab1
    }))
)(horarios);