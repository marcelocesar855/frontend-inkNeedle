import React, { Component } from 'react';
import {Clickable} from 'react-clickable';
import { getUser, getToken } from '../services/auth';
import { Card, Profile, List, Media, Avatar, Form, GalleryCard, Grid, Button} from "tabler-react";
import $ from 'jquery';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Rate from 'rc-rate';
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
import banner from '../images/banner.jpg'
import banner1 from '../images/banner1.jpg'
import api from '../services/api';
import avatarDefault from './../images/avatar.png';

export default class Busca extends Component {

        
    state = {
            foto : null,
            user: getUser(),
            nome : 'Marcelo César',
            selectedFile : null,
            eventos : [{nome : 'Flash Day Festival', local : 'Estúdio Tatuagens Bacanas', hora : '19 a 23 de Out, das 9h às 19h',
            preco : 20.0, content : banner, descricao : 'É com imenso prazer que anunciamos o nosso evento Flash Day Festival! \n\n Aqui você tem direito a uma flash grátis (de tamanho micro) e poderá conhecer os tatuadores de nosso estúdio e dos arredores, pois estarão todos presentes esperando pra te rabiscar! \n\n Contaremos também com atrações de literatura, cafés e música, para além de sair mais lindo(a) daqui, sairá com cultura e cafeína \\o/'},
            {nome : 'Flashes por R$70', local : 'Estúdio Skina da Agulha', hora : '02 a 05 de Nov, das 10h às 22h',
            preco : 0.0, content : banner1, descricao : 'É com imenso prazer que anunciamos o nosso evento Flash Day Festival! \n\n Aqui você tem direito a uma flash grátis (de tamanho micro) e poderá conhecer os tatuadores de nosso estúdio e dos arredores, pois estarão todos presentes esperando pra te rabiscar! \n\n Contaremos também com atrações de literatura, cafés e música, para além de sair mais lindo(a) daqui, sairá com cultura e cafeína \\o/'}],
            sessoes : [{id : 1, nome : 'Marcelo César', local : 'Estúdio Tatuagens Bacanas', hora : '25 de Nov, das 16h às 19h'},
            {id : 2, nome : 'Rodrigo Fonseca', local : 'Estúdio Skina da Agulha', hora : '05 de Dec, das 10h às 16h'}],
            posts : [{nome : 'Marcelo César', content :'Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'},
            {nome : 'Marcelo César', content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'},
            {nome : 'Marcelo César', content : 'Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.'},
            {nome : 'Marcelo César', content : 'Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'}],
            eventView : {nome : '', local : '', hora : '',
            preco : 0, content : null, descricao : ''},
            sessionView : {id : 0, nome : '', local : '', hora : ''},
            estudios : [],
            loc : JSON.parse(localStorage.getItem('@user-loc')),
            rate : 0,
            feedback : '',
            rows : 1,
        }


    handleSubmit = async (e) => { //método responsável por interceptar o submit do form
        e.preventDefault(); //evita comportamentos padrões do submit
    };

    handleInputChangeRate =  e => {
        this.setState({rate  : e})
    };

    mascaraValor(val) {
        val = val.toString().replace(/\D/g,"");
        val = val.toString().replace(/(\d)(\d{8})$/,"$1.$2");
        val = val.toString().replace(/(\d)(\d{5})$/,"$1.$2");
        val = val.toString().replace(/(\d)(\d{2})$/,"$1,$2");
        return val                    
    }

    componentDidMount = async () => {
        this.setState({foto : test})
        if (navigator.geolocation) {
            var startPos;
          var geoSuccess = (position) => {
            if (position.coords.latitude != null){
                startPos = position;
                localStorage.setItem('@user-loc', JSON.stringify({lat : startPos.coords.latitude, lng : startPos.coords.longitude}));
            }else{
                localStorage.setItem('@user-loc',{});
            }
          };
          navigator.geolocation.getCurrentPosition(geoSuccess);
        //   const lat = this.state.loc.lat;
        //     const long = this.state.loc.long;
        //   await api.post('studios/search-geo', {
        //     headers: {
        //         'Authorization': 'Bearer ' + getToken(),
        //       },
        //     lat,
        //     long
        //   }).then(response => {
        //     this.setState({estudios : response.data})
        //   }).catch(error => {
        //       alert(error)
        //   })
      }
      else {
        console.log('Geolocation is not supported for this Browser/OS.');
      }
    }

    handleInputChangeFoto = e => { //possibilita a edição do texto no input
        this.setState({
            selectedFile : e.target.files[0]
        })
    };

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

    cancelEvent () {
        const event = this.state.eventView;
        const eventos = this.state.eventos.filter(e => event.id !== e.id);
        this.setState({
            eventos : eventos,
            eventView : {nome : '', local : '', hora : '',
            preco : 0, content : null, descricao : ''}
        });
    }

    setSession (sessao) {
        this.setState({sessionView : sessao})
    }

    cancelSession () {
        const sessao = this.state.sessionView;
        const sessoes = this.state.sessoes.filter(s => sessao.id !== s.id);
        this.setState({
            sessoes : sessoes,
            sessionView : {id : 0, nome : '', local : '', hora : ''}
        });
    }

    changePhoto () { //possibilita a edição do texto no input
        this.setState({
            foto : this.state.selectedFile
        })
    };

    
    getAvatar() {
        const { user } = this.state;
        return (!!user.avatarUrl ? user.avatarUrl : avatarDefault);
    }

  render() {
      return(
          <div className="wrapper wrapper-logado">
                <Navbar/>
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
                    <Card.Header><h2>Eventos</h2></Card.Header>
                    <List>
                        {this.state.eventos.map(event => (
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={event.content}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <a onClick={() => {
                                                this.setState({eventView : event})
                                                $('#viewEvent').modal('show');
                                            }}><h4 className='to-link'>{event.nome}</h4></a>
                                        </Media.Heading>
                                        <small>
                                            <p><img src={loca}/>&nbsp;&nbsp;{event.local}
                                            <br/><img src={clo}/>&nbsp;&nbsp;{event.hora}
                                            <br/><img src={mone}/>&nbsp;&nbsp;<font color="green">{event.preco !== 0.0 ? 'R$ '+this.mascaraValor(event.preco.toFixed(2)) : 'Grátis'}</font>
                                            </p>
                                        </small>
                                    </Media.Body>
                                </Media>
                            </List.GroupItem>
                        ))}
                    </List>
                    </Card>
                    <Card>
                    <Card.Header><h3>Sessões marcadas</h3></Card.Header>
                    <List>
                    {this.state.sessoes.map(sessao => (
                    <List.GroupItem>
                    <Media>
                        <Avatar size="md" imageURL={capa}></Avatar>
                        <Media.Body className="ml-3">
                            <small>
                                <p><img src={loca}/>&nbsp;&nbsp;{sessao.local}
                                <br/><img src={clo}/>&nbsp;&nbsp;{sessao.hora}
                                <br/><img src={person}/>&nbsp;&nbsp;{sessao.nome}
                                </p>    
                            </small>
                        </Media.Body>
                        <button className='btn' onClick={() => {
                            this.setState({
                                sessionView : sessao,
                                loc : JSON.parse(localStorage.getItem('@user-loc'))
                            })
                            $('#deleteSession').modal('show');
                        }}><img src={trash}></img></button>
                    </Media>
                    </List.GroupItem>
                    ))}
                    </List>
                </Card>
                </div>
                <div className="col col-lg- mb-5">
                <Card className="map-card">
                <Card.Header>
                    <Form.Input placeholder="Buscar por estúdios e/ou profissionais">
                    </Form.Input>
                </Card.Header>
                    <Card.Body className="mapa">
                    <Mapa initialPlaces={[]}></Mapa>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        <h3>Feed de posts</h3>
                    </Card.Header>
                    <List>
                    {this.state.posts.map(sessao => (
                        <List.GroupItem>
                        <Media>
                            <Avatar size="md" imageURL={test}></Avatar>
                            <Media.Body className="ml-3">
                                <Media.Heading>
                                    <h4>{sessao.nome}</h4>
                                </Media.Heading>
                                <small>{sessao.content.split('\n').map(function(item) {
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
                    <p>Local:&nbsp;&nbsp;{this.state.sessionView.local}</p>
                    <p>Data e hora:&nbsp;&nbsp;{this.state.sessionView.hora}</p>
                    <p>Tatuador:&nbsp;&nbsp;{this.state.sessionView.nome}</p>
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
                    <h3>{this.state.eventView.nome}</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img className="rounded mx-auto d-block" src={this.state.eventView.content}></img><br/>
                        <p><font className='font-weight-bold'>Onde será:</font>&nbsp;&nbsp;{this.state.eventView.local}</p>
                        <p><font className='font-weight-bold'>Quando:</font>&nbsp;&nbsp;{this.state.eventView.hora}</p>
                        <p><font className='font-weight-bold'>Entrada:</font>&nbsp;&nbsp;{<font color="green">{this.state.eventView.preco !== 0.0 ? 'R$ '+this.mascaraValor(this.state.eventView.preco.toFixed(2)) : 'Grátis'}</font>}</p>
                        <div className='border rounded p-2 text-justify'>{this.state.eventView.descricao.split('\n').map(function(item) {
                            return (
                                <span>
                                {item}
                                <br/>
                                </span>
                            )
                            })}</div>
                        <div class="modal-footer">
                            <button className="cancel-event" onClick={() => {
                            this.cancelEvent();
                            $('#viewEvent').modal('hide');
                        }}>Perdi interesse</button>
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
