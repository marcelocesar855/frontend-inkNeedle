import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import RecuSenha from './pages/RecuSenha';
import CadastroEstudio from './pages/CadastroEstudio';

class App extends Component {
  render() {
    return (
     <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/cadastro_usuario" component={Cadastro} />
        <Route path="/recuperar_senha" component={RecuSenha} />
        <Route path="/cadastro_estudio" component={CadastroEstudio} />
      </Switch>
     </BrowserRouter>
    );
  }
}

export default App;
