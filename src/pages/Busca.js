import React, { Component } from 'react';
import {Clickable} from 'react-clickable';
import { Card, Profile, List, Media, Avatar, Form, GalleryCard, Grid, Button} from "tabler-react";
import logo2 from '../images/logo2.png';
import { logout } from '../services/auth';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PerfilTatuador.css';
import '../styles/General.css';
import '../styles/Mapa.css'
import '../styles/Tabler.css'
import '../styles/Stars.css'
import logo from '../images/logo2.png';
import loc from '../images/loc.png';
import mone from '../images/mone.png';
import clo from '../images/clo.png';
import person from '../images/person.png';
import trash from '../images/trash.png';
import test from '../images/teste.jpg';
import capa from '../images/RM_11.png';
import Mapa from '../components/Mapa';
import api from '../services/api';

export default class Busca extends Component {

    state = {
        foto : null,
        nome : 'Marcelo César',
        selectedFile : null,
        eventos : [{nome : 'Flash Day Festival', local : 'Estúdio Tatuagens Bacanas', hora : '19 a 23 de Out, das 9h às 19h',
        preco : 20.0},{nome : 'Flashes por R$70', local : 'Estúdio Skina da Agulha', hora : '02 a 05 de Nov, das 10h às 22h',
        preco : 0.0}],
        secoes : [{nome : 'Marcelo César', local : 'Estúdio Tatuagens Bacanas', hora : '25 de Nov, das 16h às 19h',},
        {nome : 'Rodrigo Fonseca', local : 'Estúdio Skina da Agulha', hora : '05 de Dec, das 10h às 16h'}],
        posts : [{nome : 'Marcelo César', content :'Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'},
        {nome : 'Marcelo César', content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'},
        {nome : 'Marcelo César', content : 'Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.'},
        {nome : 'Marcelo César', content : 'Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'}]
      };

    handleSubmit = async (e) => { //método responsável por interceptar o submit do form
        e.preventDefault(); //evita comportamentos padrões do submit
    };

    handleInputChange =  e => {
    };

    mascaraValor(val) {
        val = val.toString().replace(/\D/g,"");
        val = val.toString().replace(/(\d)(\d{8})$/,"$1.$2");
        val = val.toString().replace(/(\d)(\d{5})$/,"$1.$2");
        val = val.toString().replace(/(\d)(\d{2})$/,"$1,$2");
        return val                    
    }

    componentDidMount () {
        this.setState({foto : test})
    }

    handleInputChangeFoto = e => { //possibilita a edição do texto no input
        this.setState({
            selectedFile : e.target.files[0]
        })
    };

    changePhoto () { //possibilita a edição do texto no input
        this.setState({
            foto : this.state.selectedFile
        })
    };

  render() {
      return(
          <div className="wrapper wrapper-logado">
                <nav class="navbar navbar-expand-lg p-0 pl-5">
                <a class="navbar-brand" href="#"><img src={logo2}></img></a>
                <div class="collapse navbar-collapse" id="conteudoNavbarSuportado">
                    <ul className='mr-auto'></ul>
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" >
                                Minha conta
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Ação</a>
                            <a class="dropdown-item" href="#">Outra ação</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="" onClick={() => {
                                logout()
                                this.props.history.push('/login')
                            }}>Sair</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="link" href="#">
                                Ajuda
                            </a>
                        </li>
                    </ul>
                </div>
                </nav>
                <div className="container">
                <div className="row">
                <div className="col col-lg-4">
                    <Card className="card-profile resumo-perfil">
                        <Card.Header backgroundURL={capa}></Card.Header>
                        <Card.Body className="text-center">
                            <Clickable className='center' onClick={() => {
                                $('#uploadPhoto').modal('show');
                            }}>
                                <Profile.Image className="card-profile-img" avatarURL={this.state.foto}/>
                            </Clickable>
                        <h2>{this.state.nome}</h2>
                        </Card.Body>
                    </Card>
                    <Card>
                    <Card.Header><h3>Eventos</h3></Card.Header>
                    <List>
                        {this.state.eventos.map(event => (
                            <List.GroupItem>
                            <Media>
                                <Avatar size="md" imageURL={capa}></Avatar>
                                <Media.Body className="ml-3">
                                    <Media.Heading>
                                    <h4>{event.nome}</h4>
                                    </Media.Heading>
                                    <small>
                                    <p><img src={loc}/>&nbsp;&nbsp;{event.local}
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
                    {this.state.secoes.map(secao => (
                    <List.GroupItem>
                    <Media>
                        <Avatar size="md" imageURL={capa}></Avatar>
                        <Media.Body className="ml-3">
                            <small>
                                <p><img src={loc}/>&nbsp;&nbsp;{secao.local}
                                <br/><img src={clo}/>&nbsp;&nbsp;{secao.hora}
                                <br/><img src={person}/>&nbsp;&nbsp;{secao.nome}
                                </p>    
                            </small>
                        </Media.Body>
                        <button className='btn' onClick={() => {
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
                    <Mapa ></Mapa>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        <h3>Feed de posts</h3>
                    </Card.Header>
                    <List>
                    {this.state.posts.map(secao => (
                        <List.GroupItem>
                        <Media>
                            <Avatar size="md" imageURL={test}></Avatar>
                            <Media.Body className="ml-3">
                                <Media.Heading>
                                    <h4>{secao.nome}</h4>
                                </Media.Heading>
                                <small>{secao.content}</small>
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
                    <p>Local:</p>
                    <p>Data e hora:</p>
                    <p>Tatuador:</p>
                    <p><font color='red'>Obs: O tatuador será notificado da desmarcação.</font></p>
                  </div>
                  <div class="modal-footer">
                      <button className='agendar'>Sim</button>
                      <button className='agendar'>Não</button>
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
            <div className="footer-copyright text-center py-2 rodape mt-5">2019 - InkNeedle</div>
            </div>
      );
  }
}