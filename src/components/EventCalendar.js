import React, {Component} from 'react';
import '../styles/General.css';
import {List, Media} from "tabler-react";
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import { getUser } from '../services/auth';
import api from '../services/api';
import ReactDOM from 'react-dom';
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
          user : getUser(),   
          focused : null,
          editFocused : null,
          receivedFocused : null,
          events : [],
          selectedEvent : {id: 0, cliente : '', time : ['',''], date: null, studio : {}, customer : {}, status : [{}]},
          receivedEvent : {id: 0, cliente : '', time : ['',''], date: null, title : '', start : ''},
          newEvent : {id : 0, cliente : 0, time : ['',''], date : null},
          estudios : [],
          estudio : 0,
          users : [],
          cliente : {name : ''}
        }
        this.findEventById = this.findEventById.bind(this);
      }

    handleInputChangeTime = e => { //possibilita a edição do texto no input
      this.setState({newEvent: {
        date : this.state.newEvent.date,
        time : e
      }});
    };

    handleEnterSearch = e => {
      if (e.key === 'Enter') {
          this.getClientes()
      }
   } 

   handleEnterSearchEdit = e => {
    if (e.key === 'Enter') {
        this.getClientesEdit()
    }
 } 

   async getClientes() {
     const search = this.state.cliente.name
    await api.post(`schedulings/customer-search`, {search}).then(
      res => {
        if (res.data.length > 0) {
        this.setState({ cliente : res.data[0] });
        toast.configure()
        toast.success(this.state.cliente.name + " vinculado a sessão.",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
          });
      }else{
        toast.configure()
      toast.error('Cliente não encontrado',{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
      });
      }
    })
}

async getClientesEdit() {
  const search = this.state.selectedEvent.customer.name
 await api.post(`schedulings/customer-search`, {search}).then(
   res => {
     if (res.data.length > 0) {
     this.setState({ selectedEvent : {
       customer : res.data[0],
       id : this.state.selectedEvent.id,
       date : this.state.selectedEvent.date,
       time : this.state.selectedEvent.time,
       studio : this.state.selectedEvent.studio,
       status : this.state.selectedEvent.status
      }});
     toast.configure()
     toast.success(this.state.selectedEvent.customer.name + " vinculado a sessão.",{
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true
       });
   }else{
     toast.configure()
   toast.error('Cliente não encontrado',{
   position: "top-right",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true
   });
   }
 })
}

    handleInputChangeNome = e => { //possibilita a edição do texto no input
      this.setState({newEvent : {
        date : this.state.newEvent.date,
        time : this.state.newEvent.time,
        cliente : e.target.value
      }});
    };

    handleInputChangeCliente = e => { //possibilita a edição do texto no input
      this.setState({newEvent : {cliente : e.target.value}});
    };


    async componentDidMount() {
      this.getSessions()
      this.getStudios()
    }

    async getStudios () {
      await api.get(`/studios-tattoo-artist/${this.state.user.id}`)
          .then(res => {
          this.setState({ estudios : res.data });
      })
  }

  handleInputChangeEstudioEdit  = e => { //possibilita a edição do texto no input
      this.setState({
        selectedEvent : { 
          id : this.state.selectedEvent.id,
          date : this.state.selectedEvent.date,
          time : this.state.selectedEvent.time,
          studio : { id : e.target.value},
          customer : this.state.selectedEvent.customer,
          status : this.state.selectedEvent.status
        }
      });
    };

    handleInputChangeEstudio = e => { //possibilita  a edição do texto no input
      this.setState(
        {estudio : e.target.value}
      );
    };

    async addEditedEvent () {
      toast.configure()
      if (this.state.selectedEvent.customer != {} && this.state.selectedEvent.date != null && this.state.selectedEvent.time != ['','']) {
        const id = this.state.selectedEvent.id
        const date = this.state.selectedEvent.date
        const hourStart = this.state.selectedEvent.time[0]
        const hourEnd = this.state.selectedEvent.time[1]
        const customerId = this.state.selectedEvent.customer.id
        const studioId = this.state.selectedEvent.studio.id
        await api.put('/schedulings/' + id,{
          date,
          hourStart,
          hourEnd,
          customerId,
          studioId
        })
        .then(res => {
            this.getSessions()
            this.setState({
              selectedEvent : {id: 0, cliente : '', time : ['',''], date: null, studio : {}, customer : {}}
           })
          toast.success('Sessão atualizada com sucesso.',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          })
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

    dateFormat(date) {
      return moment.utc(date).format('YYYY-MM-DD');
  }

    timeFormat(time) {
      return moment.utc(time, 'HH:mm:ss').format('HH:mm');
  }

    async getSessions() {
      await api.get('/schedulings/')
      .then(res => {
        this.setState({events : []})
          res.data.map(res => {
            var event = {
              id : res.id,
              date : this.dateFormat(res.date),
              time : [this.timeFormat(res.hourStart), this.timeFormat(res.hourEnd)],
              customer : res.customer,
              studio : res.studio,
              status : res.status,
              title : this.timeFormat(res.hourStart) + ' - ' + res.customer.name
            }
            const events = this.state.events;
            this.setState({events : [event].concat(events)})
          })
      })
    }

    async saveEvent(){
      toast.configure()
      if (this.state.cliente != {} && this.state.newEvent.date != null && this.state.newEvent.time != ['','']) {
        const date = this.state.newEvent.date
        const hourStart = this.state.newEvent.time[0]
        const hourEnd = this.state.newEvent.time[1]
        const customerId = this.state.cliente.id
        const studioId = this.state.estudio
        await api.post('/schedulings/',{
          date,
          hourStart,
          hourEnd,
          customerId,
          studioId
        })
        .then(res => {
            this.getSessions()
            this.setState({
              newEvent : {id : 0,time : ['',''], date : null}
           })
          toast.success('Sessão marcada com sucesso.',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          })
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

    async deleteEvent () {
      const id = this.state.selectedEvent.id;
      await api.post('/schedulings/'+ id + '/cancel')
      .then(res => {
          this.getSessions()
          this.setState({
            selectedEvent : {id: 0, cliente : '', time : ['',''], date: null, studio : {}, customer : {}}
         })
         toast.success('Sessão desmarcada com sucesso.',{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        })
      })
  }

    showNewEvent(info) {
      this.setState({
        newEvent : {date : info.dateStr}
      })
      $('#addEvent').modal('show')
    }

    cancelSession(id) {
      Swal.fire({
          title: 'Você tem certeza que deseja cancelar essa sessão?',
          text: "Você não poderá reverter isso e o cliente será notificado do cancelamento!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#FF8C00',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, cancelar!',
          cancelButtonText: 'Não',
          preConfirm: () => {
              let url = '/schedulings/'+ id +'/status';
              api({
                  method: 'put',
                  url,
                  data: {
                    schedulingStatusId: 2,
                    descritption: "Cancelada pelo tatuador"                  
                  }
              }).then((response) => {
                  Swal.fire(
                      'Cancelado!',
                      'Sessão cancelada com sucesso',
                      'success'
                  );
                  this.getSessions()
                  $('#editEvent').modal('hide')
              });
          },
      });
  }

  closeSession(id) {
    Swal.fire({
        title: 'Você tem certeza que deseja concluir essa sessão?',
        text: "Você não poderá reverter isso e o cliente receberá o convite para avalia-lo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF8C00',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, concluir!',
        cancelButtonText: 'Não',
        preConfirm: () => {
            let url = '/schedulings/'+ id +'/status';
            api({
                method: 'put',
                url,
                data: {
                  schedulingStatusId: 3,
                  descritption: "Concluída pelo tatuador"                  
                }
            }).then((response) => {
                Swal.fire(
                    'Concluida!',
                    'Sessão concluida com sucesso',
                    'success'
                );
                this.getSessions()
                $('#editEvent').modal('hide')
            });
        },
    });
    
}

    findEventById(id) {
      return this.state.events.map( event => {
        if (event.id == id){
          this.setState({
            selectedEvent : event
          })
        }
      })
    }

    handleInputChangeCliente= e => { //possibilita a edição do texto no input
      this.setState({ 
          cliente : {name : e.target.value}
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
                        time : this.state.newEvent.time
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
                    <p>Pesquisar cliente:&nbsp;&nbsp;
                    <input value={this.state.cliente.name} onKeyPress={this.handleEnterSearch}
                    onChange={this.handleInputChangeCliente} placeholder="Email do cliente"></input>
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
                  <h3 class="modal-title" id="TituloModalCentralizado">Editar sessão</h3>&nbsp;<small>{this.state.selectedEvent.status[this.state.selectedEvent.status.length - 1].description}</small>
                    <div>
                      <button role="button" class="far fa-calendar-check btn" onClick={() => {
                                  this.closeSession(this.state.selectedEvent.id)
                              }}></button>
                      <button className='btn' onClick={() => {
                                  this.cancelSession(this.state.selectedEvent.id)
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
                        studio : this.state.selectedEvent.studio,
                        customer : this.state.selectedEvent.customer,
                        status : this.state.selectedEvent.status
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
                          studio : this.state.selectedEvent.studio,
                          customer : this.state.selectedEvent.customer,
                          status : this.state.selectedEvent.status
                        }})}}
                      value={this.state.selectedEvent.time} format='HH:mm'
                    />
                    </p>
                    <p>Estúdio:&nbsp;<select value={this.state.selectedEvent.studio.id} onChange={this.handleInputChangeEstudioEdit}>
                        <option value="0" disabled>Selecione o estúdio</option>
                        {this.state.estudios.map(estudio => (
                          <option value={estudio.id}>{estudio.name}</option>
                          ))}
                    </select></p>
                    <p>Nome do cliente:&nbsp;&nbsp;
                    <input value={this.state.selectedEvent.customer.name} onKeyPress={this.handleEnterSearchEdit}
                    onChange={e => { //possibilita a edição do texto no input 
                      this.setState({selectedEvent : {
                        id : this.state.selectedEvent.id,
                        date : this.state.selectedEvent.date,
                        time : this.state.selectedEvent.time,
                        customer : {name : e.target.value},
                        studio : this.state.selectedEvent.studio,
                        status : this.state.selectedEvent.status
                      }});
                    }} placeholder="Email do cliente"></input>
                    </p>
                  </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="agendar" data-dismiss="modal" onClick={() => {
                    }}>Cancelar</button>
                    <button type="button" class="agendar" onClick={() => {
                      this.addEditedEvent()
                      $('#editEvent').modal('hide')
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
