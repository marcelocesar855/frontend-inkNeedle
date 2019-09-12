import React, {Component} from 'react';
import api from '../services/api';
import '../styles/RecuSenha.css';
import '../styles/General.css';

export default class RecuSenha extends Component {

    state = {
        email : ''
    };

    handleInputChangeEmail = e => { //possibilita a edição do texto no input
        this.setState({email : e.target.value});
    };

    handleSubmit = async () => { //envia as informações a serem salvar para o backend
        const email = this.state.email;
        await api.post("users/", {email});
        alert("Verifique sua caixa de e-mails.")
    };

    render() { //renderiza html
        return (
            <div className="wrapper">
                <nav className="navbar menu">
                        <li><a onClick={() => {this.props.history.push('/');}}>Contato</a></li>
                        <li><a onClick={() => {this.props.history.push('/');}}>Sobre nós</a></li>
                </nav>
                <div className="wrapper-form">
                    <div className="titulo">
                        <h1>Informe seu e-mail cadastrado na <strong>InkNeedle!</strong></h1>
                        <h2>Em breve você receberá nele um link para redefinir sua senha.</h2>
                    </div>
                    <form className="formulario">
                        <p>Email:&nbsp;<input type="email" value={this.state.email}
                        onChange={this.handleInputChangeEmail} placeholder="E-mail"></input></p>
                        <button onClick={this.handleSubmit}>Recuperar Senha</button>
                    </form>
                </div>
                <footer className="rodape">2019 - InkNeedle</footer>
            </div>
        );
    }
}