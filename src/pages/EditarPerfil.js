import React, {Component} from 'react';
import api from '../services/api';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Cadastro.css';
import '../styles/General.css';
import { getUser, setUser } from '../services/auth';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from 'react-input-mask';
import avatarDefault from './../images/avatar.png';

export default class EditarPerfil extends Component {

    state = {
        user : getUser(),
        name : '',
        phone : '',
        email : '',
    };

    componentDidMount() {
        const phones = this.state.user.phones;
        let number = null;

        if (phones.length > 0) {
            number = phones[0].number;
        }

        this.setState({
            name : this.state.user.name,
            phone : number,
            email : this.state.user.email
        })
    }
    
    handleInputChangeNome = e => { 
        this.setState({ name : e.target.value });
    };

    handleInputChangeTelefone = e => { 
        this.setState({ phone : e.target.value });
    };

    handleInputChangeEmail = e => { 
        this.setState({ email : e.target.value });
    };

    pushErrorMessage (error) {
        toast.error(error,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
        });
    }

    handlePassword = async (e) => {
        e.preventDefault();
        toast.configure()
        const email = this.state.user.email;
        await api.post("password-recovery/", { email }).then( response => {
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
        const { name, phone, email} = this.state;

        const phones = [{
            number: phone,
            phoneTypeId : 1
        }];

        if (phone.charAt(6) > 5){
            phones[0].phoneTypeId = 1
        }else{
            phones[0].phoneTypeId = 2
        }

        if(name !== ''){
            if(phone !== ''){
                if((email !== '' && email.indexOf('@') > 0 && email.indexOf('.' > 2))){
                    await api.put("users/", {name, phones, email}).then( response =>{
                        toast.success("Dados editados com sucesso.",{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true
                        });
                        setUser({ name, phones, email });
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
                this.pushErrorMessage(erro);
            }
        }else{
            erro ="Informe seu nome.";
            this.pushErrorMessage(erro);
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
                    <form onSubmit={this.handleSubmit} className="formulario">
                        <p>Nome:&nbsp;<input value={this.state.name}
                        onChange={this.handleInputChangeNome} placeholder="Nome completo"></input></p>
                        <p>Telefone:&nbsp;<InputMask type="text" value={this.state.phone}
                        onChange={this.handleInputChangeTelefone} mask="(99) 99999-9999" maskChar="" placeholder="Número de telefone"></InputMask></p>
                        <p>Email:&nbsp;<input type="email" value={this.state.email}
                        onChange={this.handleInputChangeEmail} placeholder="E-mail"></input></p>
                        <button type="submit">Alterar informações</button>
                        <button onClick={this.handlePassword} type="button">Alterar senha</button>
                    </form>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
        );
    }
}
