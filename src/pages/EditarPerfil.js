import React, {Component} from 'react';
import api from '../services/api';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Cadastro.css';
import '../styles/General.css';
import { getUser } from '../services/auth';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from 'react-input-mask';
import avatarDefault from './../images/avatar.png';

const initialState = {
    user: getUser(),
    nome : '',
    telefone : '',
    email : '',
};

export default class EditarPerfil extends Component {

    state = {
        user : getUser(),
        nome : '',
        telefone : '',
        email : '',
    };

    componentDidMount() {
        const number =''
        if (this.state.user.phones.length > 0) {
            number = this.state.user.phones[0].number
        }
        this.setState({
            nome : this.state.user.name,
            telefone : number,
            email : this.state.user.email
        })
    }
    
    handleInputChangeNome = e => { //possibilita a edição do texto no input
        this.setState({nome : e.target.value});
    };

    handleInputChangeTelefone = e => { //possibilita a edição do texto no input
        this.setState({telefone : e.target.value});
    };

    handleInputChangeEmail = e => { //possibilita a edição do texto no input
        this.setState({email : e.target.value});
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

    handlePassword = async (e) => {
        e.preventDefault();
        toast.configure()
        const email = this.state.user.email;
        await api.post("password-recovery/", {email}).then( response => {
            toast.success("Você receberá em breve no seu e-mail um link para redefinir sua senha.",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
        })
    }
    
    handleSubmit = async (e) => { //envia as informações a serem salvar para o backend
        e.preventDefault();
        toast.configure();
        var erro = '';
        const name = this.state.nome;
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
        if(name !== ''){
            if(number !== '' && number.length === 15){
                if((email !== '' && email.indexOf('@') > 0 && email.indexOf('.' > 2))){
                    await api.post("users/", {name,userStatusId,phones,email}).then( response =>{
                        toast.success("Dados editados com sucesso.",{
                            position: "top-right",
                            autoClose: 5000,
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
                    erro = "Informe um endereço de e-mail válido.";
                    this.pushErrorMessage(erro);
                }
            }else{
                erro = "Informe um número de telefone válido.";
                this.pushErrorMessage(erro)
            }
        }else{
            erro ="Informe seu nome.";
            this.pushErrorMessage(erro)
        }
    };

    getAvatar() {
        const { user } = this.state;
        if(user != null){
            return (!!user.avatar.url ? user.avatar.url : avatarDefault);
        }
    }

    render() { //renderiza html
        return (
            <div className="wrapper">
                <Navbar avatar={this.getAvatar()}/>
                <div className="wrapper-form">
                    <div className="titulo">
                        <h1>Edição dos dados do seu cadastro na <strong>InkNeedle!</strong></h1>
                    </div>
                    <form className="formulario">
                        <p>Nome:&nbsp;<input value={this.state.nome}
                        onChange={this.handleInputChangeNome} placeholder="Nome completo"></input></p>
                        <p>Telefone:&nbsp;<InputMask type="text" value={this.state.telefone}
                        onChange={this.handleInputChangeTelefone} mask="(99) 99999-9999" maskChar="" placeholder="Número de telefone"></InputMask></p>
                        <p>Email:&nbsp;<input type="email" value={this.state.email}
                        onChange={this.handleInputChangeEmail} placeholder="E-mail"></input></p>
                        <button onClick={this.handleSubmit}>Alterar informações</button>
                        <button onClick={this.handlePassword}>Alterar senha</button>
                    </form>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
        );
    }
}
