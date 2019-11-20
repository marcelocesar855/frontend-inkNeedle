import React, { Component } from 'react';
import { Linking } from 'react-native-web';
import {Card, Profile, List, Media, Avatar, Form, GalleryCard, Grid} from "tabler-react";
import {Clickable} from 'react-clickable';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'balloon-css';
import $ from 'jquery';
import 'bootstrap';
import Rate from 'rc-rate';
import Navbar from '../components/Navbar';
import {DraggableArea} from 'react-draggable-tags';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PerfilEstudio.css';
import '../styles/General.css';
import '../styles/Tabler.css'
import '../styles/Stars.css'
import '../styles/Tags.css'
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
import mone from '../images/mone.png';
import clo from '../images/clo.png';
import plus from '../images/plus.png';
import certif1 from '../images/certif1.jpg';
import certif2 from '../images/certif2.jpg';
import certif3 from '../images/certif3.jpg';
import api from '../services/api';
import trash from '../images/trash.png';
import delTag from '../images/delete.png';
import delMember from '../images/delete1.png';
import banner from '../images/banner1.jpg'

export default class PerfilTatuador extends Component {

    state = {//variavel que armazena dados do componente para serem usados por ele, e caso alguma das informações mude o render() é executado novamente
        nomeEstudio : 'Tatuagens Bacanas Tattoo Studio',
        descricaoEstudio : 'Tradição da arte milenar que se expressa na pele desde 2001 aqui no DF.',
        menssagem : '',
        eventos : [{nome : 'Flash Day Festival', local : 'Estúdio Tatuagens Bacanas', hora : '19 a 23 de Out, das 9h às 19h',
        preco : 20.0, content : banner, descricao : 'É com imenso prazer que anunciamos o nosso evento Flash Day Festival! \n\n Aqui você tem direito a uma flash grátis (de tamanho micro) e poderá conhecer os tatuadores de nosso estúdio e dos arredores, pois estarão todos presentes esperando pra te rabiscar! \n\n Contaremos também com atrações de literatura, cafés e música, para além de sair mais lindo(a) daqui, sairá com cultura e cafeína \\o/'}],
        initialTags: [
            {id: 1, content: 'Old school', undraggable: true}, {id: 2, content: 'New school', undraggable: true}, {id: 3, content: 'Bold line', undraggable: true},
            {id: 4,  content: 'Tribal', undraggable: true}, {id: 5, content: 'Oriental', undraggable: true}, {id: 6, content: 'Graywash', undraggable: true},
            {id: 7, content: 'Geometric', undraggable: true}, {id: 8, content: 'Biomecanic', undraggable: true}, {id: 9, content: 'Aquerela', undraggable: true}, 
            {id: 10, content: 'Portrait', undraggable: true}],
        membros : [{id : 1, nome : 'Marcelo César', descricao : 'Sou um tatuador muito legal e extrovertido, no meu estúdio tem café, água e biscoito.'}],
        certificacoes : [{id: 1, sigla : 'BS', nome : 'Bio Segurança 50h', content : certif1}, {id: 2, sigla :'OS', nome : 'Desenhos Old School 30h', content : certif2},
        {id: 3, sigla : 'OT', nome : 'Desenhos Orientais 20h', content : certif3}],
        posts : [{id : 1, nome : 'Tatuagens Bacanas Tattoo Studio', content :'Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'},
        {id : 2, nome : 'Tatuagens Bacanas Tattoo Studio', content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'},
        {id : 3, nome : 'Tatuagens Bacanas Tattoo Studio', content : 'Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.'},
        {id : 4, nome : 'Tatuagens Bacanas Tattoo Studio', content : 'Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'}],
        galeria : [{id : 1, title : 'Test Title', content : ft1},{id : 2, title : 'Test Title', content : ft2},
        {id : 3, title : 'Test Title', content : ft3},{id : 4, title : 'Test Title', content : ft4},{id : 5, title : 'Test Title', content : ft5},
            {id : 6, title : 'Test Title', content : ft6},{id : 7, title : 'Test Title', content : ft7},{id : 8, title : 'Test Title', content : ft8},
            {id : 9, title : 'Test Title', content : ft11}],
        feedbacks : [{nome : 'Roberto Nogueira', content : 'Estúdio muito irado, bem equipado e com um pessoal incrível.'}],
        foto : null,
        membro : '',
        selectedFile : null,
        rows : 1,
        rowsMessage : 1,
        menssageControl : true,
        postDelete : null,
        photoView : {id : 0, title : '', content : null},
        certificateView : {id : 0, sigla : '', nome : '', content : null},
        facebook : '',
        twitter : '',
        instagram : '',
        memberDelete : { id : 0, nome : '', descricao : ''},
        eventView : {nome : '', local : '', hora : '',
        preco : 0, content : null, descricao : ''}
    };

    handleSubmit = async (e) => { //método responsável por interceptar o submit do form
        e.preventDefault(); //evita comportamentos padrões do submit
    };

    handleInputChange =  e => {
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

    handleInputChangeFacebook= e => { //possibilita a edição do texto no input
        this.setState({ 
            facebook : e.target.value
        })
    };

    handleInputChangeMembro= e => { //possibilita a edição do texto no input
        this.setState({ 
            membro : e.target.value
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

    deleteMember () {
        const member = this.state.memberDelete;
        const membros = this.state.membros.filter(m => member.id !== m.id);
        this.setState({
            membros : membros,
            memberDelete : { id : 0, nome : '', descricao : ''}
        });
    }
    
    cancelEvent () {
        const event = this.state.eventView;
        const eventos = this.state.eventos.filter(e => event.id !== e.id);
        this.setState({
            eventos : eventos,
            eventView : {nome : '', local : '', hora : '',
            preco : 0, content : null}
        });
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

    handleClickAdd = () => {
        const tags = this.state.initialTags.slice();
        tags.push({id: tags.length + 1 , content: this.input.value, undraggable: true});
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

    handleInputChangeDescricao = e => { //possibilita a edição do texto no input
        const lineHeight = 20;
        const previousRows = e.target.rows;
        e.target.rows = 1;
        const currentRows = ~~(e.target.scrollHeight / lineHeight);
        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }
        this.setState({ 
            descricaoEstudio : e.target.value,
            rows : currentRows
        })
    };

    cadastroEvento = () => {
        this.props.history.push('/cadastro_evento')
    }

    mascaraValor(val) {
        val = val.toString().replace(/\D/g,"");
        val = val.toString().replace(/(\d)(\d{8})$/,"$1.$2");
        val = val.toString().replace(/(\d)(\d{5})$/,"$1.$2");
        val = val.toString().replace(/(\d)(\d{2})$/,"$1,$2");
        return val                    
    }

    changePhoto () { //possibilita a edição do texto no input
        this.setState({
            foto : this.state.selectedFile
        })
    };

    changePhoto () { //possibilita a edição do texto no input
    };

    uploadPhoto () { //possibilita a edição do texto no input
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
                            <Clickable aria-label="Mudar foto de perfil" data-balloon-pos="down" className='center' onClick={() => {
                                $('#uploadPhoto').modal('show');
                            }}>
                                <Profile.Image className="card-profile-img" avatarURL={this.state.foto}/>
                            </Clickable>
                            <h2>{this.state.nomeEstudio}
                                <Rate className="ml-2" defaultValue={5} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                            </h2>
                            <Form.Textarea rows={this.state.rows} id='desc'
                            className='mod-card-back-title'
                            onChange={this.handleInputChangeDescricao}
                            value={this.state.descricaoEstudio}
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
                            {/* <button className="chat">+ Seguir</button> */}
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header><h2>Membros</h2>
                        <div class="dropdown ml-auto">
                            <button class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={plus}></img>
                            </button>
                            <div class="dropdown-menu add-membro" aria-labelledby="dropdownMenu2">
                                <h3 class='ml-3'>Convidar para a equipe</h3>
                            <div class="dropdown-divider"></div>
                                <input value={this.state.membro} onChange={this.handleInputChangeMembro} placeholder=' E-mail do novo membro'></input>
                                <button class="dropdown-item" onClick={() => {
                                    toast.configure()
                                    toast.success("Convite enviado com sucesso.",{
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true
                                    });
                                }}>Convidar</button>
                            </div>
                        </div>
                        </Card.Header>
                        <List>
                            {this.state.membros.map(membro => (
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={test}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <h3>{membro.nome}
                                                <Rate className="ml-2" defaultValue={5} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                                            </h3>
                                        </Media.Heading>
                                        <small>{membro.descricao}</small>
                                    </Media.Body>
                                    <button aria-label="Excluir membro" data-balloon-pos="up" className="btn ml-auto" onClick={() => {
                                        this.setState({memberDelete : membro})
                                    $('#deleteMember').modal('show');
                                }}><img src={delMember}></img></button>
                                </Media>
                            </List.GroupItem>
                        ))}
                        </List>
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
                    <button className="cad-estudio mb-4" onClick={
                            this.cadastroEvento
                        }>Cadastrar evento</button>
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
                             placeholder="Comunicado para os seguidores" onKeyPress={this.handleEnter}
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
                  <div class="modal-body">
                            <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon3">https://www.facebook.com/</span>
                            </div>
                            <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" 
                            onChange={this.handleInputChangeFacebook}
                            value={this.state.facebook}/>
                            </div>
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
                  <div class="modal-body">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon3">https://www.twitter.com/</span>
                        </div>
                        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" 
                        onChange={this.handleInputChangeTwitter}
                        value={this.state.twitter}/>
                        </div>
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
                  <div class="modal-body">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon3">https://www.instagram.com/</span>
                        </div>
                        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" 
                        onChange={this.handleInputChangeInstagram}
                        value={this.state.instagram}/>
                        </div>
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
              <div class="modal fade" id="deleteMember" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Excluir membro da equipe</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h3>Você tem certeza que deseja retirar esse membro da equipe?</h3>
                    <p><font color='red'>Obs: {this.state.memberDelete.nome} será notificado e só poderá fazer parte da equipe novamente com um novo convite.</font></p>
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                          this.deleteMember();
                          $('#deleteMember').modal('hide');
                      }}>Sim</button>
                      <button className='agendar' onClick={() => {
                          $('#deleteMember').modal('hide');
                      }}>Não</button>
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
                  </div>
                  <div class="modal-footer">
                        <button className="cancel-event">Tenho interesse</button>
                        <button className='cancel-event' onClick={() => {
                            $('#cancelEvent').modal('show');
                        }}>Cancelar evento</button>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="cancelEvent" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Cancelar evento {this.state.eventView.nome}</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h3>Você tem certeza que deseja cancelar este evento?</h3>
                    <p><font color='red'>Obs: Os interessados nele serão notificados do cancelamento.</font></p>
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                          this.cancelEvent();
                          $('#viewEvent').modal('hide');
                          $('#cancelEvent').modal('hide');
                      }}>Sim</button>
                      <button className='agendar' onClick={() => {
                          $('#cancelEvent').modal('hide');
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
