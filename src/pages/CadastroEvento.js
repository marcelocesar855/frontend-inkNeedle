import React, {Component} from 'react';
import api from '../services/api';
import '../styles/CadastroEstudio.css';
import '../styles/General.css';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'
import accounting from 'accounting-js'
import TimeRange from '../components/TimeSlider';
import CurrencyFormat from 'react-currency-format';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from 'moment';

export default class CadastroEvento extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome : '',
            value : {
                start : '00:00',
                end : '23:59'
            },
            estudio : null,
            startDate : moment(),
            endDate : moment(),
            precoEntrada : '',
            selectedFile : null,
            focusedInput : null
        };
        this.featureRef = React.createRef();
        this.handleInputChangeDuracao = this.handleInputChangeDuracao.bind(this);
        this.handleInputChangeDatas = this.handleInputChangeDatas.bind(this);
    }

    handleInputChangeNome = e => { //possibilita a edição do texto no input
        this.setState({nome : e.target.value});
    };

    handleInputChangeEstudio = e => { //possibilita a edição do texto no input
        this.setState({estudio : e.target.value});
    };

    handleInputChangeDatas ({ startDate, endDate }) { //possibilita a edição do texto no input
        this.setState({ startDate , endDate });
    };

    handleInputChangePrecoEntrada = e => { //possibilita a edição do texto no input
        this.setState({precoEntrada : e.target.value});
    };

    handleInputChangeDuracao(time) { //possibilita a edição do texto no input
        this.setState({value : time});
    };

    handleInputChangeBanner = e => { //possibilita a edição do texto no input
        this.setState({
            selectedFile : e.target.files[0]
        })
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
        const nome = this.state.nome;
        const estudio = this.state.estudio;
        const inicio = this.state.startDate;
        const fim = this.state.endDate;
        var precoEntrada = null;
        if (this.state.precoEntrada == '') {
            precoEntrada = 0.0
        }else {
            precoEntrada = accounting.unformat(this.state.precoEntrada, ',');
        }
        const {value} = this.state.value;
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        if(nome !== ''){
            if(estudio !== 0){
                if(inicio !== null && fim !== null){
                    if(value !== null){
                        await api.post("events/", {nome,estudio,inicio,fim,precoEntrada,value,data}).then(response => {
                            toast.success("Evento cadastrado com sucesso.",{
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true
                            })
                            this.props.history.push('/perfil_tatuador');
                        })
                    }else{
                        erro = "Informe o horário de realização do evento.";
                        this.pushErrorMessage(erro)
                    }
                }else{
                    erro = "Informe as datas do evento.";
                    this.pushErrorMessage(erro)
                }
            }else{
                erro = "Informe o estúdio sede do evento.";
                this.pushErrorMessage(erro)
            }
        }else{
            erro = "Informe o nome do evento.";
            this.pushErrorMessage(erro)
        }
    };

    render() { //renderiza html
        return (
            <div className="wrapper">
               <Navbar/>
                <div className="wrapper-form">
                    <div className="titulo mt-4">
                        <h1>Informe os dados abaixo para o cadastrar o evento a ser realizado</h1>
                    </div>
                    <form className="formulario mb-5">
                        <p>Nome:&nbsp;<input value={this.state.nome}
                        onChange={this.handleInputChangeNome} placeholder="Nome do evento"></input></p>
                            <p>Data:&nbsp;
                            <DateRangePicker
                                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                startDateId="startDate" // PropTypes.string.isRequired,
                                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                endDateId="endDate" // PropTypes.string.isRequired,
                                numberOfMonths={1} displayFormat="DD/MM/YYYY"
                                onDatesChange={this.handleInputChangeDatas} // PropTypes.func.isRequired,
                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                            />
                            </p>
                        <p>Estúdio:&nbsp;<select value={this.state.bodyPiercing} onChange={this.handleInputChangeBodyPiercing}>
                            <option value="0" disabled selected>Sede do evento</option>
                        </select></p>
                        <p>Preço:&nbsp;<CurrencyFormat type="text" value={this.state.precoEntrada}
                        onChange={this.handleInputChangePrecoEntrada} thousandSeparator="."
                        decimalSeparator="," decimalScale="2" prefix="R$ " fixedDecimalScale="true" placeholder="Grátis? Deixe em branco"></CurrencyFormat></p>
                        <div className="funcionamento">
                            <p>Duração:&nbsp;De&nbsp;{this.state.value.start}&nbsp;às&nbsp;{this.state.value.end}</p>
                            <TimeRange format={24} value={this.state.value} maxValue={"23:59"} minValue={"00:00"}
                            onChange={this.handleInputChangeDuracao} step={15} name={"time_range"}></TimeRange>
                        </div>
                        <div className="justify-content-center">
                            <div className="form-group files">
                                <div className="funcionamento">
                                    <p>Banner do evento:</p>
                                </div>
                                <input type="file" multiple=""
                                onChange={this.handleInputChangeBanner}></input>
                            </div>
	                    </div>
                        <button onClick={this.handleSubmit}>Cadastrar evento</button>
                    </form>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
        );
    }
}