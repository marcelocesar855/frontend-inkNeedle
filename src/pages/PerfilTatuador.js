import React, { Component } from 'react';
import { Linking, Text } from 'react-native-web';
import {Clickable} from 'react-clickable';
import $ from 'jquery';
import 'bootstrap';
import { logout } from '../services/auth';
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
import loc from '../images/loc.png';
import trash from '../images/trash.png';
import api from '../services/api';

export default class PerfilTatuador extends Component {

    state = {//variavel que armazena dados do componente para serem usados por ele, e caso alguma das informações mude o render() é executado novamente
        nomeTatuador : 'Marcelo César',
        descricaoTatuador : 'Sou um tatuador muito legal e extrovertido, no meu estúdio tem café, água e biscoito.',
        menssagem : '',
        initialTags: [
            {id: 1, content: 'Old school'}, {id: 2, content: 'New school', undraggable: true}, {id: 3, content: 'Bold line'},
            {id: 4,  content: 'Tribal'}, {id: 5, content: 'Oriental'}, {id: 6, content: 'Graywash'},
            {id: 7, content: 'Geometric'}, {id: 8, content: 'Biomecanic'}, {id: 9, content: 'Aquerela'}, {id: 10, content: 'Portrait'}],
        estudios : [{nome : 'Tatuagens Bacanas', local : 'Taguatinga Centro - CNB 10, Lote 03, Loja 2'}],
        certificacoes : ['OP', 'BP', 'AS'],
        posts : [{id : 1, nome : 'Marcelo César', content :'Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'},
        {id : 2, nome : 'Marcelo César', content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'},
        {id : 3, nome : 'Marcelo César', content : 'Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.'},
        {id : 4, nome : 'Marcelo César', content : 'Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'}],
        feedbacks : [{nome : 'Camila Souza', content : 'Muito profissional e ético.'}],
        galeria : [{id : 1, title : 'Test Title', content : ft1},{id : 2, title : 'Test Title', content : ft2},
        {id : 3, title : 'Test Title', content : ft3},{id : 4, title : 'Test Title', content : ft4},{id : 5, title : 'Test Title', content : ft5},
            {id : 6, title : 'Test Title', content : ft6},{id : 7, title : 'Test Title', content : ft7},{id : 8, title : 'Test Title', content : ft8},
            {id : 9, title : 'Test Title', content : ft11}],
        foto : null,
        selectedFile : null,
        rows : 1,
        rowsMessage : 1,
        menssageControl : true,
        postDelete : null,
        photoView : {id : 0, title : '', content : null}
    };

    handleSubmit = async (e) => { //método responsável por interceptar o submit do form
        e.preventDefault(); //evita comportamentos padrões do submit
    };

    handleInputChangeMenssagem = e => {
        if (this.state.menssageControl){
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
        }
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

    deleteMessage () {
        const post = this.state.postDelete;
        const posts = this.state.posts.filter(p => post.id !== p.id);
        this.setState({
            posts : posts,
            postDelete : null
        });
    }

    deletePhoto () {
        const photo = this.state.photoView;
        const photos = this.state.galeria.filter(f => photo.id !== f.id);
        this.setState({
            galeria : photos,
            photoView : {
                id : 0,
                title : '',
                content : null
            }
        });
    }

    handleClickAdd = () => {
        const tags = this.state.initialTags.slice();
        tags.push({id: tags.length + 1 , content: this.input.value});
        this.setState({initialTags : tags});
        this.input.value = '';
    }

    handleEnter = e => {
        if (e.key == 'Enter' && !e.shiftKey && this.state.menssagem != '') {
            this.addMessage()
            this.setState({menssageControl : false})
        }else if (e.key == 'Enter' && this.state.menssagem == ''){
            this.setState({menssageControl : false})
        }else {
            this.setState({menssageControl : true})
        }
    }

    addMessage () {
        const posts = this.state.posts;
        var post = { id: posts.length + 1, nome : this.state.nomeTatuador, content : this.state.menssagem};
        this.setState({posts : [post].concat(posts)})
        this.setState({
            menssagem : '',
            rowsMessage : 1
        })
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
                <Navbar/>
                <div className="container mt-5">
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
                        {this.state.estudios.map(estudio => (
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={capa}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <h3>{estudio.nome}
                                                <Rate className="ml-2" defaultValue={5} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                                            </h3>
                                        </Media.Heading>
                                        <img src={loc}/><small>{estudio.local}</small>
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
                                <Avatar>{certif}</Avatar>
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
                            <Form.Textarea rows={this.state.rowsMessage} id='mens' onChange={this.handleInputChangeMenssagem}
                             placeholder="Menssagem para seus seguidores" onKeyPress={this.handleEnter}
                            value={this.state.menssagem} onSubmit={this.addMessage} className="post"
                            />
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
                            <button className='btn' onClick={() => {
                                this.setState({postDelete : secao})
                                $('#deletePost').modal('show');
                            }}><img src={trash}></img></button>
                        </Media>
                    </List.GroupItem>
                    ))}
                    </List>
                </Card>
                <GalleryCard>
                <Card.Header><h2>Galeria de artes</h2></Card.Header>
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
              <div class="modal fade" id="deletePost" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Excluir postagem</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h3>Você tem certeza que deseja excluir essa postagem?</h3>
                    <p><font color='red'>Obs: Essa ação não pode ser desfeita.</font></p>
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                          this.deleteMessage();
                          $('#deletePost').modal('hide');
                      }}>Sim</button>
                      <button className='agendar' onClick={() => {
                          this.setState({postDelete : null})
                          $('#deletePost').modal('hide');
                      }}>Não</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="viewPhoto" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                        <input className='mod-card-back-title image-title'
                            onChange={e => {
                                this.setState({photoView : {
                                    title : e.target.value,
                                    content : this.state.photoView.content
                                }})
                            }}
                            value={this.state.photoView.title}
                            />
                            <button className='btn' onClick={() => {
                                $('#deletePhoto').modal('show');
                            }}><img src={trash}></img></button>
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
              <div class="modal fade" id="deletePhoto" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Excluir foto</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h3>Você tem certeza que deseja excluir essa foto?</h3>
                    <p><font color='red'>Obs: Essa ação não pode ser desfeita.</font></p>
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                          this.deletePhoto();
                          $('#deletePhoto').modal('hide');
                          $('#viewPhoto').modal('hide')
                      }}>Sim</button>
                      <button className='agendar' onClick={() => {
                          $('#deletePhoto').modal('hide');
                      }}>Não</button>
                  </div>
                </div>
              </div>
              </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}