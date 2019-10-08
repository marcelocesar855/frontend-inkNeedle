import React, {Component} from 'react';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RecuSenha.css';
import '../styles/General.css';

export default class RedefSenha extends Component {

    state = {
        senha : '',
        confirmSenha : ''
    };

    handleInputChangeSenha = e => { //possibilita a edição do texto no input
        this.setState({senha : e.target.value});
    };

    handleInputChangeConfirmSenha = e => { //possibilita a edição do texto no input
        this.setState({confirmSenha : e.target.value});
    };

    handleSubmit = async () => { //envia as informações a serem salvar para o backend
        const senha = this.state.senha;
        const confirmSenha = this.state.confirmSenha;
        if (senha === confirmSenha) {
            await api.post("users/", {senha});
            alert("Senha redefinida com sucesso. Realize o login.")
        }else{
            alert('As senhas informadas não conferem, por favor informe novamente.')
        }
    };

    render() { //renderiza html
        return (
            <div className="wrapper">
                <ul className="navbar navbar-fixed-top justify-content-end">
                    <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Sobre nós</a></li>
                    <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Contato</a></li>
                </ul>
                <div className="wrapper-form">
                    <div className="titulo">
                        <h1>Informe uma nova senha para seu cadastrado na <strong>InkNeedle!</strong></h1>
                    </div>
                    <form className="formulario">
                        <p>Nova Senha:&nbsp;<input type="password" value={this.state.senha}
                        onChange={this.handleInputChangeSenha} placeholder="Nova senha"></input></p>
                        <p>Confirme a senha:&nbsp;<input type="password" value={this.state.confirmSenha}
                        onChange={this.handleInputChangeConfirmSenha} placeholder="Confirmação da senha"></input></p>
                        <button onClick={this.handleSubmit}>Redefinir Senha</button>
                    </form>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
        );
    }
}