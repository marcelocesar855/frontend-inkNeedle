import React, { Component } from 'react';
import { Linking, Text } from 'react-native-web';
import {Clickable} from 'react-clickable';
import $ from 'jquery';
import 'bootstrap';
import { logout } from '../services/auth';
import {Card, Profile, List, Media, Avatar, Form, GalleryCard, Grid, Button} from "tabler-react";
import Rate from 'rc-rate';
import {DraggableArea} from 'react-draggable-tags';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PerfilTatuador.css';
import '../styles/General.css';
import '../styles/Tabler.css';
import '../styles/Stars.css';
import '../styles/Tags.css';
import delTag from '../images/delete.png';
import logo2 from '../images/logo2.png';
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
            {id: 7, content: 'Geometric'}, {id: 8, content: 'Biomecanic'}, {id: 9, content: 'Aquerela'}, {id: 10, content: 'Portrait'}],
        foto : null,
        selectedFile : null,
        rows : 1
    };

    handleSubmit = async (e) => { //método responsável por interceptar o submit do form
        e.preventDefault(); //evita comportamentos padrões do submit
    };

    handleInputChange =  e => {
    };

    handleInputChangeDescricao = e => { //possibilita a edição do texto no input
        const lineHeight = 20;
        const previousRows = e.target.rows;
        e.target.rows = 1;
        const currentRows = ~~(e.target.scrollHeight / lineHeight);
        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }
        this.setState({ 
            descricaoTatuador : e.target.value,
            rows : currentRows
        })
    };


    handleClickDelete = tag => {
        const tags = this.state.initialTags.filter(t => tag.id !== t.id);
        this.setState({initialTags : tags});
    }

    handleClickAdd = () => {
        const tags = this.state.initialTags.slice();
        tags.push({id: tags.length + 1 , content: this.input.value});
        this.setState({initialTags : tags});
        this.input.value = '';
    }

    componentDidMount () {
        this.setState({foto : test});
        const lines = document.getElementById('desc').scrollHeight / 20;
        this.setState({rows : lines})
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
                <nav class="navbar navbar-expand-lg navbar-light">
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
                            <a class="dropdown-item" href="#" onClick={() => {
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
                <div className="row ">
                <div className="col col-lg-4">
                    <Card className="card-profile resumo-perfil">
                        <Card.Header backgroundURL={capa}></Card.Header>
                        <Card.Body className="text-center">
                            <Clickable className='center' onClick={() => {
                                $('#uploadPhoto').modal('show');
                            }}>
                                <Profile.Image className="card-profile-img" avatarURL={this.state.foto}/>
                            </Clickable>
                            <h2>{this.state.nomeTatuador}
                                <Rate className="ml-2" defaultValue={5} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                            </h2>
                            <Form.Textarea rows={this.state.rows} id='desc'
                            className='mod-card-back-title'
                            onChange={this.handleInputChangeDescricao}
                            value={this.state.descricaoTatuador}
                            />
                            <div className="Simple">
                                <DraggableArea tags={this.state.initialTags} render={({tag, id}) => (
                                <div className="tag ">                                    
                                    {tag.content}
                                    &nbsp;&nbsp;
                                    <img
                                    className="delete"
                                    src={delTag}
                                    onClick={() => this.handleClickDelete(tag)}
                                    />
                                </div>)} onChange={tags => console.log(tags)} />
                             </div>
                             <div className="inputs">
                                <input ref={r => this.input = r} />
                                <button onClick={this.handleClickAdd}>Add tag</button>
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
                            <button className="chat">+ Seguir</button>
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
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}