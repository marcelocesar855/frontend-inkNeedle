import React, { Component } from 'react';
import { Card, Button, Profile } from "tabler-react";
import Rate from 'rc-rate';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PerfilTatuador.css';
import '../styles/General.css';
import '../styles/Tabler.css'
import '../styles/Stars.css'
import logo from '../images/logo2.png';
import test from '../images/teste.jpg';
import capa from '../images/RM_11.png';
import api from '../services/api';

export default class PerfilTatuador extends Component {

    state = {//variavel que armazena dados do componente para serem usados por ele, e caso alguma das informações mude o render() é executado novamente
        nomeTatuador : 'Marcelo César',
        descricaoTatuador : 'Sou um tatuador muito legal e extrovertido, no meu estúdio tem café, água e biscoito.'
    };

    handleSubmit = async (e) => { //método responsável por interceptar o submit do form
        e.preventDefault(); //evita comportamentos padrões do submit
    };

    handleInputChange =  e => {
    };

  render() {
      return(
            <div className="wrapper wrapper-perfil">
                <ul className="navbar navbar-fixed-top">
                   <img src={logo} alt="InkNeedle"/>
                    <ul className="justify-content-end">
                        <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Minha Conta</a></li>
                        <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Ajuda</a></li>
                    </ul>
                </ul>
                <Card className="card-profile resumo-perfil">
                    <Card.Header backgroundURL={capa}>
                    </Card.Header>
                <Card.Body className="text-center">
                    <Profile.Image className="card-profile-img" avatarURL={test}></Profile.Image>
                    <h2>{this.state.nomeTatuador}&nbsp;&nbsp;
                    <Rate defaultValue={5} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                    </h2>
                    <p>{this.state.descricaoTatuador}</p>
                </Card.Body>
                </Card>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}