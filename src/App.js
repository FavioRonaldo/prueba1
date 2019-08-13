import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';

import libro from './componentes/libros/libro';
import mostrarlibro from './componentes/libros/mostrarlibro';
import editarlibro from './componentes/libros/editarlibro';
import nuevolibro from './componentes/libros/nuevolibro';
import prestamolibro from './componentes/libros/prestamolibro';

import './App.css';
import Suscriptores from './componentes/suscriptores/suscriptores';
import MostrarSuscriptores from './componentes/suscriptores/mostrarsuscriptor';
import EditarSuscriptor from './componentes/suscriptores/editarsuscriptor';
import NuevoSuscriptor from './componentes/suscriptores/nuevosuscriptor';
import Navbar from './componentes/layout/navbar';

import Usuarios from './componentes/administrador/usuarios';
import MostrarUsuario from './componentes/administrador/mostrarusuario';
import EditarUsuario from './componentes/administrador/editarusuario';
import NuevoUsuario from './componentes/administrador/nuevousuario';

import horario from './componentes/horario/horarios';
import nuevohorario from './componentes/horario/nuevohorario';
import editarhorario from './componentes/horario/editarhorario';
import mostrarhorario from './componentes/horario/mostrarhorario';


import ra from './componentes/realidad/ar';

import auth from './componentes/auth/login';
import login from './componentes/auth/login';
import {UserIsAuthenticated,UserIsNotAuthenticated} from './helpers/auth';

function App() {
  
  return (

    <Provider store={store}>
      <Router>
      <Navbar />

      <div className="container">
      <Switch>
        <Route exact path="/" component={UserIsNotAuthenticated(login)}/>

        <Route exact path="/libro" component={UserIsAuthenticated(libro)}/>
        <Route exact path="/libro/mostrar/:id" component={UserIsAuthenticated(mostrarlibro)}/>
        <Route exact path="/libro/editar/:id" component={UserIsAuthenticated(editarlibro)}/>
        <Route exact path="/libro/nuevo" component={UserIsAuthenticated(nuevolibro)}/>
        <Route exact path="/libro/prestamo/:id" component={UserIsAuthenticated(prestamolibro)}/>

        <Route exact path="/usuario" component={UserIsAuthenticated(Usuarios)}/>
        <Route exact path="/usuario/nuevo" component={UserIsAuthenticated(NuevoUsuario)}/>
        <Route exact path="/usuario/editar/:id" component={UserIsAuthenticated(EditarUsuario)}/>
        <Route exact path="/usuario/:id" component={UserIsAuthenticated(MostrarUsuario)}/>


        <Route exact path="/suscriptores" component={UserIsAuthenticated(Suscriptores)}/>
        <Route exact path="/suscriptores/nuevo" component={UserIsAuthenticated(NuevoSuscriptor)}/>
        <Route exact path="/suscriptores/editar/:id" component={UserIsAuthenticated(EditarSuscriptor)}/>
        <Route exact path="/suscriptores/:id" component={UserIsAuthenticated(MostrarSuscriptores)}/>


        <Route exact path="/horarios" component={UserIsAuthenticated(horario)}/>
        <Route exact path="/horario/editar/:id" component={UserIsAuthenticated(editarhorario)}/>
        <Route exact path="/horario/nuevo" component={UserIsAuthenticated(nuevohorario)}/>
        <Route exact path="/horario/:id" component={UserIsAuthenticated(mostrarhorario)}/>
        <Route exact path="/realidadaumentada" component={UserIsAuthenticated(ra)}/>
        
      </Switch>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
