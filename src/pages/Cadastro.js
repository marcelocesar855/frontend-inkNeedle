import React, {Component} from 'react';
import api from '../services/api';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Cadastro.css';
import '../styles/General.css';
import NavbarNoLog from '../components/NavbarNoLog';
import 'bootstrap/dist/css/bootstrap.min.css';
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

    pushErrorMessage (error) {
        toast.error(error,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
        })
    }
    
    handleSubmit = async (e) => { //envia as informações a serem salvar para o backend
        e.preventDefault();
        toast.configure();
        var erro = '';
        const name = this.state.nome;
        const userTypeId = this.state.tipo;
        const userStatusId = 2;
        const number = this.state.telefone;
        const phones = [{
            number : this.state.telefone,
            phoneTypeId : 0
        }]
        if (this.state.telefone.charAt(6) > 5){
            phones[0].phoneTypeId = 1
        }else{
            phones[0].phoneTypeId = 2
        }
        const email = this.state.email;
        const password = this.state.senha;
        const confirmacao = this.state.confirmacao;
        if(name !== ''){
            if(userTypeId !== 0){
                if(number !== '' && number.length === 15){
                    if((email !== '' && email.indexOf('@') > 0 && email.indexOf('.' > 2))){
                        if(password === confirmacao && password !== '' && confirmacao !== '' && password.length > 7){
                            await api.post("users/", {name,userTypeId,userStatusId,phones,email,password}).then( response =>{
                                toast.success("Você receberá em breve no e-mail informado um link para validar seu cadastro na InkNeedle.",{
                                    position: "top-right",
                                    autoClose: 7000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true
                                })
                                this.setState(initialState);
                                this.props.history.push('/login');
                            }
                            ).catch( error => {
                                this.pushErrorMessage(error);
                                this.setState({email : ''});
                            });                       
                        }else{
                            this.setState({
                                senha : '',
                                confirmacao: ''
                            });
                            erro = "As senhas informadas não são iguais.";
                            this.pushErrorMessage(erro);
                        }
                    }else{
                        erro = "Informe um endereço de e-mail válido.";
                        this.pushErrorMessage(erro);
                    }
                }else{
                    erro = "Informe um número de telefone válido.";
                    this.pushErrorMessage(erro)
                    
                }
            }else{
                erro = "Escolha um tipo de perfil para seu cadastro.";
                this.pushErrorMessage(erro)
            }
        }else{
            erro ="Informe seu nome.";
            this.pushErrorMessage(erro)
        }
    };

    render() { //renderiza html
        return (
            <div className="wrapper">
                <NavbarNoLog/>
                <div className="wrapper-form">
                    <div className="titulo">
                        <h1>Informe os seus dados abaixo para realizar seu cadastro na <strong>InkNeedle!</strong></h1>
                    </div>
                    <form className="formulario">
                        <p>Nome:&nbsp;<input value={this.state.nome}
                        onChange={this.handleInputChangeNome} placeholder="Nome completo"></input></p>
                        <p>Tipo:&nbsp;<select value={this.state.tipo} onChange={this.handleInputChangeTipo}>
                            <option value="0" disabled>Selecione o tipo de perfil</option>
                            <option value="2">Cliente</option>
                            <option value="1">Tatuador</option>
                        </select></p>
                        <p>Telefone:&nbsp;<InputMask type="text" value={this.state.telefone}
                        onChange={this.handleInputChangeTelefone} mask="(99) 99999-9999" maskChar="" placeholder="Número de telefone"></InputMask></p>
                        <p>Email:&nbsp;<input type="email" value={this.state.email}
                        onChange={this.handleInputChangeEmail} placeholder="E-mail"></input></p>
                        <p>Senha:&nbsp;<input type="password" value={this.state.senha}
                        onChange={this.handleInputChangeSenha} placeholder="Minímo 8 caracteres"></input></p>
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