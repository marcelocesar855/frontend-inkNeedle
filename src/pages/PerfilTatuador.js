import React, { Component } from 'react';
import { Linking } from 'react-native-web';
import { getUser } from '../services/auth';
import {Clickable} from 'react-clickable';
import { toast } from 'react-toastify'
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
import delTag from '../images/delete.png';
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
import plus from '../images/plus.png';
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
        menssagem : '',
        initialTags: [
            {id: 1, content: 'Old school', undraggable: true}, {id: 2, content: 'New school', undraggable: true}, {id: 3, content: 'Bold line', undraggable: true},
            {id: 4,  content: 'Tribal', undraggable: true}, {id: 5, content: 'Oriental', undraggable: true}, {id: 6, content: 'Graywash', undraggable: true},
            {id: 7, content: 'Geometric', undraggable: true}, {id: 8, content: 'Biomecanic', undraggable: true}, {id: 9, content: 'Aquerela', undraggable: true},
            {id: 10, content: 'Portrait', undraggable: true}],
        estudios : [{nome : 'Tatuagens Bacanas', local : 'Taguatinga Centro - CNB 10, Lote 03, Loja 2'}],
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
        foto : null,
        selectedFile : null,
        rows : 1,
        rowsMessage : 1,
        menssageControl : true,
        postDelete : null,
        photoView : {id : 0, title : '', content : null},
        certificateView : {id : 0, sigla : '', nome : '', content : null},
        facebook : 'https://www.facebook.com/',
        twitter : 'https://www.twitter.com/',
        instagram : 'https://www.instagram.com/',
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

    handleInputChangeFacebook= e => { //possibilita a edição do texto no input
        this.setState({ 
            facebook : e.target.value
        })
    };

    handleInputChangeTwitter= e => { //possibilita a edição do texto no input
        this.setState({ 
            twitter : e.target.value
        })
    };

    handleInputChangeInstagram= e => { //possibilita a edição do texto no input
        this.setState({ 
            instagram : e.target.value
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

    deleteCertificate () {
        const certif = this.state.certificateView;
        const certifs = this.state.certificacoes.filter(c => certif.id !== c.id);
        this.setState({
            certificacoes : certifs,
            certificateView : {
                id : 0,
                sigla : '',
                nome : '',
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
        this.getStudios();
        this.setState({foto : test});
        const lines = document.getElementById('desc').scrollHeight / 20;
        this.setState({rows : lines})
    }

    getStudios() {
        api.get(`/studios`)
        .then(res => {
            const studios = res.data;
            this.setState({ studios });
        })
    }

    handleInputChangeFoto = e => { //possibilita a edição do texto no input
        this.setState({
            selectedFile : e.target.files[0]
        })
    };

    cadastroEstudio = () => {
        this.props.history.push('/cadastro_estudio')
    }

    changePhoto () { //possibilita a edição do texto no input
    };

    uploadPhoto () { //possibilita a edição do texto no input
    };

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
                            <Clickable aria-label="Mudar foto de perfil" data-balloon-pos="down" className='center' onClick={() => {
                                $('#uploadPhoto').modal('show');
                            }}>
                                      <Profile.Image className="card-profile-img" avatarURL={this.getAvatar()}/>
                            </Clickable>
                                  <h2>{user.name}
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
                                <input ref={r => this.input = r} className="rounded-left"/>
                                <button className="rounded-right" onClick={this.handleClickAdd}>Add tag</button>
                            </div>
                            <a aria-label='Editar Facebook' data-balloon-pos="up" onClick={() =>{
                                 $('#changeFacebook').modal('show');
                                // Linking.openURL(
                                //     this.state.facebook
                                // );
                                
                            }
                            }><img className="social" src={fc}></img></a>
                            <a aria-label='Editar Twitter' data-balloon-pos="up" onClick={() =>{
                                 $('#changeTwitter').modal('show');
                                // Linking.openURL(
                                //     this.state.twitter
                                // );
                            }
                            }><img className="social" src={tt}></img></a>
                            <a aria-label='Editar Instagram' data-balloon-pos="up" onClick={() =>{
                                $('#changeInstagram').modal('show');
                                // Linking.openURL(
                                //     this.state.instagram
                                // );
                            }
                            }><img className="social" src={it}></img></a>
                            <a onClick={() =>{
                                // Linking.openURL(
                                //     "https://api.whatsapp.com/send?phone=5561982715613&text=Olá,%20gostaria%20de%20marcar%20uma%20sessão&lang=pt_pt"
                                // );
                            }
                            }><img className="social" src={wa}></img></a>
                            <button className="chat" onClick={() => {
                                this.props.history.push('/agenda');
                            }}>Agenda</button>
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
                        <button className="cad-estudio mb-4" onClick={
                            this.cadastroEstudio
                        }>Cadastrar estúdio</button>
                    </Card>
                    <Card>
                    <Card.Header><h2>Certificações</h2>
                    <button aria-label="Adicionar certificado" data-balloon-pos="up" className="btn ml-auto" onClick={() => {
                         $('#uploadCertificate').modal('show');
                        }}><img src={plus}></img></button></Card.Header>
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
                                <small>{secao.content.split('\n').map(function(item) {
                                    return (
                                        <span>
                                        {item}
                                        <br/>
                                        </span>
                                    )
                                    })}</small>
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
                <Card.Header>
                    <h2>Galeria de artes</h2>
                    <button aria-label="Adicionar foto" data-balloon-pos="up" className="btn ml-auto" onClick={() => {
                         $('#uploadGaleryPhoto').modal('show');
                    }}><img src={plus}></img></button>
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
              <div class="modal fade" id="uploadGaleryPhoto" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Adicionar foto a galeria</h3>
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
              <div class="modal fade" id="viewCertificate" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                        <input className='mod-card-back-title image-title'
                            onChange={e => {
                                this.setState({certificateView : {
                                    nome : e.target.value,
                                    content : this.state.certificateView.content
                                }})
                            }}
                            value={this.state.certificateView.nome}
                            />
                            <button className='btn' onClick={() => {
                                $('#deleteCertificate').modal('show');
                            }}><img src={trash}></img></button>
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
              <div class="modal fade" id="deleteCertificate" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Excluir certificado</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h3>Você tem certeza que deseja excluir esse certificado?</h3>
                    <p><font color='red'>Obs: Essa ação não pode ser desfeita.</font></p>
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                          this.deleteCertificate();
                          $('#deleteCertificate').modal('hide');
                          $('#viewCertificate').modal('hide')
                      }}>Sim</button>
                      <button className='agendar' onClick={() => {
                          $('#deleteCertificate').modal('hide');
                      }}>Não</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="uploadCertificate" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Adicionar certificado de experiência</h3>
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
                      <button className='agendar' onClick={() => {
                          $('#uploadCertificate').modal('hide');
                          toast.configure()
                          toast.success("Certificado enviado com sucesso!\nAnalisaremos a atenticidadade dele e em breve estará publicado em seu perfil.",{
                            position: "top-right",
                            autoClose: 7000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true
                            });
                      }}>Upload</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="changeFacebook" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Mudar perfil no Facebook</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body formulario">
                      Facebook:&nbsp;&nbsp;
                        <input className='w-75'
                            onChange={this.handleInputChangeFacebook}
                            value={this.state.facebook} />
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                          $('#changeFacebook').modal('hide');
                          toast.configure()
                          toast.success("Perfil no Facebook alterado com sucesso.",{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true
                            });
                      }}>Salvar</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="changeTwitter" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Mudar perfil no Twitter</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body formulario">
                        Twitter:&nbsp;&nbsp;
                        <input className='w-75'
                            onChange={this.handleInputChangeTwitter}
                            value={this.state.twitter} />
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                          $('#changeTwitter').modal('hide');
                          toast.configure()
                          toast.success("Perfil no Twitter alterado com sucesso.",{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true
                            });
                      }}>Salvar</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="changeInstagram" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Mudar perfil no Instagram</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body formulario">
                        Instagram:&nbsp;&nbsp;
                        <input className='w-75'
                            onChange={this.handleInputChangeInstagram}
                            value={this.state.instagram} />
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                          $('#changeInstagram').modal('hide');
                          toast.configure()
                          toast.success("Perfil no Instagram alterado com sucesso.",{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true
                            });
                      }}>Salvar</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="teamInvate" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Convite para se juntar ao (nome do estúdio)</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body formulario">
                        <p>(nome tatuador) está te convidando para fazer parte da equipe do (nome do estúdio).</p>
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                          $('#teamInvate').modal('hide');
                          toast.configure()
                          toast.success("Convite aceito! Agora você faz parte da equipe do (nome do estúdio)",{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true
                            });
                      }}>Aceitar</button>
                      <button className='agendar' onClick={() => {
                          $('#teamInvate').modal('hide');
                          toast.configure()
                          toast.error("Convite recusado.",{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true
                            });
                      }}>Recursar</button>
                  </div>
                </div>
              </div>
              </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}
