import React, {Component} from 'react';
import api from '../services/api';
import '../styles/CadastroEstudio.css';
import '../styles/General.css';
import InputMask from 'react-input-mask';
import TimeRange from '../components/TimeSlider';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Cadastro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome : '',
            value : {
                start : '00:00',
                end : '23:59'
            },
            estudio : null,
            data : '',
            entradaFranca : true,
            diasEvento : 1,
            precoEntrada : 0.0,
            selectedFile : null
        };
        this.featureRef = React.createRef();
        this.handleInputChangeDuracao = this.handleInputChangeDuracao.bind(this);
    }

    handleInputChangeNome = e => { //possibilita a edição do texto no input
        this.setState({nome : e.target.value});
    };

    handleInputChangeEstudio = e => { //possibilita a edição do texto no input
        this.setState({estudio : e.target.value});
    };

    handleInputChangeData = e => { //possibilita a edição do texto no input
        this.setState({data : e.target.value});
    };

    handleInputChangeEntradaFranca = e => { //possibilita a edição do texto no input
        this.setState({entradaFranca : e.target.value});
    };

    handleInputChangePrecoEntrada = e => { //possibilita a edição do texto no input
        this.setState({precoEntrada : e.target.value});
    };

    handleInputChangeDuracao(time) { //possibilita a edição do texto no input
        this.setState({value : time});
    };

    handleInputChangeDiasEvento = e => { //possibilita a edição do texto no input
        this.setState({diasEvento : e.target.value});
    };

    handleInputChangeBanner = e => { //possibilita a edição do texto no input
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
        const estudio = this.state.estudio;
        const dataEvento = this.state.data;
        const entradaFranca = this.state.entradaFranca;
        const precoEntrada = this.state.precoEntrada;
        const diasEvento = this.state.diasEvento;
        const {value} = this.state.value;
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        if(nome !== ''){
            if(estudio !== ''){
                if(dataEvento !== ''){
                    if(diasEvento > 0){
                        if(value !== null){
                            await api.post("events/", {nome,estudio,dataEvento,entradaFranca,precoEntrada,value,data});
                        }else{
                            this.state.hrFuncionamento = '';
                            alert("Informe o horário de realização do evento.")
                        }
                    }else{
                        alert("Informe quantos dias o evento irá durar.")
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