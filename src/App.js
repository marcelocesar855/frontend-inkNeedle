import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import RecuSenha from './pages/RecuSenha';
import CadastroEstudio from './pages/CadastroEstudio';
import CadastroEvento from './pages/CadastroEvento';
import RedefSenha from './pages/RedefSenha';
import PerfilTatuador from './pages/PerfilTatuador';
import PerfilEstudio from './pages/PerfilEstudio';
import Agenda from './pages/Agenda';
import Busca from './pages/Busca';
import {getUser} from './services/auth';
import routes from './routes'
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ 
            pathname: "/login", 
            state: { from: props.location } }} 
          />
        )
    }
  />
);

class App extends Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
        if (!!prop.isAuth) {
          if (getUser() !== null) {
            if (getUser().userTypeId !== prop.isAuth) {
              return (<Redirect from={prop.path} to={prop.notPath} />);
            }
          } 
          return (
            <PrivateRoute
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        if(prop.path == '/login' && getUser() !== null){
          return (<Redirect from={prop.path} to='/busca' />);
        }
        return (
          <Route
            path={prop.path}
            component={prop.component}
            key={key}
          />
        );
    });
  };

  render() {
    return (
     <BrowserRouter>
      <Switch> 
      {this.getRoutes(routes)}
        {/* <Route path="/login" exact component={Login} />
        <PrivateRoute path="/cadastro_usuario" component={Cadastro} />
        <PrivateRoute path="/recuperar_senha" component={RecuSenha} />
        <PrivateRoute path="/cadastro_estudio" component={CadastroEstudio} />
        <PrivateRoute path="/cadastro_evento" component={CadastroEvento} />
        <PrivateRoute path="/redefinir_senha" component={RedefSenha} />
        <PrivateRoute path="/perfil_tatuador" component={PerfilTatuador} />
        <PrivateRoute path="/perfil_estudio" component={PerfilEstudio} />
        <PrivateRoute path="/agenda" component={Agenda} />
        <PrivateRoute path="/busca" component={Busca} /> */}
      </Switch>
     </BrowserRouter>
    );
  }
}

export default App;
