import React, {Component} from 'react';
import api from '../services/api';
import NavbarNoLog from '../components/NavbarNoLog';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RecuSenha.css';
import '../styles/General.css';

export default class RedefSenha extends Component {

    state = {
        senha : '',
        confirmSenha : '',
        token : ''
    };

    componentDidMount () {
        this.setState({token : this.props.match.params.token});
    }

    handleInputChangeSenha = e => { //possibilita a edição do texto no input
        this.setState({senha : e.target.value});
    };

    handleInputChangeConfirmSenha = e => { //possibilita a edição do texto no input
        this.setState({confirmSenha : e.target.value});
    };

    handleSubmit = async (e) => { //envia as informações a serem salvar para o backend
        e.preventDefault();
        toast.configure()
        const password = this.state.senha;
        const token =  this.props.match.params.token;
        const confirmSenha = this.state.confirmSenha;
        if (password === confirmSenha) {
            await api.post("password-reset/", {token,password}).then( response => {
                toast.success("Senha redefinida com sucesso. Realize o login.",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                })
                this.props.history.push('/login');
            }).catch(error => {
                toast.error(error.response.data.message,{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                })
            });
        }else{
            toast.error("As senhas informadas não conferem, por favor informe novamente.",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
            this.setState({
                senha : '',
                confirmSenha : ''
            })
        }
    };

    render() { //renderiza html
        return (
            <div className="wrapper">
                <NavbarNoLog/>
                <div className="wrapper-form">
                    <div className="titulo">
                        <h1>Informe uma nova senha para seu cadastrado na <strong>InkNeedle!</strong></h1>
                    </div>
                    <form className="formulario">
                        <p>Nova Senha:&nbsp;<input type="password" value={this.state.senha}
                        onChange={this.handleInputChangeSenha} placeholder="Nova senha"></input></p>
                        <p>Confirme:&nbsp;<input type="password" value={this.state.confirmSenha}
                        onChange={this.handleInputChangeConfirmSenha} placeholder="Confirmação da senha"></input></p>
                        <button onClick={this.handleSubmit}>Redefinir Senha</button>
                    </form>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
        );
    }
}