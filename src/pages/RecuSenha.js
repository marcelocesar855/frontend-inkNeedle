import React, {Component} from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import NavbarNoLog from '../components/NavbarNoLog'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RecuSenha.css';
import '../styles/General.css';

export default class RecuSenha extends Component {

    state = {
        email : ''
    };

    handleInputChangeEmail = e => { //possibilita a edição do texto no input
        this.setState({email : e.target.value});
    };

    handleSubmit = async (e) => { //método responsável por interceptar o submit do form
         e.preventDefault();
        toast.configure()
        const email = this.state.email;
        await api.post("password-recovery/", {email}).then( response => {
            toast.success("Você receberá em breve no seu e-mail um link para redefinir sua senha.",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
        this.props.history.push('/login');
        })
    };

    render() { //renderiza html
        return (
            <div className="wrapper">
                <NavbarNoLog/>
                <div className="wrapper-form">
                    <div className="titulo">
                        <h1>Informe seu e-mail cadastrado na <strong>InkNeedle!</strong></h1>
                        <h2 className="subtitulo">Em breve você receberá nele um link para redefinir sua senha.</h2>
                    </div>
                    <form className="formulario">
                        <p>Email:&nbsp;<input type="email" value={this.state.email}
                        onChange={this.handleInputChangeEmail} placeholder="E-mail"></input></p>
                        <button onClick={this.handleSubmit}>Recuperar Senha</button>
                    </form>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
        );
    }
}