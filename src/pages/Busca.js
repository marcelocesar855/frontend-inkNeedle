import React, { Component } from 'react';
import { Card, Profile, List, Media, Avatar, Form, GalleryCard, Grid, Button} from "tabler-react";
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
import test from '../images/teste.jpg';
import capa from '../images/RM_11.png';
import Mapa from '../components/Mapa';

import api from '../services/api';

export default class Busca extends Component {

    state = {
      };

    handleSubmit = async (e) => { //método responsável por interceptar o submit do form
        e.preventDefault(); //evita comportamentos padrões do submit
    };

    handleInputChange =  e => {
    };

  render() {
      return(
          <div className="wrapper wrapper-logado">
                <ul className="navbar navbar-fixed-top">
                   <img src={logo} alt="InkNeedle"/>
                    <ul className="justify-content-end">
                        <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Minha Conta</a></li>
                        <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Ajuda</a></li>
                    </ul>
                </ul>
                <div className="container">
                <div className="row">
                <div className="col col-lg-4">
                    <Card className="card-profile resumo-perfil">
                        <Card.Header backgroundURL={capa}></Card.Header>
                        <Card.Body className="text-center">
                            <Profile.Image className="card-profile-img" avatarURL={test}></Profile.Image>
                            <h2>Marcelo César</h2>
                            <Grid>
                                <Grid.Row>
                                    <button className="chat">Sessões</button>
                                </Grid.Row>
                            </Grid>
                        </Card.Body>
                    </Card>
                    <Card>
                    <Card.Header><h3>Eventos</h3></Card.Header>
                    <List>
                        <List.GroupItem>
                            <Media>
                                <Avatar size="md" imageURL={capa}></Avatar>
                                <Media.Body className="ml-3">
                                    <Media.Heading>
                                        <h4>Flash Day Festival</h4>
                                    </Media.Heading>
                                    <small>
                                        <p><img src={loc}/>&nbsp;&nbsp;Estúdio Tatuagens Bacanas
                                        <br/><img src={clo}/>&nbsp;&nbsp;19 a 23 de Out, das 9h às 19h
                                        <br/><img src={mone}/>&nbsp;&nbsp;<font color="green">Grátis</font>
                                        </p>
                                    </small>
                                </Media.Body>
                            </Media>
                        </List.GroupItem>
                        <List.GroupItem>
                            <Media>
                                <Avatar size="md" imageURL={capa}></Avatar>
                                <Media.Body className="ml-3">
                                    <Media.Heading>
                                        <h4>Flashes por R$70</h4>
                                    </Media.Heading>
                                    <small>
                                        <p><img src={loc}/>&nbsp;&nbsp;Estúdio Skina da Agulha
                                        <br/><img src={clo}/>&nbsp;&nbsp;02 a 05 de Nov, das 10h às 22h
                                        <br/><img src={mone}/>&nbsp;&nbsp;<font color="green">Grátis</font>
                                        </p>
                                    </small>
                                </Media.Body>
                            </Media>
                        </List.GroupItem>
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
                        <List.GroupItem>
                            <Media>
                                <Avatar size="md" imageURL={test}></Avatar>
                                <Media.Body className="ml-3">
                                    <Media.Heading>
                                        <h4>Marcelo César</h4>
                                    </Media.Heading>
                                    <small>Aenean lacinia bibendum nulla sed consectetur. 
                                        Vestibulum id ligula porta felis euismod semper. 
                                        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. 
                                        Cras justo odio, dapibus ac facilisis in, egestas eget quam. 
                                        Vestibulum id ligula porta felis euismod semper. 
                                        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</small>
                                </Media.Body>
                            </Media>
                        </List.GroupItem>
                        <List.GroupItem>
                            <Media>
                                <Avatar size="md" imageURL={test}></Avatar>
                                <Media.Body className="ml-3">
                                    <Media.Heading>
                                        <h4>Marcelo César</h4>
                                    </Media.Heading>
                                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                        Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, 
                                        ut fermentum massa justo sit amet risus.</small>
                                </Media.Body>
                            </Media>
                        </List.GroupItem>
                        <List.GroupItem>
                            <Media>
                                <Avatar size="md" imageURL={test}></Avatar>
                                <Media.Body className="ml-3">
                                    <Media.Heading>
                                        <h4>Marcelo César</h4>
                                    </Media.Heading>
                                    <small>Donec id elit non mi porta gravida at eget metus. 
                                        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. 
                                        Donec ullamcorper nulla non metus auctor fringilla. 
                                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. 
                                        Sed posuere consectetur est at lobortis.</small>
                                </Media.Body>
                            </Media>
                        </List.GroupItem>
                        <List.GroupItem>
                            <Media>
                                <Avatar size="md" imageURL={test}></Avatar>
                                <Media.Body className="ml-3">
                                    <Media.Heading>
                                        <h4>Marcelo César</h4>
                                    </Media.Heading>
                                    <small>Donec ullamcorper nulla non metus auctor fringilla. 
                                        Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. 
                                        Pellentesque ornare sem lacinia quam venenatis vestibulum. 
                                        Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</small>
                                </Media.Body>
                            </Media>
                        </List.GroupItem>
                    </List>
                </Card>
                </div>
            </div>
            </div>
                <div className="footer-copyright text-center py-2 rodape mt-5">2019 - InkNeedle</div>
            </div>
      );
  }
}