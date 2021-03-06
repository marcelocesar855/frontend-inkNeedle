import React, { Component } from 'react';
import {Clickable} from 'react-clickable';
import { getUser, setAvatarUser } from '../services/auth';
import { Card, Profile, List, Media, Avatar, Form, GalleryCard, Grid, Button} from "tabler-react";
import $ from 'jquery';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Rate from 'rc-rate';

import Moment from 'moment';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PerfilTatuador.css';
import '../styles/General.css';
import '../styles/Mapa.css'
import '../styles/Tabler.css'
import '../styles/Stars.css'
import logo from '../images/logo2.png';
import loca from '../images/loc.png';
import mone from '../images/mone.png';
import clo from '../images/clo.png';
import person from '../images/person.png';
import trash from '../images/trash.png';
import test from '../images/teste.jpg';
import capa from '../images/RM_11.png';
import Navbar from '../components/Navbar';
import Mapa from '../components/Mapa';
import api from '../services/api';
import Swal from 'sweetalert2'
import avatarDefault from './../images/avatar.png';

export default class Busca extends Component {

        
    state = {
        foto : null,
        user: getUser(),
        selectedAvatarFile : null,
        eventos : [],
        sessoes : [],
        posts : [],
        eventView : {nome : '', local : '', hora : '',
        price : 0, description :  '', studio : {}},
        sessionView : {id : 0, nome : '', studio : {}, tattooArtist : {}, hora : ''},
        places : [],
        loc : JSON.parse(localStorage.getItem('@user-loc')),
        rate : 0,
        feedback : '',
        rows : 1,
        search : ''
    }

    handleInputChangeRate =  e => {
        this.setState({rate  : e})
    };

    handleInputChangeSearch =  e => {
      this.setState({search  : e.target.value})
  };

  handleEnterSearch = e => {
    if (e.key === 'Enter') {
        this.getEstudios()
    }
} 

    mascaraValor(val) {
        val = val.toString().replace(/\D/g,"");
        val = val.toString().replace(/(\d)(\d{8})$/,"$1.$2");
        val = val.toString().replace(/(\d)(\d{5})$/,"$1.$2");
        val = val.toString().replace(/(\d)(\d{2})$/,"$1,$2");
        return val                    
    }

    componentWillMount () {      
      this.setPosition();
    }

    componentDidMount = async () => {
        this.getEstudios()
        this.getPosts()
        this.getSessions()
        this.getEvents()
    }

    setPosition() {      
      if (!navigator.geolocation) {
          this.toastAlert('Geolocation is not supported for this Browser/OS.', 'warn');
      }

      navigator.geolocation.getCurrentPosition((position) => {        
          if (position.coords.latitude != null) {            
            const data = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            localStorage.setItem('@user-loc', JSON.stringify(data));
          } else {
            localStorage.setItem('@user-loc', {  });
          }
      });
    }

    getPosition() {
      const positionStorage = localStorage.getItem('@user-loc');
      let position = JSON.parse(positionStorage);

      if (!position.lat) {
          return null;
      }

      return position;
    }

    getEstudios = async () => {
        const search = this.state.search
        const position = this.getPosition();

        const data = {
          latitude: position.lat,
          longitude: position.lng,
          search
        }

        await api.post('studios/search-geo', data).then(response => {
            this.setState({ places: response.data })
        }).catch(error => {
            this.toastAlert(error.response.data.message, 'error');
        });
    }

    handleInputChangeFoto = e => { //possibilita a edição do texto no input
        this.setState({
            selectedAvatarFile : e.target.files[0]
        })
    };

    async getEvents() {
        await api.get(`/events`)
          .then(res => {
            this.setState({ eventos : res.data });
        })
        if(this.state.eventos.length < 1){
            $('#alertEvents').css('display', 'inline');
          }else{
            $('#alertEvents').css('display', 'none');
          }
    }

    async getPosts() {
        await api.get(`/posts`)
          .then(res => {
            this.setState({ posts : res.data });
        })
        if(this.state.posts.length < 1){
            $('#alertPosts').css('display', 'inline');
          }else{
            $('#alertPosts').css('display', 'none');
          }
    }

    dateFormat(date) {
      return moment.utc(date).format('YYYY-MM-DD');
  }

    timeFormat(time) {
      return moment.utc(time, 'HH:mm:ss').format('HH:mm');
  }

    async getSessions(){
        await api.get(`customer/schedulings`)
          .then(res => {
            this.setState({ sessoes : res.data });
        })
        if(this.state.posts.length < 1){
            $('#alertSessions').css('display', 'inline');
          }else{
            $('#alertSessions').css('display', 'none');
          }
    }
 
    handleInputChangeFeedback = e => {
        const lineHeight = 20;
        const previousRows = e.target.rows;
        e.target.rows = 1;
        const currentRows = ~~(e.target.scrollHeight / lineHeight);
        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }
        this.setState({
            menssagem : e.target.value,
            rowsMessage : currentRows
        })
    };

    handleDislikeEvent = async (e) => {
      e.preventDefault();

      const { eventView } = this.state;

      await api.post(`/dislike-event-studio/${eventView.id}`)
        .then(() => {
          this.toastAlert(`Evento ${eventView.title} removido da sua lista de interesses`, 'success');          
          this.getEvents();
          $('#viewEvent').modal('hide');
        }).catch(error => {
          this.toastAlert(error.response.data.message, 'error');
        });
    }

    setSession (sessao) {
        this.setState({sessionView : sessao})
    }

    cancelSession () {
        let url = ` /customer/schedulings/${this.state.sessionView.id}/cancel`;
          api({
            method: 'post',
            url
          }).then((response) => {
            Swal.fire(
              'Cancelado!',
              'Sessão cancelada com sucesso! O tatuador será notificado do cancelamento.',
              'success'
            );
            this.getSessions();
          });
    }

    changePhoto = () => { //possibilita a edição do texto no input
        const { selectedAvatarFile } = this.state;        
        let url = '/users-avatar';
        let formData = new FormData();

        formData.append('file', selectedAvatarFile);

        api({
          method: 'post',
          url,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => {
            if (response.data.url) {
                setAvatarUser(response.data.url);
                this.setState({user : getUser()})
                this.getAvatar();
                $('#uploadPhoto').modal('hide');
            }
        })
        .catch((response) => {
            console.log(response);
        });
    }

    formatar(data, hora) {
        data = new Date(data);
        var day = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][data.getDay()];
        var date = data.getDate();
        var month = ["Jan.", "Fev.", "Mar.", "Abr.", "Mai.", "Jun.", "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."][data.getMonth()];
        var year = data.getFullYear();
      
        return (`${day}, ${date} de ${month} de ${year} às ${this.timeFormat(hora)}`);
      }

    getAvatar() {
        const { user } = this.state;
        if(user != null){
            return (!!user.avatar.url ? user.avatar.url : avatarDefault);
        }
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

  render() {
      return(
          <div className="wrapper wrapper-logado">
                <Navbar avatar={this.getAvatar()}/>
                <div className="container mt-5">
                <div className="row">
                <div className="col col-lg-4">
                    <Card className="card-profile resumo-perfil">
                        <Card.Header backgroundURL={capa}></Card.Header>
                        <Card.Body className="text-center">
                            <Clickable aria-label="Mudar foto de perfil" data-balloon-pos="down" className='center' onClick={() => {
                                $('#uploadPhoto').modal('show');
                            }}>
                                <Profile.Image className="card-profile-img" avatarURL={this.getAvatar()}/>
                            </Clickable>
                        <h2>{this.state.user.name}</h2>
                        </Card.Body>
                    </Card>
                    <Card>
                    <Card.Header><h3>Eventos</h3></Card.Header>
                    <List>
                        {this.state.eventos.map(event => (
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={event.bannerUrl}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <a onClick={() => {
                                                this.setState({eventView : event})
                                                $('#viewEvent').modal('show');
                                            }}><h4 className='to-link'>{event.title}</h4></a>
                                        </Media.Heading>
                                        <small>
                                            <p><img src={loca}/>&nbsp;&nbsp;<a className='to-link' onClick={
                                                () => {this.props.history.push('/perfil_estudio/' + event.studio.id)}
                                            }>{event.studio.name}</a>
                                            <br/><img src={clo}/>&nbsp;&nbsp;{this.formatar(event.dateStart, event.timeStart)}
                                            <br/><img src={mone}/>&nbsp;&nbsp;<font color="green">{event.price !== 0.0 ? 'R$ '+this.mascaraValor(event.price.toFixed(2)) : 'Grátis'}</font>
                                            </p>
                                        </small>
                                    </Media.Body>
                                </Media>
                            </List.GroupItem>
                        ))}
                        <div className='alerts'>
                            <p id='alertEvents'>Sem eventos para apresetar</p>
                        </div>
                    </List>
                    </Card>
                    <Card>
                    <Card.Header><h3>Sessões marcadas</h3></Card.Header>
                    <List>
                    {this.state.sessoes.map(sessao => (
                    <List.GroupItem>
                    <Media>
                        <Avatar size="md" imageURL={sessao.bannerUrl}></Avatar>
                        <Media.Body className="ml-3">
                            <small>
                                <p><img src={loca}/>&nbsp;&nbsp;{sessao.studio.name}
                                <br/><img src={clo}/>&nbsp;&nbsp;{this.formatar(sessao.date, sessao.hourStart)}
                                <br/><img src={person}/>&nbsp;&nbsp;{sessao.tattooArtist.name}
                                </p>    
                            </small>
                        </Media.Body>
                        <button className='btn' onClick={() => {
                            this.setState({
                                sessionView : sessao
                            })
                            $('#deleteSession').modal('show');
                        }}><img src={trash}></img></button>
                    </Media>
                    </List.GroupItem>
                    ))}
                    <div className='alerts'>
                      <p id='alertSessions'>Sem sessões marcadas</p>
                    </div>
                    </List>
                </Card>
                </div>
                <div className="col col-lg- mb-5">
                <Card className="map-card">
                <Card.Header>
                    <Form.Input placeholder="Buscar por estúdios e/ou profissionais" value={this.state.search} onChange={this.handleInputChangeSearch}
                    onKeyPress={this.handleEnterSearch}>
                    </Form.Input>
                </Card.Header>
                    <Card.Body className="mapa">
                    <Mapa places={this.state.places}></Mapa>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        <h3>Feed de posts</h3>
                    </Card.Header>
                    <List>
                    {this.state.posts.map(post => (
                        <List.GroupItem>
                        <Media>
                            <Avatar size="md" imageURL={post.author.avatarUrl}></Avatar>
                            <Media.Body className="ml-3">
                                <Media.Heading>
                                    <a onClick={() => {
                                      if (post.author.type == 'studio'){
                                        this.props.history.push('/perfil_estudio/' + post.author.id)
                                      }else{
                                        this.props.history.push('/perfil_tatuador/' + post.author.id)
                                      }
                                    }}><h4 className='to-link'>{post.author.name}</h4></a>
                                </Media.Heading>
                                <small>{post.content.split('\n').map(function(item) {
                                    return (
                                        <span>
                                        {item}
                                        <br/>
                                        </span>
                                    )
                                    })}</small>
                            </Media.Body>
                        </Media>
                    </List.GroupItem>
                    ))}
                    <div className='alerts'>
                      <p id='alertPosts'>Sem posts para apresetar</p>
                    </div>
                    </List>
                </Card>
                </div>
            </div>
            </div>
            <div class="modal fade" id="deleteSession" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Desmarcar sessão</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h3>Você tem certeza que deseja desmarcar a sessão?</h3>
                    <p>Local:&nbsp;&nbsp;{this.state.sessionView.studio.name}</p>
                    <p>Data e hora:&nbsp;&nbsp;{this.formatar(this.state.sessionView.studio.date, this.state.sessionView.studio.hourStart)}</p>
                    <p>Tatuador:&nbsp;&nbsp;{this.state.sessionView.tattooArtist.name}</p>
                    <p><font color='red'>Obs: O tatuador será notificado da desmarcação.</font></p>
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                          this.cancelSession();
                          $('#deleteSession').modal('hide');
                      }}>Sim</button>
                      <button className='agendar' onClick={() => {
                          $('#deleteSession').modal('hide');
                      }}>Não</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="uploadPhoto" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Mudar foto de perfil</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                  <div className="form-group files">
                      <p>
                        <input type="file" multiple=""
                            onChange={this.handleInputChangeFoto}></input>
                    </p>
                    </div>
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={this.changePhoto}>Upload</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="viewEvent" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3>{this.state.eventView.title}</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img className="rounded mx-auto d-block" src={this.state.eventView.bannerUrl}></img><br/>
                        <p><font className='font-weight-bold'>Onde será:</font>&nbsp;&nbsp;{this.state.eventView.studio.name}</p>
                        <p><font className='font-weight-bold'>Quando:</font>&nbsp;&nbsp;{this.formatar(this.state.eventView.dateStart, this.state.eventView.timeStart)}</p>
                        <p><font className='font-weight-bold'>Entrada:</font>&nbsp;&nbsp;{<font color="green">{this.state.eventView.price !== 0.0 ? 'R$ '+this.mascaraValor(this.state.eventView.price.toFixed(2)) : 'Grátis'}</font>}</p>
                        <div className='border rounded p-2 text-justify'>{this.state.eventView.description.split('\n').map(function(item) {
                            return (
                                <span>
                                {item}
                                <br/>
                                </span>
                            )
                            })}</div>
                        <div class="modal-footer">
                            <button className="cancel-event" onClick={this.handleDislikeEvent}>Perdi interesse</button>
                        </div>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="giveFeedback" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3>Feedback</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img className="rounded mx-auto d-block" src={this.state.eventView.content}></img><br/>
                    <p>Deixe seu feedback sobre os serviços de (nome tatuador) no (nome do estudio)</p>
                        <p><Rate className="ml-2" onChange={this.handleInputChangeRate} style={{ fontSize: 20 }} allowHalf allowClear={false} value={this.state.rate}/></p>
                        <Form.Textarea rows={this.state.rows} id='mens' onChange={this.handleInputChangeFeedback}
                            placeholder="Como foi a sessão de tatuagem?" value={this.state.feedback}/>
                        <div class="modal-footer">
                            <button className="cancel-event" onClick={() => {
                            $('#giveFeedback').modal('hide');
                            toast.configure()
                            toast.sucess("Feedback enviado. Obrigado!",{
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true
                                });
                        }}>Avaliar</button>
                        </div>
                  </div>
                </div>
              </div>
              </div>
            <div className="footer-copyright text-center py-2 rodape mt-5">2019 - InkNeedle</div>
            </div>
      );
  }
}
