import React, {Component} from 'react';
import '../styles/General.css'
import {SingleDatePicker} from 'react-dates';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import $ from 'jquery';
import 'bootstrap';
import '../styles/Agenda.css';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { nextTick } from 'q';
import moment from 'moment';

    export default class EventCalendar extends Component {

      state = {
        nome : '',
        date : moment(),        
        focused : null,
        editFocused : null,
        time: ['10:00', '11:00'],
        events : [{ id: 0, title: '19:30h - Rodrigo Fonseca', date: '2019-11-01' },
        { id: 1, title: '15:30h - Jessica Valadão', date: '2019-11-01' },
        { id: 2, title: '19:30h - Rodrigo Fonseca', date: '2019-11-01' },
        { id: 3, title: '15:30h - Jessica Valadão', date: '2019-11-01' }],
        selectedEvent : {id: 0, title: '', date: '' }
      }

      handleInputChangeDatas ({date}) { //possibilita a edição do texto no input
        this.setState({date : date});
    };

    handleInputChangeTime = e => { //possibilita a edição do texto no input
      this.setState({time : e});
    };

    handleInputChangeNome = e => { //possibilita a edição do texto no input
      this.setState({nome : e.target.value});
    };

    editEvent (info) {
      this.setState({
        selectedEvent : {
          id : info.event.id,
          title : info.event.title,
          date : moment(info.event.date)
        }
      })
      $('#editEvent').modal('show')
    }

        render () {
            return(
              <div>
                <FullCalendar defaultView="dayGridMonth"
                plugins={ [dayGridPlugin] } buttonText={{today : 'Hoje'}}
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
                  eventClick = {info => {
                    this.editEvent(info)}
                  }
                events={this.state.events}
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
                      date={this.state.date} // momentPropTypes.momentObj or null
                      displayFormat='DD/MM/YYYY'
                      numberOfMonths={1}
                      onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                      focused={this.state.focused} // PropTypes.bool
                      onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                      id="add" // PropTypes.string.isRequired,
                    /></p>
                    <p>Duração:&nbsp;&nbsp;
                    <TimeRangePicker disableClock='true'
                      onChange={this.handleInputChangeTime}
                      value={this.state.time}
                    />
                    </p>
                    <p>Nome do cliente:&nbsp;&nbsp;
                    <input value={this.state.nome}
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
              <div class="modal fade" id="editEvent" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
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
                      date={this.state.selectedEvent.date} // momentPropTypes.momentObj or null
                      displayFormat='DD/MM/YYYY'
                      numberOfMonths={1}
                      onDateChange={date => this.setState({ selectedEvent: {date : moment(date)} })} // PropTypes.func.isRequired
                      focused={this.state.editFocused} // PropTypes.bool
                      onFocusChange={({ focused }) => this.setState({ editFocused : focused })} // PropTypes.func.isRequired
                      id="edit" // PropTypes.string.isRequired,
                    /></p>
                    <p>Duração:&nbsp;&nbsp;
                    <TimeRangePicker disableClock='true'
                      onChange={this.handleInputChangeTime}
                      value={this.state.time}
                    />
                    </p>
                    <p>Nome do cliente:&nbsp;&nbsp;
                    <input value={this.state.selectedEvent.title}
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