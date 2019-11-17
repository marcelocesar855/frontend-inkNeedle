import React, { Component } from 'react';
import { Linking } from 'react-native-web';
import {Card, Profile, List, Media, Avatar, Form, GalleryCard, Grid} from "tabler-react";
import {Clickable} from 'react-clickable';
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
import loc from '../images/loc.png';
import mone from '../images/mone.png';
import clo from '../images/clo.png';
import api from '../services/api';
import trash from '../images/trash.png';
import delTag from '../images/delete.png';

export default class PerfilTatuador extends Component {

    state = {//variavel que armazena dados do componente para serem usados por ele, e caso alguma das informações mude o render() é executado novamente
        nomeEstudio : 'Tatuagens Bacanas Tattoo Studio',
        descricaoEstudio : 'Tradição da arte milenar que se expressa na pele desde 2001 aqui no DF.',
        menssagem : '',
        eventos : [{nome : 'Flash Day Festival', local : 'Estúdio Tatuagens Bacanas', hora : '19 a 23 de Out, das 9h às 19h',
        preco : 20.0}],
        initialTags: [
            {id: 1, content: 'Old school', undraggable: true}, {id: 2, content: 'New school', undraggable: true}, {id: 3, content: 'Bold line', undraggable: true},
            {id: 4,  content: 'Tribal', undraggable: true}, {id: 5, content: 'Oriental', undraggable: true}, {id: 6, content: 'Graywash', undraggable: true},
            {id: 7, content: 'Geometric', undraggable: true}, {id: 8, content: 'Biomecanic', undraggable: true}, {id: 9, content: 'Aquerela', undraggable: true}, 
            {id: 10, content: 'Portrait', undraggable: true}],
        membros : [{nome : 'Marcelo César', descricao : 'Sou um tatuador muito legal e extrovertido, no meu estúdio tem café, água e biscoito.'}],
        certificacoes : ['OP', 'BP', 'AS'],
        posts : [{id : 1, nome : 'Tatuagens Bacanas Tattoo Studio', content :'Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'},
        {id : 2, nome : 'Tatuagens Bacanas Tattoo Studio', content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'},
        {id : 3, nome : 'Tatuagens Bacanas Tattoo Studio', content : 'Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.'},
        {id : 4, nome : 'Tatuagens Bacanas Tattoo Studio', content : 'Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'}],
        feedbacks : [{nome : 'Roberto Nogueira', content : 'Estúdio muito irado, bem equipado e com um pessoal incrível.'}],
        foto : null,
        selectedFile : null,
        rows : 1,
        rowsMessage : 1,
        menssageControl : true,
        postDelete : null
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
                            <button className="chat">+ Seguir</button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header><h2>Membros</h2></Card.Header>
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
                                </Media>
                            </List.GroupItem>
                        ))}
                        </List>
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
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}