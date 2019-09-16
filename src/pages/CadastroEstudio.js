import React, {Component} from 'react';
import api from '../services/api';
import '../styles/CadastroEstudio.css';
import '../styles/General.css';
import InputMask from 'react-input-mask';
import TimeRange from '../components/TimeSlider';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Cadastro extends Component {

    constructor(props) {
        if (typeof window !== 'undefined') {
            window.React = React;
        }
        super(props);
        this.state = {
            nome : '',
            value : {
                start : '00:00',
                end : '23:59'
            },
            telefone : '',
            bodyPiercing : false,
            cep : '',
            endereco : '',
            numero : '',
            complemento: '',
            selectedFile : null
        };
        this.featureRef = React.createRef();
        this.handleInputChangeFuncionamento = this.handleInputChangeFuncionamento.bind(this);
    }

    handleInputChangeNome = e => { //possibilita a edição do texto no input
        this.setState({nome : e.target.value});
    };

    handleInputChangeCEP = e => { //possibilita a edição do texto no input
        this.setState({cep : e.target.value});
    };

    handleInputChangeEndereco = e => { //possibilita a edição do texto no input
        this.setState({endereco : e.target.value});
    };

    handleInputChangeNumero = e => { //possibilita a edição do texto no input
        this.setState({numero : e.target.value});
    };

    handleInputChangeComplemento = e => { //possibilita a edição do texto no input
        this.setState({complemento : e.target.value});
    };

    handleInputChangeFuncionamento(time) { //possibilita a edição do texto no input
        this.setState({value : time});
    };

    handleInputChangeTelefone = e => { //possibilita a edição do texto no input
        this.setState({telefone : e.target.value});
    };

    handleInputChangeBodyPiercing = e => { //possibilita a edição do texto no input
        this.setState({bodyPiercing : e.target.value});
    };

    handleInputChangeCertificado = e => { //possibilita a edição do texto no input
        console.log(e.target.files[0]);
        this.setState({
            selectedFile : e.target.files[0],
            loaded : 0
        })
        console.log(this.state.selectedFile);
    };

    handleSubmit = async (e) => { //envia as informações a serem salvar para o backend
        e.preventDefault();
        const nome = this.state.nome;
        const endereco = this.state.endereco;
        const numero = this.state.numero;
        const complemento = this.state.complemento;
        const cep = this.state.cep;
        const {value} = this.state.value;
        const telefone = this.state.telefone;
        const bodyPiercing = this.state.bodyPiercing;
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        if(nome !== ''){
            if(endereco !== ''){
                if(numero !== ''){
                    if(cep !== ''){
                        if(value !== null){
                            if(data !== null){
                                await api.post("users/", {nome,endereco,numero,complemento,cep,value,telefone,bodyPiercing,data});
                            }else{
                                alert("Envie uma cópia do seu certificado da Anvisa de Biosegurança para validarmos o value do estúdio!")
                            }
                        }else{
                            this.state.hrFuncionamento = '';
                            alert("Informe o horário de value do estúdio.")
                        }
                    }else{
                        alert("Informe um CEP válido.")
                    }
                }else{
                    alert("Informe o número do lote/loja.")
                }
            }else{
                alert("Informe o endereço do estúdio.")
            }
        }else{
            alert("Informe o nome do estúdio.")
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
                    <div className="titulo mt-4">
                        <h1>Informe os dados abaixo para o cadastrar o seu primeiro estúdio na <strong>InkNeedle!</strong></h1>
                    </div>
                    <form className="formulario mb-5">
                        <p>Nome:&nbsp;<input value={this.state.nome}
                        onChange={this.handleInputChangeNome} placeholder="Nome do estúdio"></input></p>
                        <div className="funcionamento">
                            <p>Funcionamento:&nbsp;De&nbsp;{this.state.value.start}&nbsp;às&nbsp;{this.state.value.end}</p>
                            <TimeRange format={24} value={this.state.value} maxValue={"23:59"} minValue={"00:00"}
                            onChange={this.handleInputChangeFuncionamento} step={15} name={"time_range"}></TimeRange>
                        </div>
                        <p>Telefone:&nbsp;<InputMask type="text" value={this.state.telefone}
                        onChange={this.handleInputChangeTelefone} mask="(99) 99999-9999" maskChar="" placeholder="Telefone do estúdio"></InputMask></p>
                        <p>Body Piercing:&nbsp;<select value={this.state.bodyPiercing} onChange={this.handleInputChangeBodyPiercing}>
                            <option value="false" disabled>Realiza Body Piercing?</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select></p>
                        <p>CEP:&nbsp;<InputMask type="text" value={this.state.cep}
                        onChange={this.handleInputChangeCep} mask="99.999-999" maskChar="" placeholder="CEP do estúdio"></InputMask></p>
                        <p>Endereço:&nbsp;<input type="text" value={this.state.endereco}
                        onChange={this.handleInputChangeEndereco} placeholder="Endereço do estúdio"></input></p>
                        <p>Número:&nbsp;<input type="number" value={this.state.numero}
                        onChange={this.handleInputChangeNumero} placeholder="Número lote/loja"></input></p>
                        <p>Complemento:&nbsp;<input type="text" value={this.state.complemento}
                        onChange={this.handleInputChangeComplemento} placeholder="Complemento do endereço"></input></p>
                        <div class="justify-content-center">
                            <div className="form-group files">
                                <div className="funcionamento">
                                    <p>Certificado Anvisa:</p>
                                </div>
                                <input type="file" multiple=""
                                onChange={this.handleInputChangeCertificado}></input>
                            </div>
	                    </div>
                        <button onClick={this.handleSubmit}>Cadastrar estúdio</button>
                    </form>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
        );
    }
}