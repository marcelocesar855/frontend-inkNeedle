import React, {Component} from 'react';
import api from '../services/api';
import '../styles/Cadastro.css';
import '../styles/General.css';
import InputMask from 'react-input-mask';

const initialState = {
    nome : '',
    tipo: 0,
    telefone : '',
    email : '',
    senha: '',
    confirmacao : ''
};

export default class Cadastro extends Component {

    state = {
        nome : '',
        tipo: 0,
        telefone : '',
        email : '',
        senha: '',
        confirmacao : ''
    };
    
    handleInputChangeNome = e => { //possibilita a edição do texto no input
        this.setState({nome : e.target.value});
    };

    handleInputChangeTipo = e => { //possibilita a edição do texto no input
        this.setState({tipo : e.target.value});
    };

    handleInputChangeTelefone = e => { //possibilita a edição do texto no input
        this.setState({telefone : e.target.value});
    };

    handleInputChangeEmail = e => { //possibilita a edição do texto no input
        this.setState({email : e.target.value});
    };

    handleInputChangeSenha = e => { //possibilita a edição do texto no input
        this.setState({senha : e.target.value});
    };

    handleInputChangeConfirmacao = e => { //possibilita a edição do texto no input
        this.setState({confirmacao : e.target.value});
    };
    
    handleSubmit = async (e) => { //envia as informações a serem salvar para o backend
        e.preventDefault();
        const nome = this.state.nome;
        const tipo = this.state.tipo;
        const telefone = this.state.telefone;
        const email = this.state.email;
        const senha = this.state.senha;
        const confirmacao = this.state.confirmacao;
        if(nome !== ''){
            if(tipo !== 0){
                if(telefone !== '' && telefone.length === 15){
                    if(email !== '' && email.indexOf('@') > 0 && email.indexOf('.' > 2)){
                        if(senha === confirmacao && senha !== '' && confirmacao !== '' && senha.length > 7){
                            //await api.post("users/", {nome,tipo,telefone,email,senha});
                            alert("Você receberá em breve no e-mail informado um link para validar seu cadastro na InkNeedle.");
                            if(tipo > 1) {
                                this.props.history.push('/cadastro_estudio');
                            }
                            this.setState(initialState);
                        }else{
                            this.setState({senha : ''});
                            this.setState({confirmacao : ''});
                            alert("As senhas informadas não são iguais.")
                        }
                    }else{
                        alert("Informe um endereço de e-mail válido.")
                    }
                }else{
                    alert("Informe um número de telefone válido.")
                }
            }else{
                alert("Escolha um tipo de perfil para seu cadastro.")
            }
        }else{
            alert("Informe seu nome.")
        }
    };

    callEstudio () {
    }

    render() { //renderiza html
        return (
            <div className="wrapper">
                <ul className="navbar navbar-fixed-top justify-content-end">
                    <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Sobre nós</a></li>
                    <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Contato</a></li>
                </ul>
                <div className="wrapper-form">
                    <div className="titulo">
                        <h1>Informe os seus dados abaixo para realizar seu cadastro na <strong>InkNeedle!</strong></h1>
                    </div>
                    <form className="formulario">
                        <p>Nome:&nbsp;<input value={this.state.nome}
                        onChange={this.handleInputChangeNome} placeholder="Nome completo"></input></p>
                        <p>Tipo:&nbsp;<select value={this.state.tipo} onChange={this.handleInputChangeTipo}>
                            <option value="0" disabled>Selecione o tipo de perfil</option>
                            <option value="1">Cliente</option>
                            <option value="2">Tatuador</option>
                        </select></p>
                        <p>Telefone:&nbsp;<InputMask type="text" value={this.state.telefone}
                        onChange={this.handleInputChangeTelefone} mask="(99) 99999-9999" maskChar="" placeholder="Número de telefone"></InputMask></p>
                        <p>Email:&nbsp;<input type="email" value={this.state.email}
                        onChange={this.handleInputChangeEmail} placeholder="E-mail"></input></p>
                        <p>Senha:&nbsp;<input type="password" value={this.state.senha}
                        onChange={this.handleInputChangeSenha} placeholder="Senha de acesso"></input></p>
                        <p>Confirmação:&nbsp;<input type="password" value={this.state.confirmacao}
                        onChange={this.handleInputChangeConfirmacao} placeholder="Confirmar senha de acesso"></input></p>
                        <button onClick={this.handleSubmit}>Efetuar cadastro</button>
                    </form>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
        );
    }
}