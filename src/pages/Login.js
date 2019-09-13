import React, { Component } from 'react';
import api from '../services/api';
import logo from '../images/logo.png';
import '../styles/Login.css';
import '../styles/General.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Login extends Component {

    state = {//variavel que armazena dados do componente para serem usados por ele, e caso alguma das informações mude o render() é executado novamente
        username: '',
        password: '',
        token: '',
    };

    handleSubmit = async (e) => { //método responsável por interceptar o submit do form
        e.preventDefault(); //evita comportamentos padrões do submit

        const email = this.state.username;
        const password = this.state.password;

        if (email === "") return;// verifica se algo foi digitado para continuar processamento
        if (password === "") return;

        await api.post('login/', {
            email,
            password
        }).then( response => {
            this.setState({token : response.data.access_token});
        })
        .catch(error => {
            alert(error.response.data.message);
        })
    };

    handleInputChange =  e => {
        this.setState({username : e.target.value});//armazena valor digitado no input no state
    };

    handleInputChangePass =  e => {
        this.setState({password : e.target.value});//armazena valor digitado no input no state
    };

  render() {
      return(
            <div className="wrapper">
                <ul className="navbar navbar-fixed-top justify-content-end">
                    <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Sobre nós</a></li>
                    <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Contato</a></li>
                </ul>
                <div className="wrapper-form login">
                    <img src={logo} alt="InkNeedle"/> 
                    <form onSubmit={this.handleSubmit} className="formulario formulario-login text-center">
                        <input className="m-2"
                        value={this.state.username}
                        placeholder='Email de usuário'
                        onChange={this.handleInputChange}
                        />
                        <input type="password" className="m-2"
                        value={this.state.password}
                        placeholder='Senha'
                        onChange={this.handleInputChangePass}
                        />
                        <button type='submit' onClick={this.handleSubmit}>Entrar</button>
                        <button className="subscribe-button" onClick={() => {this.props.history.push('/cadastro_usuario');}}>Cadastrar-se</button>
                        <a className="link mt-3 text-white" onClick={() => {this.props.history.push('/recuperar_senha');}}><u>Esqueceu sua senha?</u></a>
                    </form>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}
