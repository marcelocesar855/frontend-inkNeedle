import React, { Component } from 'react';
import { Linking } from 'react-native-web';
import { getUser } from '../services/auth';
import {Clickable} from 'react-clickable';
import 'react-toastify/dist/ReactToastify.css';
import 'balloon-css';
import $ from 'jquery';
import 'bootstrap';
import Navbar from '../components/Navbar';
import {Card, Profile, List, Media, Avatar, Form, GalleryCard, Grid, Button} from "tabler-react";
import Rate from 'rc-rate';
import {DraggableArea} from 'react-draggable-tags';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PerfilTatuador.css';
import '../styles/General.css';
import '../styles/Tabler.css';
import '../styles/Stars.css';
import '../styles/Tags.css';
import test from '../images/teste.jpg';
import capa from '../images/RM_11.png';
import fc from '../images/facebook.png';
import tt from '../images/twitter.png';
import it from '../images/instagram.png';
import wa from '../images/whatsapp.png';
import ft1 from '../images/1.jpg';
import ft2 from '../images/2.jpg';
import ft3 from '../images/3.jpg';
import ft4 from '../images/4.jpg';
import ft5 from '../images/5.jpg';
import ft6 from '../images/6.jpg';
import ft7 from '../images/7.jpg';
import ft8 from '../images/8.jpg';
import ft11 from '../images/11.png';
import certif1 from '../images/certif1.jpg';
import certif2 from '../images/certif2.jpg';
import certif3 from '../images/certif3.jpg';
import api from '../services/api';

// IMAGES
import avatarDefault from './../images/avatar.png';

export default class PerfilTatuador extends Component {

    state = {//variavel que armazena dados do componente para serem usados por ele, e caso alguma das informações mude o render() é executado novamente
        user: getUser(),
        studios: [],
        nomeTatuador : 'Marcelo César',
        descricaoTatuador : 'Sou um tatuador muito legal e extrovertido, no meu estúdio tem café, água e biscoito.',
        initialTags: [
            {id: 1, content: 'Old school', undraggable: true}, {id: 2, content: 'New school', undraggable: true}, {id: 3, content: 'Bold line', undraggable: true},
            {id: 4,  content: 'Tribal', undraggable: true}, {id: 5, content: 'Oriental', undraggable: true}, {id: 6, content: 'Graywash', undraggable: true},
            {id: 7, content: 'Geometric', undraggable: true}, {id: 8, content: 'Biomecanic', undraggable: true}, {id: 9, content: 'Aquerela', undraggable: true},
            {id: 10, content: 'Portrait', undraggable: true}],
        certificacoes : [{id: 1, sigla : 'BS', nome : 'Bio Segurança 50h', content : certif1}, {id: 2, sigla :'OS', nome : 'Desenhos Old School 30h', content : certif2},
        {id: 3, sigla : 'OT', nome : 'Desenhos Orientais 20h', content : certif3}],
        posts : [{id : 1, nome : 'Marcelo César', content :'Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'},
        {id : 2, nome : 'Marcelo César', content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'},
        {id : 3, nome : 'Marcelo César', content : 'Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.'},
        {id : 4, nome : 'Marcelo César', content : 'Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'}],
        feedbacks : [{nome : 'Camila Souza', content : 'Muito profissional e ético.'}],
        galeria : [{id : 1, title : 'Test Title', content : ft1},{id : 2, title : 'Test Title', content : ft2},
        {id : 3, title : 'Test Title', content : ft3},{id : 4, title : 'Test Title', content : ft4},{id : 5, title : 'Test Title', content : ft5},
            {id : 6, title : 'Test Title', content : ft6},{id : 7, title : 'Test Title', content : ft7},{id : 8, title : 'Test Title', content : ft8},
            {id : 9, title : 'Test Title', content : ft11}],
        photoView : {id : 0, title : '', content : null},
        certificateView : {id : 0, sigla : '', nome : '', content : null},
        facebook : 'https://www.facebook.com/',
        twitter : 'https://www.twitter.com/',
        instagram : 'https://www.instagram.com/',
    };
    
    componentDidMount () {
        this.getStudios();
        this.setState({foto : test});
    }

    getStudios() {
        api.get(`/studios`)
        .then(res => {
            const studios = res.data;
            this.setState({ studios });
        })
    }

    getAvatar() {
        const { user } = this.state;
        return (!!user.avatarUrl ? user.avatarUrl : avatarDefault);
    }

  render() {
      const { user } = this.state;
      return(
          <div className="wrapper wrapper-logado">
                <Navbar avatar={this.getAvatar}/>
                <div className="container mt-5">
                <div className="row ">
                <div className="col col-lg-4">
                    <Card className="card-profile resumo-perfil">
                        <Card.Header backgroundURL={capa}></Card.Header>
                        <Card.Body className="text-center">
                          <Profile.Image className="card-profile-img" avatarURL={this.getAvatar()}/>
                          <h2>{user.name}
                          < Rate className="ml-2" defaultValue={5} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                          </h2>
                            <p>{this.state.descricaoTatuador}</p>
                            <div className="Simple">
                                <DraggableArea tags={this.state.initialTags} render={({tag, id}) => (
                                <div className="tag ">                                    
                                    {tag.content}
                                </div>)} onChange={tags => console.log(tags)} />
                             </div>
                            <a onClick={() =>{
                                Linking.openURL(
                                    this.state.facebook
                                );
                                
                            }}><img className="social" src={fc}></img></a>
                            <a onClick={() =>{
                                Linking.openURL(
                                    this.state.twitter
                                );
                            }}><img className="social" src={tt}></img></a>
                            <a onClick={() =>{
                                Linking.openURL(
                                    this.state.instagram
                                );
                            }}><img className="social" src={it}></img></a>
                            <a onClick={() =>{
                                Linking.openURL(
                                    "https://api.whatsapp.com/send?phone=5561982715613&text=Olá,%20gostaria%20de%20marcar%20uma%20sessão&lang=pt_pt"
                                );
                            }}><img className="social" src={wa}></img></a>
                            <button className="chat">+Seguir</button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header><h2>Estúdios</h2></Card.Header>
                        <List>
                            {this.state.studios.map(studio => (
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={capa}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <h3>{studio.name}
                                                {/* <Rate className="ml-2" defaultValue={5} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/> */}
                                            </h3>
                                        </Media.Heading>
                                        {/* <img src={loc}/> <small>{estudio.local}</small> */}
                                    </Media.Body>
                                </Media>
                            </List.GroupItem>
                        ))}
                        </List>
                    </Card>
                    <Card>
                    <Card.Header><h2>Certificações</h2></Card.Header>
                        <Avatar.List className="p-3">
                            {this.state.certificacoes.map(certif => (
                                <Avatar aria-label={certif.nome} data-balloon-pos="up" onClick={()=>{
                                    this.setState({certificateView : certif});
                                    $('#viewCertificate').modal('show');
                                }}>{certif.sigla}</Avatar>
                            ))}
                        </Avatar.List>
                    </Card>
                    <Card>
                        <Card.Header><h2>Feedbacks</h2></Card.Header>
                        <List>
                        {this.state.feedbacks.map(feedback => (
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={capa}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <h3>{feedback.nome}</h3>
                                        </Media.Heading>
                                        <Rate defaultValue={5} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                                        <p><small>{feedback.content}</small></p>
                                    </Media.Body>
                                </Media>
                            </List.GroupItem>
                        ))}
                        </List>
                    </Card>
                </div>
                <div className="col col-lg-8 mb-5">
                <Card>
                    <Card.Header>
                      <h3>Postagens</h3>
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
                                <small>{secao.content.split('\n').map(function(item) {
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
                <GalleryCard>
                <Card.Header>
                    <h2>Galeria de artes</h2>
                </Card.Header>
                    <div className="gallery">
                        {this.state.galeria.map(foto => (
                            <div class="mb-3 pics animation all 2">
                                <Clickable onClick={() => {
                                    this.setState({photoView : foto})
                                    $('#viewPhoto').modal('show');
                                }}>
                                    <img className="rounded img-fluid" src={foto.content}></img>
                                </Clickable>
                            </div>
                        ))}
                    </div>
                </GalleryCard>
                </div>
            </div>
            </div>
              <div class="modal fade" id="viewPhoto" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img className="rounded img-fluid" src={this.state.photoView.content}></img>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="viewCertificate" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                        <h3>{this.state.certificateView.nome}</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img className="rounded img-fluid" src={this.state.certificateView.content}></img>
                  </div>
                </div>
              </div>
              </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}
