import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

//custon reducers
import buscarusuarioreducers from './reducers/buscarusuarioreducers';

//Configurar FireStore
const firebaseConfig ={
    apiKey: "AIzaSyCOsrBIA1zjhvbDiTWuDfqWiMbpWFuf7Vs",
    authDomain: "realidadaumentada-6c7c3.firebaseapp.com",
    databaseURL: "https://realidadaumentada-6c7c3.firebaseio.com",
    projectId: "realidadaumentada-6c7c3",
    storageBucket: "realidadaumentada-6c7c3.appspot.com",
    messagingSenderId: "413553919813",
    appId: "1:413553919813:web:d47db83cca163adf"
}
//inicializar FireBase
firebase.initializeApp(firebaseConfig);

// configuracion de react-redux
const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile: true
}

// crear el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducers 
const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore: firestoreReducer,
    usuario: buscarusuarioreducers
})

// state inicial
const initialState = {};

// Create el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose
));
export default store;