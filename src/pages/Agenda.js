import React, { Component } from 'react';
import moment from 'moment'
import api from '../services/api';
import '../styles/General.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Login extends Component {

    state = {//variavel que armazena dados do componente para serem usados por ele, e caso alguma das informações mude o render() é executado novamente
    };

    handleInputChange =  e => {

    };

  render() {
      return(
            <div className="wrapper">
                <ul className="navbar navbar-fixed-top justify-content-end">
                    <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Minha Conta</a></li>
                    <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Ajuda</a></li>
                </ul>
                <div className="wrapper wrapper-logado">
                <div className="container">
                <div className="row">
                </div>
                </div>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}
