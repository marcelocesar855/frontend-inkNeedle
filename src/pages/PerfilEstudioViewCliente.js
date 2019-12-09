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
import loc from '../images/loc.png';
import mone from '../images/mone.png';
import clo from '../images/clo.png';

// IMAGES
import avatarDefault from './../images/avatar.png';
import Home from './Home';

export default class PerfilTatuador extends Component {

    state = {//variavel que armazena dados do componente para serem usados por ele, e caso alguma das informações mude o render() é executado novamente
        user: getUser(),
        id : this.props.match.params.studioId,
        studios: [],
        studio : {},
        initialTags: [],
        members : [],
        events : [],
        certifications : [],
        gallery : [],
        feedbacks : [],
        posts: [],
        socialMedias : [],
        photoView : {id : 0, title : '', file : {}},
        certificateView : {id : 0, sigla : '', nome : '', file : {}},
        eventView : {id : 0, title : '', description : '', studio : {}, price : 0},
        rowsEvent : 1
    };
    
    componentDidMount () {
        this.getStudio();
        this.getTags();
        this.getPosts();
        this.getCertifications();
        this.getMembers();
        this.getEvents();
        this.getPhotos();
        this.getSocialMedias();
        this.getFeedbacks();
    }

    handleCustomerLikeAlter(check) {
        const { studio } = this.state;
        studio.customerLike = check;
        this.setState({ studio });
    }

    handleLike = async (e) => {
        e.preventDefault();

        const { studio } = this.state;

        await api.post(`/like-studio/${this.state.id}`)
        .then(() => {           
            this.toastAlert(`Seguindo ${studio.name}`, 'success'); 
            this.handleCustomerLikeAlter(true);
        }).catch(error => {
            this.toastAlert(error.response.data.message, 'error');
        })
    }

    handleDislike = async (e) => {
        e.preventDefault();

        const { studio } = this.state;

        await api.post(`/dislike-studio/${this.state.id}`)
        .then(() => {            
            this.toastAlert(`Deixou de seguir ${studio.name}`, 'success');  
            this.handleCustomerLikeAlter(false);
        }).catch(error => {
            this.toastAlert(error.response.data.message, 'error');            
        })
    }

    getStudio() {
        api.get(`/show-studio/${this.state.id}`)
        .then(res => {
            const studio = res.data;
            this.setState({ studio });
        })
    }

    toastAlert(message, type = 'info') {
        toast.configure();
        const config = {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
        };

        switch (type) {
            case 'success':
                toast.success(message, config);
                break;
            case 'error':
                toast.error(message, config);
                break;
            case 'warn':
                toast.warn(message, config);
                break;
            case 'info':
                toast.info(message, config);
                break;
            default: 
                toast.info(message, config);
                break;
        }        
    }
    
    async getPhotos() {
        await api.get(`/gallery-studio/${this.state.id}`)
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
        api.get(`/social-medias-studio/${this.state.id}`)
          .then(res => {         
            this.setState({ socialMedias: res.data });
          })
      }

    async getTags () {
        await api.get(`/studio-index-tags/${this.state.id}`)
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
        await api.get(`/my-feedbacks-studio/${this.state.id}`)
            .then(res => {
            this.setState({ feedbacks : res.data });
        })
        if(this.state.feedbacks.length < 1){
            $('#alertFeedbacks').css('display', 'inline');
        }else{
            $('#alertFeedbacks').css('display', 'none');
        }
    }

    async getEvents () {
        await api.get(`/events-studio/${this.state.id}`)
            .then(res => {
            this.setState({ events : res.data });
        })
        if(this.state.events.length < 1){
            $('#alertEvents').css('display', 'inline');
        }else{
            $('#alertEvents').css('display', 'none');
        }
    }

    async getMembers () {
        await api.get(`/my-members-studio/${this.state.id}`)
            .then(res => {
            this.setState({ members : res.data });
        })
    }

    async getPosts () {
        await api.get(`/posts-studio/${this.state.id}`)
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
        await api.get(`/certifications-studio/${this.state.id}`)
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
        if(user != null){
            return (!!user.avatar.url ? user.avatar.url : avatarDefault);
        }
    }

    mascaraValor(val) {
        val = val.toString().replace(/\D/g,"");
        val = val.toString().replace(/(\d)(\d{8})$/,"$1.$2");
        val = val.toString().replace(/(\d)(\d{5})$/,"$1.$2");
        val = val.toString().replace(/(\d)(\d{2})$/,"$1,$2");
        return val                    
    }

    handleEventCustomerLikeAlter(check) {
        const { eventView } = this.state;
        eventView.customerLike = check;
        this.setState({ eventView });
    }

    handleLikeEvent = async (e) =>{
        e.preventDefault();

        const { eventView } = this.state;

        await api.post(`/like-event-studio/${eventView.id}`)
        .then(() => {
            this.toastAlert(`Evento ${eventView.title} adicionado a sua lista de interesses`, 'success');
            this.handleEventCustomerLikeAlter(true);            
        }).catch(error => {
            this.toastAlert(error.response.data.message, 'error');           
        });
    }

    handleDislikeEvent = async (e) =>{
        e.preventDefault();

        const { eventView } = this.state;

        await api.post(`/dislike-event-studio/${eventView.id}`)
        .then(() => {
            this.toastAlert(`Evento ${eventView.title} removido da sua lista de interesses`, 'success');  
            this.handleEventCustomerLikeAlter(false);           
        }).catch(error => {
            this.toastAlert(error.response.data.message, 'error');           
        });
    }

    formatar(data, hora) {
        
        data = new Date(data);
      
        var day = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][data.getDay()];
        var date = data.getDate();
        var month = ["Jan.", "Fev.", "Mar.", "Abr.", "Mai.", "Jun.", "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."][data.getMonth()];
        var year = data.getFullYear();
      
        return (`${day}, ${date} de ${month} de ${year} às ${hora}h`);
      }

    getAvatar() {
        const { user } = this.state;
        if(user != null){
            return (!!user.avatar.url ? user.avatar.url : avatarDefault);
        }
    }

    pushTattooArtist(tattooArtistId) {
        this.props.history.push(`/perfil_tatuador/${tattooArtistId}`);
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
                          avatarURL={this.state.studio.avatarUrl ? this.state.studio.avatarUrl : avatarDefault}/>
                          <h2>{this.state.studio.name}
                          < Rate className="ml-2" value={this.state.studio.score} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                          </h2>
                            <p>{this.state.studio.description}</p>
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

                             {
                                (this.state.studio.customerLike ? (
                                          <button style={{ background: 'rgb(23, 189, 1)' }} className="chat" aria-label="Deixar de seguir" data-balloon-pos="up" onClick={this.handleDislike}>Seguindo</button>
                                ) : (
                                    <button className="chat" onClick={this.handleLike}>+Seguir</button>
                                ))
                             }
                            
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header><h2>Membros</h2></Card.Header>
                        <List>
                            {this.state.members.map(member => (
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={member.avatarUrl}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <a onClick={() => {
                                            this.pushTattooArtist(member.id);                                                
                                            }}><h4 className='to-link'>{member.name}
                                            <Rate className="ml-2" value={member.score} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                                            </h4></a>
                                            <small>{member.description}</small>
                                        </Media.Heading>
                                    </Media.Body>
                                </Media>
                            </List.GroupItem>
                        ))}
                        </List>
                    </Card>
                    <Card>
                    <Card.Header><h2>Eventos</h2></Card.Header>
                    <List>
                        {this.state.events.map(event => (
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={event.bannerUrl ? event.bannerUrl : avatarDefault }></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <a onClick={() => {
                                                this.setState({
                                                    eventView : event
                                                });

                                                $('#viewEvent').modal('show');
                                            }}><h4 className='to-link'>{event.title}</h4></a>
                                        </Media.Heading>
                                        <small>
                                            <p><img src={loc}/>&nbsp;&nbsp;{event.studio.name}
                                            <br/><img src={clo}/>&nbsp;&nbsp;{this.formatar(event.dateStart, event.timeStart)}
                                            <br/><img src={mone}/>&nbsp;&nbsp;<font color="green">{event.price !== 0.0 ? 'R$ '+this.mascaraValor(event.price.toFixed(2)) : 'Grátis'}</font>
                                            </p>
                                        </small>
                                    </Media.Body>
                                </Media>
                            </List.GroupItem>
                        ))}
                        <div className='alerts'>
                            <p id='alertEvents'>Sem eventos para apresentar</p>
                        </div>
                    </List>
                    </Card>
                    <Card>
                    <Card.Header><h2>Certificações</h2></Card.Header>
                        <Avatar.List className="p-3">
                            {this.state.certifications.map(certif => (
                                <Avatar aria-label={certif.name} data-balloon-pos="up" onClick={()=>{
                                    this.setState({certificateView : certif});
                                    $('#viewCertificate').modal('show');}} imageURL={certif.file.url}
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
                                    <Avatar size="md" imageURL={feedback.Scheduling.customer.User.avatar[0] ? feedback.Scheduling.customer.User.avatar[0] : avatarDefault}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <h3>{feedback.Scheduling.customer.User.name}</h3>
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
                            <Avatar size="md" imageURL={this.state.studio.avatarUrl ? this.state.studio.avatarUrl : avatarDefault}></Avatar>
                            <Media.Body className="ml-3">
                                <Media.Heading>
                                    <h4>{this.state.studio.name}</h4>
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
                                    <img className="rounded img-fluid" src={foto.file.url}></img>
                                </Clickable>
                            </div>
                        ))}
                    </div>
                    <div className='alerts'>
                        <p id='alertGallery'>Sem fotos para apresentar</p>
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
                    <img className="rounded img-fluid" src={this.state.photoView.file.url}></img>
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
                    <img className="rounded img-fluid" src={this.state.certificateView.file.url}></img>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal fade" id="viewEvent" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3>{this.state.eventView.title}</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img className="rounded mx-auto d-block" src={this.state.eventView.bannerUrl}></img><br/>
                        <p><font className='font-weight-bold'>Onde será:</font>&nbsp;&nbsp;{this.state.eventView.studio.name}</p>
                        <p><font className='font-weight-bold'>Quando:</font>&nbsp;&nbsp;{this.formatar(this.state.eventView.dateStart, this.state.eventView.timeStart)}</p>
                        <p><font className='font-weight-bold'>Entrada:</font>&nbsp;&nbsp;{<font color="green">{this.state.eventView.price !== 0.0 ? 'R$ '+this.mascaraValor(this.state.eventView.price.toFixed(2)) : 'Grátis'}</font>}</p>
                            <div class="border rounded p-2 text-justify">
                                {this.state.eventView.description.split('\n').map(function(item) {
                                    return (
                                        <span>
                                        {item}
                                        <br/>
                                        </span>
                                    )
                                })}
                            </div>
                  </div>
                  <div class="modal-footer">
                      {
                        (this.state.eventView.customerLike ? (
                            <button style={{ background: 'rgb(23, 189, 1)' }} aria-label="Perdi Interesse" data-balloon-pos="up" className='cancel-event' onClick={this.handleDislikeEvent}>
                                Já na sua lista de interesses
                            </button>
                        ) : (
                            <button className='cancel-event' onClick={this.handleLikeEvent}>Tenho interesse</button>
                        ))
                      }
                        
                  </div>
                </div>
              </div>
              </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}