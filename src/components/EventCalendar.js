import React, {Component} from 'react';
import '../styles/General.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify'
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
          events : [{ id: 1, cliente: 'Rodrigo Fonseca', time : ['15:30','18:00'], date: '2019-11-02', title : '', start : ''},
          { id: 2, cliente: 'Rodrigo Fonseca', time : ['15:30','18:00'], date: '2019-11-03', title : '', start : '' },
          { id: 3, cliente: 'Rodrigo Fonseca', time : ['15:30','18:00'], date: '2019-11-04', title : '', start : '' },
          { id: 4, cliente: 'Rodrigo Fonseca', time : ['15:30','18:00'], date: '2019-11-05', title : '', start : '' }],
          selectedEvent : {id: 0, cliente : '', time : ['',''], date: null, title : '', start : ''},
          newEvent : {id : 0, cliente : '', time : ['',''], date : null}
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

    componentDidMount() {
      this.state.events.map(event => {
        event.title = event.time[0] + ' - ' + event.cliente
        event.start = event.date
        const events = this.state.events.filter(e => event.id !== e.id);
        this.setState({events : [event].concat(events)})
      })
    }

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

    editEvent (info) {
      this.findEventById(info.event.id)
      $('#editEvent').modal('show')
    }

        render () {
            return(
              <div>
                <FullCalendar defaultView="dayGridMonth"
                plugins={ [dayGridPlugin, interactionPlugin] } buttonText={{today : 'Hoje'}}
                header={{center : 'title', left : 'myCustomButton', right : 'today,prev,next'}}
                weekends={false} locale="pt-BR" weekends='true' fixedWeekCount={false} editable='true'
                  eventClick = {event => {
                    this.editEvent(event)
                  }}
                events={this.state.events}
                dateClick={info => {
                  this.showNewEvent(info)
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
                    <form className="agenda">
                    <p>Data:&nbsp;&nbsp;
                    <SingleDatePicker
                      date={moment(this.state.newEvent.date)} // momentPropTypes.momentObj or null
                      displayFormat='DD/MM/YYYY'
                      numberOfMonths={1}
                      onDateChange={date => this.setState({ newEvent : {
                        date : date,
                        time : this.state.newEvent.time,
                        cliente : this.state.newEvent.cliente
                      } })} // PropTypes.func.isRequired
                      focused={this.state.focused} // PropTypes.bool
                      onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                      id="add" // PropTypes.string.isRequired,
                    /></p>
                    <p>Duração:&nbsp;&nbsp;
                    <TimeRangePicker className='border-0' disableClock='true'
                      onChange={this.handleInputChangeTime} format='HH:mm'
                      value={this.state.newEvent.time}
                    />
                    </p>
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
              </div>
            )
        }

    }
