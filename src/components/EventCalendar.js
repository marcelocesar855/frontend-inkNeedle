import React, {Component} from 'react';
import '../styles/General.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import api from '../services/api';
import 'react-toastify/dist/ReactToastify.css';
import {SingleDatePicker} from 'react-dates';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import $ from 'jquery';
import 'bootstrap';
import '../styles/Agenda.css';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import moment from 'moment';
import trash from '../images/trash.png';

    export default class EventCalendar extends Component {
      constructor (props){
        super(props)
        this.state = {     
          focused : null,
          editFocused : null,
          receivedFocused : null,
          events : [{ id: 1, cliente: 'Rodrigo Fonseca', time : ['15:30','18:00'], date: '2019-11-02', title : '', start : ''},
          { id: 2, cliente: 'Rodrigo Fonseca', time : ['15:30','18:00'], date: '2019-11-03', title : '', start : '' },
          { id: 3, cliente: 'Rodrigo Fonseca', time : ['15:30','18:00'], date: '2019-11-04', title : '', start : '' },
          { id: 4, cliente: 'Rodrigo Fonseca', time : ['15:30','18:00'], date: '2019-11-05', title : '', start : '' }],
          selectedEvent : {id: 0, cliente : '', time : ['',''], date: null, title : '', start : ''},
          receivedEvent : {id: 0, cliente : '', time : ['',''], date: null, title : '', start : ''},
          newEvent : {id : 0, cliente : '', time : ['',''], date : null},
          cliente : '',
          estudios : [],
          estudio : 0
        }
        this.findEventById = this.findEventById.bind(this);
      }

    handleInputChangeTime = e => { //possibilita a edição do texto no input
      this.setState({newEvent: {
        date : this.state.newEvent.date,
        time : e,
        cliente : this.state.newEvent.cliente
      }});
    };

    handleInputChangeNome = e => { //possibilita a edição do texto no input
      this.setState({newEvent : {
        date : this.state.newEvent.date,
        time : this.state.newEvent.time,
        cliente : e.target.value
      }});
    };

    async componentDidMount() {
      this.state.events.map(event => {
        event.title = event.time[0] + ' - ' + event.cliente
        event.start = event.date
        const events = this.state.events.filter(e => event.id !== e.id);
        this.setState({events : [event].concat(events)})
      })
      await api.get(`/studios`)
        .then(res => {
            const estudios = res.data;
            this.setState({ estudios });
        })
    }

    handleInputChangeEstudio = e => { //possibilita a edição do texto no input
      this.setState({estudio : e.target.value});
    };

    handleInputChangeEstudioEdit = e => { //possibilita a edição do texto no input
      this.setState({selectedEvent : 
        {estudio : e.target.value}
      });
    };

    addEditedEvent () {
      toast.configure()
        const event = {
          id : this.state.selectedEvent.id,
          date : moment(this.state.selectedEvent.date).format('YYYY-MM-DD'),
          time : this.state.selectedEvent.time,
          cliente : this.state.selectedEvent.cliente
        };
        event.title = event.time[0] + ' - ' + event.cliente
        event.start = moment(event.date).format('YYYY-MM-DD')
        const events = this.state.events.filter(e => event.id !== e.id);
        this.setState({events : [event].concat(events)})
        this.setState({
            selectedEvent : {id : 0, cliente : '', time : ['',''], date : null}
        })
        $('#editEvent').modal('hide')
        toast.success('Sessão remarcada com sucesso.',{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
      })
    }

    saveEvent(){
      toast.configure()
      if (this.state.newEvent.cliente != '' && this.state.newEvent.date != null && this.state.newEvent.time != ['','']) {
        const events = this.state.events;
        const newEvent =  {
          id : events.length + 1,
          date : this.state.newEvent.date,
          time : this.state.newEvent.time,
          cliente : this.state.newEvent.cliente
        };
        newEvent.title = newEvent.time[0] + ' - ' + newEvent.cliente
        newEvent.start = newEvent.date
        this.setState({events : [newEvent].concat(events)})
        this.setState({
           newEvent : {id : 0, cliente : '', time : ['',''], date : null}
        })
        toast.success('Sessão marcada com sucesso.',{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
      })
      }else{
        toast.error('Todas as informações são necessárias para a marcação da sessão.',{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
      })
      }
    }

    deleteEvent () {
      const event = this.state.selectedEvent;
      const events = this.state.events.filter(e => event.id !== e.id);
      this.setState({
            events : events
      });
  }

    showNewEvent(info) {
      this.setState({
        newEvent : {date : info.dateStr}
      })
      $('#addEvent').modal('show')
    }

    findEventById(id) {
      return this.state.events.map( event => {
        if (event.id == id){
          this.setState({
            selectedEvent : {
              id: event.id,
              cliente : event.cliente,
              time : event.time,
              date: event.date
            }
          })
        }
      })
    }

    handleInputChangeCliente= e => { //possibilita a edição do texto no input
      this.setState({ 
          cliente : e.target.value
      })
    };

    editEvent (info) {
      this.findEventById(info.event.id)
      $('#editEvent').modal('show')
    }

        render () {
            return(
              <div className='m-5'>
                <FullCalendar defaultView="dayGridMonth"
                plugins={ [dayGridPlugin, interactionPlugin] } buttonText={{today : 'Hoje'}}
                header={{center : 'title', left : 'custom', right : 'today,prev,next'}}
                weekends={false} locale="pt-BR" weekends='true' fixedWeekCount={false} editable='true'
                  eventClick = {event => {
                    this.editEvent(event)
                  }}
                events={this.state.events}
                dateClick={info => {
                  this.showNewEvent(info)
                }}
                customButtons={{
                  custom: {
                    text: 'Disponibilizar agenda',
                    click: () => {
                      $('#disponiAgenda').modal('show');
                    }
                  }
                }}
                />
              <div class="modal fade" id="addEvent" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Agendar nova sessão</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form className="agenda combo-estudio">
                    <p>Data:&nbsp;&nbsp;
                    <SingleDatePicker
                      date={moment(this.state.newEvent.date)} 
                      displayFormat='DD/MM/YYYY'
                      numberOfMonths={1}
                      onDateChange={date => this.setState({ newEvent : {
                        date : date,
                        time : this.state.newEvent.time,
                        cliente : this.state.newEvent.cliente
                      } })} 
                      focused={this.state.focused} 
                      onFocusChange={({ focused }) => this.setState({ focused })} 
                      id="add" 
                    /></p>
                    <p>Duração:&nbsp;&nbsp;
                    <TimeRangePicker className='border-0' disableClock='true'
                      onChange={this.handleInputChangeTime} format='HH:mm'
                      value={this.state.newEvent.time}
                    />
                    </p>
                    <p>Estúdio:&nbsp;<select value={this.state.estudio} onChange={this.handleInputChangeEstudio}>
                        <option value="0" disabled>Selecione o estúdio</option>
                        {this.state.estudios.map(estudio => (
                          <option value={estudio.id}>{estudio.name}</option>
                          ))}
                    </select></p>
                    <p>Nome do cliente:&nbsp;&nbsp;
                    <input value={this.state.newEvent.cliente}
                    onChange={this.handleInputChangeNome} placeholder="Nome do cliente"></input>
                    </p>
                  </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="agendar" data-dismiss="modal" onClick={() => {
                       this.setState({
                        newEvent : {id : 0, cliente : '', time : ['',''], date : null}
                     })
                    }}>Cancelar</button>
                    <button type="button" class="agendar" onClick={() =>{
                      this.saveEvent()
                      $('#addEvent').modal('hide')
                    }}
                    >Salvar</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="editEvent" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Editar sessão</h3>
                    <div>
                      <button role="button" class="far fa-calendar-check btn"></button>
                      <button className='btn' onClick={() => {
                                  $('#deleteEvent').modal('show');
                              }}><img src={trash}></img></button>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                      </button>
                      </div>
                  </div>
                  <div class="modal-body">
                    <form className="agenda">
                    <p>Data:&nbsp;&nbsp;
                    <SingleDatePicker
                      date={moment(this.state.selectedEvent.date)} // momentPropTypes.momentObj or null
                      displayFormat='DD/MM/YYYY'
                      numberOfMonths={1}
                      onDateChange={date => this.setState({ selectedEvent: {
                        id : this.state.selectedEvent.id,
                        date : date,
                        time : this.state.selectedEvent.time,
                        cliente : this.state.selectedEvent.cliente
                      }})} // PropTypes.func.isRequired
                      focused={this.state.editFocused} // PropTypes.bool
                      onFocusChange={({ focused }) => this.setState({ editFocused : focused })} // PropTypes.func.isRequired
                      id="edit" // PropTypes.string.isRequired,
                    /></p>
                    <p>Duração:&nbsp;&nbsp;
                    <TimeRangePicker disableClock='true'
                      onChange={e => { //possibilita a edição do texto no input
                        this.setState({selectedEvent: {
                          id : this.state.selectedEvent.id,
                          date : this.state.selectedEvent.date,
                          time : e,
                          cliente : this.state.selectedEvent.cliente
                        }})}}
                      value={this.state.selectedEvent.time}
                    />
                    </p>
                    <p>Estúdio:&nbsp;<select value={this.state.selectedEvent.estudio} onChange={this.handleInputChangeEstudio}>
                        <option value="0" disabled>Selecione o estúdio</option>
                        {this.state.estudios.map(estudio => (
                          <option value={estudio.id}>{estudio.name}</option>
                          ))}
                    </select></p>
                    <p>Nome do cliente:&nbsp;&nbsp;
                    <input value={this.state.selectedEvent.cliente}
                    onChange={e => { //possibilita a edição do texto no input
                      this.setState({selectedEvent : {
                        id : this.state.selectedEvent.id,
                        date : this.state.selectedEvent.date,
                        time : this.state.selectedEvent.time,
                        cliente : e.target.value
                      }});
                    }} placeholder="Nome do cliente"></input>
                    </p>
                  </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="agendar" data-dismiss="modal" onClick={() => {
                      this.setState({
                        selectedEvent : {id : 0, cliente : '', time : ['',''], date : null}
                     })
                    }}>Cancelar</button>
                    <button type="button" class="agendar" onClick={() => {
                      this.addEditedEvent()
                    }}>Salvar</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="deleteEvent" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Desmarcar sessão</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h3>Você tem certeza que deseja desmarcar essa sessão?</h3>
                    <p><font color='red'>Obs: Essa ação não pode ser desfeita e o cliente será notificado da desmarcação.</font></p>
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                          this.deleteEvent();
                          $('#deleteEvent').modal('hide');
                          $('#editEvent').modal('hide')
                      }}>Sim</button>
                      <button className='agendar' onClick={() => {
                          $('#deleteEvent').modal('hide');
                      }}>Não</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="closeEvent" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Encerrar sessão</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h3>Ao encerrar esta sessão, ela entrará para seu histórico e o cliente atendido receberá um voucher para avaliar seus serviços, fornecendo um feedback para sua conta.</h3>
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                        toast.configure()
                        toast.success("Sessão encerrada. Em breve o novo feedback deverá aparecer em seu perfil.",{
                        position: "top-right",
                        autoClose: 7000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true
                        });
                          $('#closeEvent').modal('hide');
                          $('#editEvent').modal('hide')
                      }}>Encerrar</button>
                      <button className='agendar' onClick={() => {
                          $('#closeEvent').modal('hide');
                      }}>Cancelar</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="disponiAgenda" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Disponibilizar agenda para cliente</h3>
                    <div>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                      </button>
                      </div>
                  </div>
                  <div class="modal-body">
                  <input type="text" class="form-control"
                        value={this.state.cliente} onChange={this.handleInputChangeCliente} placeholder=' E-mail cliente'/>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="agendar" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="agendar" onClick={() => {
                          toast.configure()
                          toast.success("Agenda disponibilizada para marcação.",{
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true
                          });
                           $('#disponiAgenda').modal('hide');
                      }}>Enviar</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="validateEvent" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Validar agendamento enviado pelo cliente</h3>
                    <div>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                      </button>
                      </div>
                  </div>
                  <div class="modal-body">
                  <form className="agenda">
                    <p>Data:&nbsp;&nbsp;
                    <SingleDatePicker
                      date={moment(this.state.receivedEvent.date)} // momentPropTypes.momentObj or null
                      displayFormat='DD/MM/YYYY'
                      numberOfMonths={1}
                      onDateChange={date => this.setState({ receivedEvent: {
                        id : this.state.receivedEvent.id,
                        date : date,
                        time : this.state.receivedEvent.time,
                        cliente : this.state.receivedEvent.cliente
                      }})} // PropTypes.func.isRequired
                      focused={this.state.receivedFocused} // PropTypes.bool
                      onFocusChange={({ focused }) => this.setState({ receivedFocused : focused })} // PropTypes.func.isRequired
                      id="edit" // PropTypes.string.isRequired,
                    /></p>
                    <p>Duração:&nbsp;&nbsp;
                    <TimeRangePicker disableClock='true'
                      onChange={e => { //possibilita a edição do texto no input
                        this.setState({receivedEvent: {
                          id : this.state.receivedEvent.id,
                          date : this.state.receivedEvent.date,
                          time : e,
                          cliente : this.state.receivedEvent.cliente
                        }})}}
                      value={this.state.receivedEvent.time}
                    />
                    </p>
                    <p>Nome do cliente:&nbsp;&nbsp;
                    <input value={this.state.receivedEvent.cliente}
                    onChange={e => { //possibilita a edição do texto no input
                      this.setState({receivedEvent : {
                        id : this.state.receivedEvent.id,
                        date : this.state.receivedEvent.date,
                        time : this.state.receivedEvent.time,
                        cliente : e.target.value
                      }});
                    }} placeholder="Nome do cliente"></input>
                    </p>
                  </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="agendar" data-dismiss="modal" onClick={() => {
                      this.setState({
                        receivedEvent : {id : 0, cliente : '', time : ['',''], date : null}
                     })
                    }}>Recusar</button>
                    <button type="button" class="agendar" data-dismiss="modal" onClick={() => {
                      this.setState({
                        receivedEvent : {id : 0, cliente : '', time : ['',''], date : null}
                     })
                    }} aria-label="Desiponibilizar para marcação outra vez" data-balloon-pos="up">Pedir outra data</button>
                    <button type="button" class="agendar" onClick={() => {
                      this.addEditedEvent()
                    }}>Salvar</button>
                  </div>
                </div>
              </div>
              </div>
              </div>
            )
        }

    }
