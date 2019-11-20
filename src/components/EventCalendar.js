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
          selectedEvent : {id: 0, clinte : '', time : ['15:30','18:00'], date: null, title : '', start : ''},
          newEvent : {id : 0, cliente : '', time : ['',''], date : null}
        }
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

    saveEvent(){
      toast.configure()
      if (this.state.newEvent.cliente != '' && this.state.newEvent.date != null && this.state.newEvent.time != ['','']) {
        const events = this.state.events;
        this.setState({newEvent : {
          id : events.length + 1,
          date : this.state.newEvent.date,
          time : this.state.newEvent.time,
          cliente : this.state.newEvent.cliente
        }});
        this.setState({events : [this.state.newEvent].concat(events)})
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

    showNewEvent(info) {
      this.setState({
        newEvent : {date : info.dateStr}
      })
      $('#addEvent').modal('show')
    }

    findEventById(event) {
      return this.state.events.find(event1 => {
        return event1.id === event.id
      })
    }

    editEvent (info) {
      const event = this.findEventById(info)
      this.setState({
        selectedEvent : {id: event.id, 
          clinte : event.cliente, 
          time : event.time, 
          date: event.date, 
          title : event.title, 
          start : event.start
        }
      })
      $('#editEvent').modal('show')
    }

        render () {
            return(
              <div>
                <FullCalendar defaultView="dayGridMonth"
                plugins={ [dayGridPlugin, interactionPlugin] } buttonText={{today : 'Hoje'}}
                header={{center : 'title', left : 'myCustomButton', right : 'today,prev,next'}}
                weekends={false} locale="pt-BR" weekends='true' fixedWeekCount={false} editable='true'
                customButtons = {{
                    myCustomButton: {
                      text: 'Agendar sessão',
                      click: () => {
                        $('#addEvent').modal('show');
                      }
                      }
                    }
                  }
                  eventClick = {event => {
                    this.editEvent(event)}
                  }
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
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form className="agenda">
                    <p>Data:&nbsp;&nbsp;
                    <SingleDatePicker
                      date={this.state.selectedEvent.date} // momentPropTypes.momentObj or null
                      displayFormat='DD/MM/YYYY'
                      numberOfMonths={1}
                      onDateChange={date => this.setState({ selectedEvent: {date : date} })} // PropTypes.func.isRequired
                      focused={this.state.editFocused} // PropTypes.bool
                      onFocusChange={({ focused }) => this.setState({ editFocused : focused })} // PropTypes.func.isRequired
                      id="edit" // PropTypes.string.isRequired,
                    /></p>
                    <p>Duração:&nbsp;&nbsp;
                    <TimeRangePicker disableClock='true'
                      onChange={this.handleInputChangeTime}
                      value={this.state.selectedEvent.time}
                    />
                    </p>
                    <p>Nome do cliente:&nbsp;&nbsp;
                    <input value={this.state.selectedEvent.cliente}
                    onChange={this.handleInputChangeNome} placeholder="Nome do cliente"></input>
                    </p>
                  </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="agendar" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="agendar">Salvar</button>
                  </div>
                </div>
              </div>
              </div>
              </div>
            )
        }

    }
