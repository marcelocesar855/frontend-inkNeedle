import React, {Component} from 'react';
import {Form} from "tabler-react";
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
import moment from 'moment';

    export default class EventCalendar extends Component {
      constructor (props){
        super(props)
        this.state = {     
          focused : null,
          events : [{ id: 1, cliente: 'Rodrigo Fonseca', time : ['15:30','18:00'], date: '2019-11-02', title : '', start : ''},
          { id: 2, cliente: 'Rodrigo Fonseca', time : ['15:30','18:00'], date: '2019-11-03', title : '', start : '' },
          { id: 3, cliente: 'Rodrigo Fonseca', time : ['15:30','18:00'], date: '2019-11-04', title : '', start : '' },
          { id: 4, cliente: 'Rodrigo Fonseca', time : ['15:30','18:00'], date: '2019-11-05', title : '', start : '' }],
          newEventClient : {id : 0, cliente : '', date : null, obs : ''},
          rows : 1
        }
      }
    handleInputChangeNome = e => { //possibilita a edição do texto no input
      this.setState({newEventClient : {
        date : this.state.newEventClient.date,
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

    saveEvent = async () => {
      const delay = ms => new Promise(res => setTimeout(res, ms));
      toast.configure()
      if (this.state.newEventClient.cliente != '' && this.state.newEventClient.date != null) {
        const events = this.state.events;
        const newEvent =  {
          id : events.length + 1,
          date : this.state.newEventClient.date,
          cliente : this.state.newEventClient.cliente
        };
        newEvent.title = '--:-- - ' + newEvent.cliente
        newEvent.start = newEvent.date
        this.setState({events : [newEvent].concat(events)})
        this.setState({
           newEvent : {id : 0, cliente : '', date : null}
        })
         toast.success("Agendamento enviado para validação do tatuador.",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
            });
            await delay(5000)
            window.location.replace('/login');   
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

    handleInputChangeObs = e => { //possibilita a edição do texto no input
      const lineHeight = 20;
      const previousRows = e.target.rows;
      e.target.rows = 1;
      const currentRows = ~~(e.target.scrollHeight / lineHeight);
      if (currentRows === previousRows) {
          e.target.rows = currentRows;
      }
      this.setState({ newEventClient : {
          obs : e.target.value,
          date : this.state.newEventClient.date,
          cliente : this.state.newEventClient.cliente
        },
        rows : currentRows
      })
  };

    showNewEvent(info) {
      this.setState({
        newEventClient : {date : info.dateStr}
      })
      $('#addEvent').modal('show')
    }

        render () {
            return(
              <div className='m-5'>
                <FullCalendar defaultView="dayGridMonth"
                plugins={ [dayGridPlugin, interactionPlugin] } buttonText={{today : 'Hoje'}}
                header={{center : 'title', left : 'custom', right : 'today,prev,next'}}
                weekends={false} locale="pt-BR" weekends='true' fixedWeekCount={false}
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
                      date={moment(this.state.newEventClient.date)} // momentPropTypes.momentObj or null
                      displayFormat='DD/MM/YYYY'
                      numberOfMonths={1}
                      onDateChange={date => this.setState({ newEventClient : {
                        date : date,
                        cliente : this.state.newEventClient.cliente
                      } })} // PropTypes.func.isRequired
                      focused={this.state.focused} // PropTypes.bool
                      onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                      id="add" // PropTypes.string.isRequired,
                    /></p>
                    <p>Seu nome:&nbsp;&nbsp;
                    <input value={this.state.newEventClient.cliente}
                    onChange={this.handleInputChangeNome} placeholder="Nome do cliente"></input>
                    </p>
                    Observações:<br/><br/>
                    <Form.Textarea rows={this.state.rows}
                      className='mod-card-back-title' className="post"
                      onChange={this.handleInputChangeObs}
                      value={this.state.newEventClient.obs}
                      />
                  </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="agendar" data-dismiss="modal" onClick={() => {
                       this.setState({
                        newEventClient : {id : 0, cliente : '', time : ['',''], date : null}
                     })
                    }}>Cancelar</button>
                    <button type="button" class="agendar" onClick={() =>{
                      this.saveEvent()
                      $('#addEvent').modal('hide')
                    }}
                    >Enviar</button>
                  </div>
                </div>
              </div>
              </div>
              </div>
            )
        }

    }
