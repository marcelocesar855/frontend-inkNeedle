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

import api from '../services/api';
import Swal from 'sweetalert2'
import moment from 'moment';

export default class CadastroEvento extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studios: [],
            studioId: null,
            eventTypes: [],
            eventTypeId: null,
            name : '',            
            startDate : moment(),
            endDate : moment(),
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

    handleInputChangeName = e => { //possibilita a edição do texto no input
        this.setState({name : e.target.value});
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

        const { name, studioId, eventTypeId, selectedFile, startDate, endDate } = this.state;

        let description = this.state.description;

        let erro = '';     
 
        if(name !== ''){
            if (!!studioId){
                if (!!eventTypeId) {
                    if (description !== '') {    
                        description = `${description} | Data do evento ${startDate} - ${endDate}`                    
                        if (!!startDate){
                            await this.saveEvent();
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
        const { name, studioId, eventTypeId, selectedFile, description, startDate } = this.state;

        let url = `/studio-store-event`;

        const formData = new FormData();

        formData.append('title', name);
        formData.append('description', description);
        formData.append('studioId', studioId);
        formData.append('eventTypeId', eventTypeId);
        formData.append('dateHour', startDate);
        formData.append('file', selectedFile);

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

    render() { //renderiza html
        return (
            <div className="wrapper">
               <Navbar/>
                <div className="wrapper-form">
                    <div className="titulo mt-4">
                        <h1>Informe os dados abaixo para o cadastrar o evento a ser realizado</h1>
                    </div>
                    <form className="formulario mb-5" onSubmit={this.handleSubmit}>
                        <p>Nome:&nbsp;<input value={this.state.name}
                        onChange={this.handleInputChangeName} placeholder="Nome do evento"></input></p>
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
                        <p>Estúdio:&nbsp;
                        <select value={this.state.studioId} onChange={this.handleInputChangeStudio}>
                            <option value="">Sede do evento</option>
                            {this.state.studios.map(studio => {
                                return (<option value={studio.id}>{studio.name}</option>);
                            })}
                        </select></p>
                        <p>Tipo de Evento:&nbsp;
                        <select value={this.state.eventTypeId} onChange={this.handleInputChangeEventType}>
                            <option value="">Sede do evento</option>
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
