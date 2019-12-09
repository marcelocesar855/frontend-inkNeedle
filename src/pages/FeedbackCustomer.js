import React, { Component } from 'react';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Feedback.css';
import '../styles/General.css';
import NavbarNoLog from '../components/NavbarNoLog';
import Rate from 'rc-rate';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../services/api';
import moment from 'moment';

export default class FeedbackCustomer extends Component {

    state = {
        token: this.props.match.params.token,
        feedbackInfo: {
            date: '',
            hourStart: '',
            hourEnd: '',
            tattooArtist: {
                name: '',
                avatarUrl: null
            },            
            studio: {
                name: ''
            }            
        },
        feedback: {
            score: null,
            message: ''
        }
    };

    componentDidMount() {       
        this.getFeedback();
    }    

    async getFeedback() {
        const { token } = this.state;
        await api.post(`schedulings/feedback-valid`, { token })
        .then(res => {
            this.setState({ feedbackInfo: res.data });
        }).catch(error => {
            this.toastAlert(error.response.data.message, 'error');
            this.pushLogin();
        });
    }

    handleInputMessage = e => { 
        const { feedback } = this.state;       
        feedback.message = e.target.value;
        this.setState({ feedback });
    };

    handleInputChangeScore = score => { 
        const { feedback } = this.state;
        feedback.score = score;     
        this.setState({ feedback });
    };

    handleSubmitForm = async (e) => {
        e.preventDefault();

        const { feedback, token } = this.state;

        if (!feedback.score) {
            this.toastAlert('Informe a nota 0 a 5 para o tatuador.', 'error');
        }

        const data =  {
            token,
            score: feedback.score,
            message: feedback.message
        }

        await api.post('/schedulings/feedback', data)
        .then(res => {
            this.toastAlert(res.data.message, 'success');
            this.pushLogin();
        }).catch(error => {
            this.toastAlert(error.response.data.message, 'error');
        });
    }

    toastAlert(message, type = 'info') {
        toast.configure();
        const config = {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
        };

        switch (type) {
            case 'success':
                toast.success(message, config);
                break;
            case 'error':
                toast.error(message, config);
                break;
            case 'warn':
                toast.warn(message, config);
                break;
            case 'info':
                toast.info(message, config);
                break;
            default:
                toast.info(message, config);
                break;
        }
    }

    dateFormat(date) {
        return moment.utc(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }

    timeFormat(time) {
        return moment.utc(time, 'HH:mm:ss').format('HH:mm');
    }

    pushLogin() {
        this.props.history.push(`/login`);
    }

    render() { //renderiza html
        const { feedbackInfo } = this.state;
        return (
            <div className="wrapper">
                <NavbarNoLog />
                <div className="wrapper-form">
                    <div className="titulo">
                        <h1>Feedback <strong>InkNeedle!</strong></h1>
                    </div>
                    <div id="view-feedback" className="row">
                        <div className="col-md-12">
                            <div className="card" style={{ width: '18rem'}}>
                                <img className="card-img-top" src={feedbackInfo.tattooArtist.avatarUrl}></img>
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{feedbackInfo.tattooArtist.name}</h5>
                                        <p className="card-text">Estúdio: <strong>{feedbackInfo.studio.name}</strong> </p>
                                        <p className="card-text">
                                            Agendamento:
                                            <br/>
                                            Data: <strong>{this.dateFormat(feedbackInfo.date)}</strong>
                                            <strong>{this.timeFormat(feedbackInfo.hourStart)}</strong> - <strong>{this.timeFormat(feedbackInfo.hourEnd, 'hh:mm')}</strong>
                                        </p>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Feedback</h5>
                                        <form onSubmit={this.handleSubmitForm}>
                                            <div className="form-group text-center">
                                            <Rate className="ml-4" defaultValue={0} style={{ fontSize: 20 }} onChange={this.handleInputChangeScore} allowClear={false} required/>
                                            </div>
                                            <div className="form-group">
                                                <textarea className="form-control" maxLength="100" onChange={this.handleInputMessage} placeholder="Mensagem"></textarea>
                                            </div>
                                            <button className="btn btn-primary" type="submit">Enviar</button>
                                        </form>
                                    </div>
                            </div>                                                                               
                        </div>                       
                    </div>
                    
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
        );
    }
}