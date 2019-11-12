import React, { Component } from 'react';
import { Linking, Text } from 'react-native-web';
import {Card, Profile, List, Media, Avatar, Form, GalleryCard, Grid, Button} from "tabler-react";
import Rate from 'rc-rate';
import {DraggableArea} from 'react-draggable-tags';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PerfilTatuador.css';
import '../styles/General.css';
import '../styles/Tabler.css'
import '../styles/Stars.css'
import '../styles/Tags.css'
import logo from '../images/logo2.png';
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
import api from '../services/api';

export default class PerfilTatuador extends Component {

    state = {//variavel que armazena dados do componente para serem usados por ele, e caso alguma das informações mude o render() é executado novamente
        nomeTatuador : 'Marcelo César',
        descricaoTatuador : 'Sou um tatuador muito legal e extrovertido, no meu estúdio tem café, água e biscoito.',
        initialTags: [
            {id: 1, content: 'Old school'}, {id: 2, content: 'New school', undraggable: true}, {id: 3, content: 'Bold line'},
            {id: 4,  content: 'Tribal'}, {id: 5, content: 'Oriental'}, {id: 6, content: 'Graywash'},
            {id: 7, content: 'Geometric'}, {id: 8, content: 'Biomecanic'}, {id: 9, content: 'Aquerela'}, {id: 10, content: 'Portrait'}]
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
                <div className="row ">
                <div className="col col-lg-4">
                    <Card className="card-profile resumo-perfil">
                        <Card.Header backgroundURL={capa}></Card.Header>
                        <Card.Body className="text-center">
                            <Profile.Image className="card-profile-img" avatarURL={test}></Profile.Image>
                            <h2>{this.state.nomeTatuador}
                                <Rate className="ml-2" defaultValue={5} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                            </h2>
                            <p>{this.state.descricaoTatuador}</p>
                            <div className="Simple">
                                <DraggableArea tags={this.state.initialTags} render={({tag, id}) => (
                                <div className="tag undraggable">
                                    {tag.content}
                                </div>)} onChange={tags => console.log(tags)} />
                             </div>
                            <a><img className="social" src={fc}></img></a>
                            <a><img className="social" src={tt}></img></a>
                            <a><img className="social" src={it}></img></a>
                            <a onClick={() =>
                            Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
                                return Linking.openURL(
                                    "https://api.whatsapp.com/send?phone=5561982715613&text=Olá,%20gostaria%20de%20marcar%20uma%20sessão&lang=pt_pt"
                                );
                            })
                            }><img className="social" src={wa}></img></a>
                            <button className="chat" onClick={() => {
                                this.props.history.push('/agenda');
                            }}>Agenda</button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header><h2>Estúdios</h2></Card.Header>
                        <List>
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={capa}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <h3>Tatuagens Bacanas
                                                <Rate className="ml-2" defaultValue={5} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                                            </h3>
                                        </Media.Heading>
                                        <small>Taguatinga Centro - CNB 10, Lote 03, Loja 2</small>
                                    </Media.Body>
                                </Media>
                            </List.GroupItem>
                        </List>
                    </Card>
                    <Card>
                    <Card.Header><h2>Certificações</h2></Card.Header>
                        <Avatar.List className="p-3">
                            <Avatar>OP</Avatar>
                            <Avatar>BP</Avatar>
                            <Avatar>AS</Avatar>
                        </Avatar.List>
                    </Card>
                    <Card>
                        <Card.Header><h2>Feedbacks</h2></Card.Header>
                        <List>
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={capa}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <h3>Camila Souza</h3>
                                        </Media.Heading>
                                         <Rate defaultValue={5} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                                        <p><small>Muito profissional e ético.</small></p>
                                    </Media.Body>
                                </Media>
                            </List.GroupItem>
                        </List>
                    </Card>
                </div>
                <div className="col col-lg-8 mb-5">
                <Card>
                    <Card.Header>
                        <Form.Input placeholder="Menssagem">
                        </Form.Input>
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
                <GalleryCard>
                <Card.Header><h2>Galeria de artes</h2></Card.Header>
                <div className="row">
                    <Grid.Col>
                    <GalleryCard.Image className="m-2" rounded="true" src={ft1}>

                    </GalleryCard.Image>
                    
                    <GalleryCard.Image className="m-2" rounded="true" src={ft2}>

                    </GalleryCard.Image>
                    
                    <GalleryCard.Image className="m-2" rounded="true" src={ft3}>

                    </GalleryCard.Image>
                    </Grid.Col>
                    <Grid.Col>
                    <GalleryCard.Image className="m-2" rounded="true" src={ft4}>

                    </GalleryCard.Image>
                    
                    <GalleryCard.Image className="m-2" rounded="true" src={ft5}>

                    </GalleryCard.Image>
                    
                    <GalleryCard.Image className="m-2" rounded="true" src={ft6}>

                    </GalleryCard.Image>
                    </Grid.Col>
                    <Grid.Col>
                    <GalleryCard.Image className="m-2" rounded="true" src={ft7}>

                    </GalleryCard.Image>
                    
                    <GalleryCard.Image className="m-2" rounded="true" src={ft8}>

                    </GalleryCard.Image>
                    
                    <GalleryCard.Image className="m-2" rounded="true" src={ft11}>

                    </GalleryCard.Image>
                    </Grid.Col>
                    </div>
                </GalleryCard>
                </div>
            </div>
            </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}