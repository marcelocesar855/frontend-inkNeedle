import React, {Component} from 'react';
import '../styles/CadastroEstudio.css';
import { Form } from "tabler-react";
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
import {getUser} from '../services/auth';
import avatarDefault from './../images/avatar.png';

import api from '../services/api';
import Swal from 'sweetalert2'
import moment from 'moment';

export default class CadastroEvento extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : getUser(),
            studios: [],
            studioId: null,
            eventTypes: [],
            eventTypeId: null,
            title : '', 
            price : '',           
            dateStart : moment(),
            dateEnd : moment(),
            timeStart: null,
            timeEnd: null,
            selectedFile : null,
            focusedInput : null,
            description : '',
            rows : 2,
        };
        this.featureRef = React.createRef();
        this.handleInputChangeDuracao = this.handleInputChangeDuracao.bind(this);
        this.handleInputChangeDatas = this.handleInputChangeDatas.bind(this);
    }

    componentDidMount() {
        this.getStudios();        
        this.getEventTypes();        
    }

    getStudios() {
        api.get(`/studios`)
        .then(res => {
            const studios = res.data;
            this.setState({ studios });
        })
    }

    getEventTypes() {
        api.get(`/event-types`)
        .then(res => {
            const eventTypes = res.data;
            this.setState({ eventTypes });
        })
    }

    handleInputChangeTitle = e => { //possibilita a edição do texto no input
        this.setState({title : e.target.value});
    };

    handleInputChangePrice = e => { //possibilita a edição do texto no input
        this.setState({price : e.target.value});
    };

    handleInputChangeStudio = e => { //possibilita a edição do texto no input
        this.setState({studioId : e.target.value});
    };
    handleInputChangeEventType = e => { //possibilita a edição do texto no input
        this.setState({eventTypeId : e.target.value});
    };

    handleInputChangeEstudio = e => { //possibilita a edição do texto no input
        this.setState({studioId : e.target.value});
    };

    handleInputChangeDatas ({ startDate, endDate }) { //possibilita a edição do texto no input
        this.setState({ startDate , endDate });
    };

    handleInputTimeStart = e => { //possibilita a edição do texto no input
        this.setState({ timeStart: e.target.value });
    };

    handleInputTimeEnd = e => { //possibilita a edição do texto no input
        this.setState({ timeEnd: e.target.value });
    };

    handleInputChangeDescritption = e => { //possibilita a edição do texto no input
        const lineHeight = 20;
        const previousRows = e.target.rows;
        e.target.rows = 1;
        const currentRows = ~~(e.target.scrollHeight / lineHeight);

        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }

        this.setState({ 
            description : e.target.value,
            rows : currentRows
        })
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

        const { 
            title,
            description,
            dateStart,
            dateEnd,
            timeStart,
            timeEnd,
            price,
            studioId,
            eventTypeId
        } = this.state;

        let erro = '';     
 
        if(title !== ''){
            if (!!studioId){
                if (!!eventTypeId) {
                    if (description !== '') {    
                        if (!!dateStart){
                            if (!!timeStart) {
                                await this.saveEvent();
                            } else {
                                erro = "Informe o início do evento";
                            }
                            
                        }else{
                            erro = "Informe a data do evento";
                        }
                    } else {
                        erro = "Informe a descrição sede do evento.";
                    }
                } else {
                    erro = "Informe o tipo de evento.";
                }               
                
            }else{
                erro = "Informe o estúdio sede do evento.";
            }
        }else{
            erro = "Informe o nome do evento.";
        }

        if(!!erro) {
            Swal.fire({
                title: 'Validação!',
                text: erro,
                icon: 'danger',
                showCancelButton: false,
                confirmButtonColor: '#FF8C00',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok',
            });
        }        
    };

    saveEvent() {
        const {
            title,
            description,
            dateStart,
            dateEnd,
            timeStart,
            timeEnd,
            price,
            studioId,
            eventTypeId,
            selectedFile
        } = this.state;

        let url = `/studio-store-event`;

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('dateStart', dateStart);
        formData.append('dateEnd', dateEnd);
        formData.append('timeStart', timeStart);
        formData.append('timeEnd', timeEnd);
        formData.append('studioId', studioId);
        formData.append('eventTypeId', eventTypeId);
        formData.append('file', selectedFile);
        formData.append('price', accounting.unformat(price));


        api({
            method: 'post',
            url,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then((response) => {
                Swal.fire(
                    'Adicionado!',
                    'Evento adicionada com sucesso',
                    'success'
                ).then((res) => {
                    this.props.history.push(`/meu_estudio/${studioId}`);
                });
            })
            .catch((response) => {
                console.log(response);
            });
    }

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
                    <div className="titulo mt-4">
                        <h1>Informe os dados abaixo para o cadastrar o evento a ser realizado</h1>
                    </div>
                    <form className="formulario mb-5" onSubmit={this.handleSubmit}>
                        <p>Nome:&nbsp;<input value={this.state.title}
                        onChange={this.handleInputChangeTitle} placeholder="Nome do evento"></input></p>
                            <p>Data:&nbsp;
                            <DateRangePicker
                                startDate={this.state.dateStart} // momentPropTypes.momentObj or null,
                                startDateId="startDate" // PropTypes.string.isRequired,
                                endDate={this.state.dateEnd} // momentPropTypes.momentObj or null,
                                endDateId="endDate" // PropTypes.string.isRequired,
                                numberOfMonths={1} displayFormat="DD/MM/YYYY"
                                onDatesChange={this.handleInputChangeDatas} // PropTypes.func.isRequired,
                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                            />
                        </p>
                        <p>Início:&nbsp;<CurrencyFormat type="text" onChange={this.handleInputTimeStart} format="##:##" placeholder="00:00"></CurrencyFormat></p>
                        <p>Termino:&nbsp;<CurrencyFormat type="text" onChange={this.handleInputTimeEnd} format="##:##" placeholder="00:00"></CurrencyFormat></p>
                        <p>Preço R$:&nbsp;<CurrencyFormat type="text" value={this.state.price}
                        onChange={this.handleInputChangePrice} thousandSeparator="."
                        decimalSeparator="," decimalScale="2" prefix="R$ " fixedDecimalScale="true" placeholder="Grátis? Deixe em branco"></CurrencyFormat></p>
                        <p>Estúdio:&nbsp;
                        <select value={this.state.studioId} onChange={this.handleInputChangeStudio}>
                            <option value="">Sede do evento</option>
                            {this.state.studios.map(studio => {
                                return (<option value={studio.id}>{studio.name}</option>);
                            })}
                        </select></p>
                        <p>Tipo de Evento:&nbsp;
                        <select value={this.state.eventTypeId} onChange={this.handleInputChangeEventType}>
                            <option value="">Tipo do evento</option>
                            {this.state.eventTypes.map(studio => {
                                return (<option value={studio.id}>{studio.name}</option>);
                            })}
                        </select></p>               
                        <Form.Textarea rows={this.state.rows} id='desc' onChange={this.handleInputChangeDescritption}
                            placeholder="Descrição do evento"
                        value={this.state.description} className="post my-3"
                        />
                        <div className="justify-content-center">
                            <div className="form-group files">
                                <div className="funcionamento">
                                    <p>Banner do evento:</p>
                                </div>
                                <input type="file" multiple=""
                                onChange={this.handleInputChangeBanner}></input>
                            </div>
	                    </div>
                        <button type="submit">Cadastrar evento</button>
                    </form>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
        );
    }
}
