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
import {Card, Profile, List, Media, Avatar, GalleryCard} from "tabler-react";
import Rate from 'rc-rate';
import {DraggableArea} from 'react-draggable-tags';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PerfilTatuador.css';
import '../styles/General.css';
import '../styles/Tabler.css';
import '../styles/Stars.css';
import '../styles/Tags.css';
import capa from '../images/RM_11.png';
import api from '../services/api';

// IMAGES
import avatarDefault from './../images/avatar.png';

export default class PerfilTatuador extends Component {
            
constructor(props) {
    super(props);
    this.state = {//variavel que armazena dados do componente para serem usados por ele, e caso alguma das informações mude o render() é executado novamente
        user: getUser(),
        id : this.props.match.params.id,
        studios: [],
        initialTags: [],
        tattooArtist : {},
        certifications : [],
        gallery : [],
        feedbacks : [],
        posts: [],
        socialMedias : [],
        photoView : {id : 0, title : '', content : null},
        certificateView : {id : 0, sigla : '', nome : '', content : null},
    };
    this.handleLike = this.handleLike.bind(this);
}
    
    componentDidMount () {
        this.getTattooArtist();
        this.getTags();
        this.getPosts();
        this.getCertifications();
        this.getStudios();
        this.getPhotos();
        this.getSocialMedias();
        this.getFeedbacks();
    }

    async handleLike() {
        await api.post(`/like-tattoo-artist/${this.state.id}`)
        .then(() => {
            toast.configure()
            toast.success('Seguindo ' + this.state.tattooArtist.name,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
        })
    }

    async getTattooArtist() {
        await api.get(`/show-tattoo-artist/${this.state.id}`)
        .then(res => {
            const tattooArtist = res.data;
            this.setState({ tattooArtist });
        })
    }

    
    async getPhotos() {
        await api.get(`/gallery-tattoo-artist/${this.state.id}`)
        .then(res => {
            this.setState({ gallery: res.data });
        })
        if(this.state.gallery.length < 1){
            $('#alertGallery').css('display', 'inline');
        }else{
            $('#alertGallery').css('display', 'none');
        }
    }

    getSocialMedias() {
        api.get(`/social-media-tattoo-artist/${this.state.id}`)
          .then(res => {         
            this.setState({ socialMedias: res.data });
          })
      }

    async getTags () {
        await api.get(`/tags-tattoo-artist/${this.state.id}`)
            .then(res => {
            this.setState({ initialTags: res.data });
        })
        if(this.state.initialTags.length < 1){
            $('#alertTags').css('display', 'inline');
        }else{
            $('#alertTags').css('display', 'none');
        }
    }

    async getFeedbacks () {
        await api.get(`/feedbacks-tattoo-artist/${this.state.id}`)
            .then(res => {
            this.setState({ feedbacks : res.data });
        })
        if(this.state.feedbacks.length < 1){
            $('#alertFeedbacks').css('display', 'inline');
        }else{
            $('#alertFeedbacks').css('display', 'none');
        }
    }

    async getStudios () {
        await api.get(`/studios-tattoo-artist/${this.state.id}`)
            .then(res => {
            this.setState({ studios : res.data });
        })
        if(this.state.studios.length < 1){
            $('#alertStudios').css('display', 'inline');
        }else{
            $('#alertStudios').css('display', 'none');
        }
    }

    async getPosts () {
        await api.get(`/posts-tattoo-artist/${this.state.id}`)
            .then(res => {
            this.setState({ posts : res.data });
        })
        if(this.state.posts.length < 1){
            $('#alertPosts').css('display', 'inline');
        }else{
            $('#alertPosts').css('display', 'none');
        }
    }

    async getCertifications () {
    await api.get(`/certifications-tattoo-artist/${this.state.id}`)
        .then(res => {
            this.setState({ certifications: res.data });
        })
        if(this.state.certifications.length < 1){
        $('#alertCertifications').css('display', 'inline');
        }else{
        $('#alertCertifications').css('display', 'none');
        }
    }

    getAvatar() {
        const { user } = this.state;
        return (!!user.avatarUrl ? user.avatarUrl : avatarDefault);
    }

  render() {
      return(
          <div className="wrapper wrapper-logado">
                <Navbar avatar={this.getAvatar()}/>
                <div className="container mt-5">
                <div className="row ">
                <div className="col col-lg-4">
                    <Card className="card-profile resumo-perfil">
                        <Card.Header backgroundURL={capa}></Card.Header>
                        <Card.Body className="text-center">
                          <Profile.Image className="card-profile-img" 
                          avatarURL={this.state.tattooArtist.avatarUrl ? this.state.tattooArtist.avatarUrl : avatarDefault}/>
                          <h2>{this.state.tattooArtist.name}
                          < Rate className="ml-2" value={this.state.tattooArtist.score} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                          </h2>
                            <p>{this.state.tattooArtist.description}</p>
                            <div className="Simple">
                                <DraggableArea tags={this.state.initialTags} render={({tag, id}) => (
                                <div className="tag ">                                    
                                    {tag.name}
                                </div>)}/>
                                <div className='alerts'>
                                    <p id='alertTags'>Sem tags para apresentar</p>
                                </div>
                             </div>
                             {this.state.socialMedias.map(socialMedia => {
                             return (
                                <a aria-label={`${socialMedia.name}`} data-balloon-pos="up" onClick={() =>{
                                    Linking.openURL(
                                        socialMedia.link
                                    );
                                }}><img className="social" src={socialMedia.iconUrl}></img></a>
                              )})}
                            <button className="chat" onClick={this.handleLike}>+Seguir</button>
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
                                            <a onClick={() => {
                                            this.props.history.push('/perfil_estudio/' + studio.id)
                                            }}><h4 className='to-link'>{studio.name}
                                            <Rate className="ml-2" value={studio.score} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                                            </h4></a>
                                        </Media.Heading>
                                        {/* <img src={loc}/> <small>{estudio.local}</small> */}
                                    </Media.Body>
                                </Media>
                            </List.GroupItem>
                        ))}
                        <div className='alerts'>
                            <p id='alerStudios'>Sem estúdios cadastrados</p>
                        </div>
                        </List>
                    </Card>
                    <Card>
                    <Card.Header><h2>Certificações</h2></Card.Header>
                        <Avatar.List className="p-3">
                            {this.state.certifications.map(certif => (
                                <Avatar aria-label={certif.name} data-balloon-pos="up" onClick={()=>{
                                    this.setState({certificateView : certif});
                                    $('#viewCertificate').modal('show');}} imageURL={certif.fileUrl}
                                ></Avatar>
                            ))}
                            <div className='alerts'>
                                    <p id='alertCertifications'>Sem certificações para apresentar</p>
                                </div>
                        </Avatar.List>
                    </Card>
                    <Card>
                        <Card.Header><h2>Feedbacks</h2></Card.Header>
                        <List>
                        {this.state.feedbacks.map(feedback => (
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={feedback.avatarUrl ? feedback.avatarUrl : avatarDefault}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <h3>{feedback.name}</h3>
                                        </Media.Heading>
                                        <Rate defaultValue={feedback.score} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                                        <p><small>{feedback.message}</small></p>
                                    </Media.Body>
                                </Media>
                            </List.GroupItem>
                        ))}
                        <div className='alerts'>
                                    <p id='alertFeedbacks'>Sem feedbacks para apresentar</p>
                                </div>
                        </List>
                    </Card>
                </div>
                <div className="col col-lg-8 mb-5">
                <Card>
                    <Card.Header>
                      <h3>Postagens</h3>
                    </Card.Header>
                    <List>
                    {this.state.posts.map(post => (
                        <List.GroupItem>
                        <Media>
                            <Avatar size="md" imageURL={post.tattooArtist.avatarUrl ? post.tattooArtist.avatarUrl : avatarDefault}></Avatar>
                            <Media.Body className="ml-3">
                                <Media.Heading>
                                    <h4>{post.tattooArtist.name}</h4>
                                </Media.Heading>
                                <small>{post.content.split('\n').map(function(item) {
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
                    <div className='alerts'>
                        <p id='alertPosts'>Sem postagens para apresentar</p>
                    </div>
                    </List>
                </Card>
                <GalleryCard>
                <Card.Header>
                    <h2>Galeria de artes</h2>
                </Card.Header>
                    <div className="gallery">
                        {this.state.gallery.map(foto => (
                            <div class="mb-3 pics animation all 2">
                                <Clickable onClick={() => {
                                    this.setState({photoView : foto})
                                    $('#viewPhoto').modal('show');
                                }}>
                                    <img className="rounded img-fluid" src={foto.url}></img>
                                </Clickable>
                            </div>
                        ))}
                    </div>
                    <div className='alerts'>
                        <p id='alertGallery'>Sem tags para apresentar</p>
                    </div>
                </GalleryCard>
                </div>
            </div>
            </div>
              <div class="modal fade" id="viewPhoto" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                      <h3>{this.state.photoView.title}</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img className="rounded img-fluid" src={this.state.photoView.url}></img>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="viewCertificate" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                        <h3>{this.state.certificateView.name}</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img className="rounded img-fluid" src={this.state.certificateView.fileUrl}></img>
                  </div>
                </div>
              </div>
              </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}
