import React, { Component } from 'react';
import { getUser, setAvatarUser } from '../services/auth';
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

import Swal from 'sweetalert2'
import api from '../services/api';

// IMAGES
import avatarDefault from './../images/avatar.png';
import delTag from '../images/delete.png';
import capa from '../images/RM_11.png';
import trash from '../images/trash.png';
import plus from '../images/plus.png';

export default class PerfilTatuador extends Component {

    state = {
        user: getUser(),
        studios: [],
        descricaoTatuador : null,
        descricaoTatuadorRows : null,
        initialTags: [],
        socialMediaTypes: [],
        socialMedias: [],
        modalAddSocialMedia: {
          link: '',
          socialMediaTypeId: '',
          number: '',
          message: ''
        },
        modalEditSocialMedia: {
          id: '',
          link: '',
          type: {
            id: '',
            name: '',
            icon: ''
          },
          number: '',
          message: ''
        },
        certificationTypes : [],
        certifications : [],
        posts : [],
        post: {
          message: '',
          rowsMessage: 1
        },
        feedbacks : [],
        galleries : [],
        uploadGaleryImage: {
          title: '',
          file: null
        },
        imageView: { id: null, title: '', file: { url: ''} },
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
        selectedAvatarFile : null,
        modalAddCertification : {
          name: '',         
          certificationTypeId: '',
          selectedFile: null
        },
        modalEditCertification : {
          id: '',
          name: '',
          file: {
            url: ''
          },
          certificationTypeId: '',
          selectedFile: null
        },
        baseURL : ''
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

    componentDidMount() {
      this.getStudios();
      this.getDescription();
      this.getTags();
      this.getSocialMediaTypes();
      this.getSocialMedias();
      this.getCertificationTypes();
      this.getCertification();
      this.getFeedbacks();
      this.getPosts();
      this.getGalleries();
      const lines = document.getElementById('desc').scrollHeight / 20;
      this.setState({ descricaoTatuadorRows: lines })
    }

    handleInputChangeMessage = e => {
        const lineHeight = 20;
        const previousRows = e.target.rows;
        e.target.rows = 1;
        const currentRows = ~~(e.target.scrollHeight / lineHeight);

        if (currentRows === previousRows) {
          e.target.rows = currentRows;
        }

        const { post } = this.state;
        post.message = e.target.value;
        post.rowsMessage = currentRows;

        this.setState({ post });
    };

    handleInputChangeDescricao = e => { //possibilita a edição do texto no input
        const lineHeight = 20;
        const previousRows = e.target.rows;
        e.target.rows = 1;
        const descricaoTatuadorRows = ~~(e.target.scrollHeight / lineHeight);
        if (descricaoTatuadorRows === previousRows) {
          e.target.rows = descricaoTatuadorRows;
        }
        const descricaoTatuador =  e.target.value;
        this.setState({ descricaoTatuador, descricaoTatuadorRows });
    };   

    handleInputBlurDescricao = () => {
        let { descricaoTatuador } = this.state;    
        let url =  '/tattoo-artist/description';
        
        api({
          method: 'put',
          url,
          data: {
            description: descricaoTatuador
          }
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

        if (this.input.value.length === 0) {
          return;
        }

        if (this.saveTag(this.input.value)) {
          tags.push({ id: tags.length + 1, name: this.input.value });
          this.setState({ initialTags: tags });        
        }

        this.input.value = '';        
    }

    handleClickDelete = tag => {
      if (this.deleteTag(tag.id)) {
        const tags = this.state.initialTags.filter(t => tag.id !== t.id);
        this.setState({ initialTags: tags });
      }      
    }

    async saveTag (name) {
      let url = 'tattoo-artist-store-tag';
      let check = false;

      await api({
        method: 'post',
        url,
        data: {
          name 
        }
      })
      .then((response) => {
        check = true;
      });

      return check;       
    }

    async deleteTag (id) {
      let check = false;

      let url = `/tattoo-artist-destroy-tag/${id}`;
      await api({
        method: 'delete',
        url
      })
      .then((response) => {
         check = true;
      });    

      return check;       
    }

    handleEnterMessage = e => {
        if (e.key === 'Enter' && !!this.state.post.message && this.state.post.message.length > 0) {
            this.addMessage();
        }
    }   

    getDescription() {
      api.get(`/tattoo-artist-show-description`)
        .then(res => {
          const { description } = res.data;
          this.setState({ descricaoTatuador: description });
        })
    }

    getTags() {
      api.get(`/tattoo-artist-index-tags`)
        .then(res => {
          this.setState({ initialTags: res.data });
        })
    }

    getSocialMedias() {
      api.get(`/tattoo-artist-index-social-media`)
        .then(res => {         
          this.setState({ socialMedias: res.data });
        })
    }

    getStudios() {
        api.get(`/studios`)
        .then(res => {
            const studios = res.data;
            this.setState({ studios });
        })
    }

    defineBaseURL(id) {
      switch(id) {
        case '1' : this.setState({baseURL : 'https://www.facebook.com/'});break;
        
        case '2' : this.setState({baseURL : 'https://www.twitter.com/'});break;
        
        case '3' : this.setState({baseURL : 'https://www.instagram.com/'});break;

        default : this.setState({baseURL : ''});break;
      }
    }

    defineBaseURLEdit(id) {
      switch(id) {
        case 1 : this.setState({baseURL : 'https://www.facebook.com/'});break;
        
        case 2 : this.setState({baseURL : 'https://www.twitter.com/'});break;
        
        case 3 : this.setState({baseURL : 'https://www.instagram.com/'});break;

        default : this.setState({baseURL : ''});break;
      }
    }

    getCertificationTypes() {
      api.get(`/tattoo-artist-index-certification-types`)
        .then(res => {
          const certificationTypes = res.data;
            this.setState({ certificationTypes });
        })
    }

    getCertification() {
        api.get(`/tattoo-artist-index-certification`)
        .then(res => {
            const certifications = res.data;
            this.setState({ certifications });
        })
    }

    getSocialMediaTypes() {
      api.get(`/tattoo-artist-index-social-media-types`)
        .then(res => {
          this.setState({ socialMediaTypes: res.data });
        })
    }

    getFeedbacks() {
      api.get(`/tattoo-artist-my-feedbacks`)
        .then(res => {
          this.setState({ feedbacks: res.data });
        })
    }

    getPosts() {
      api.get(`/tattoo-artist-index-posts`)
        .then(res => {
          this.setState({ posts: res.data });
        })
    }

    getGalleries() {
      api.get(`/tattoo-artist-index-galleries`)
        .then(res => {
          this.setState({ galleries: res.data });
        })
    }

    addSocialMedia() {
      $('#changeModalAddSocialMedia').modal('show');
    }

    addCertification() {
      $('#modalAddCertificate').modal('show');
    }

    addGallery() {
      $('#uploadGaleryImage').modal('show');
    }

    editGallery(image) {
      this.setState({ imageView: image });
      $('#viewImage').modal('show');
    }

    editGalleryClose() {
      $('#viewImage').modal('hide');
    }

    addGalleryClose() {
      $('#uploadGaleryImage').modal('hide');
    }

    addCertificationClose() {
      $('#modalAddCertificate').modal('hide');
    }    

    editSocialMedia(socialMedia) {
      this.setState({ modalEditSocialMedia: socialMedia });
      this.defineBaseURLEdit(socialMedia.type.id)
      $('#changeModalEditSocialMedia').modal('show');
    }

    editCertification(modalEditCertification) {
      this.setState({ modalEditCertification });
      $('#modalEditCertificate').modal('show');
    }

    editCertificationClose() {
      $('#modalEditCertificate').modal('hide');
    }

    submitAddSocialMedia = (e) => {
      e.preventDefault();
      let url = '/tattoo-artist-store-social-media';

      let { modalAddSocialMedia } = this.state;

      const data = {
        link: (modalAddSocialMedia.socialMediaTypeId === '4' ? this.generateLinkWhatsapp(modalAddSocialMedia.number, modalAddSocialMedia.message) : modalAddSocialMedia.link),
        socialMediaTypeId: modalAddSocialMedia.socialMediaTypeId
      }

      api({
        method: 'post',
        url,
        data
      })
      .then((response) => {
        Swal.fire(
          'Adicionado!',
          'Rede social adicionada com sucesso.',
          'success'
        );

        this.getSocialMedias();

        $('#changeModalAddSocialMedia').modal('hide');

        let modalAddSocialMedia = {
          link: '',
          socialMediaTypeId: '',
          number: '',
          message: ''
        };

        this.setState({ modalAddSocialMedia });
      });

    }

    submitEditSocialMedia = (e) => {
      e.preventDefault();
      let { modalEditSocialMedia } = this.state;

      let url = `/tattoo-artist-update-social-media/${modalEditSocialMedia.id}`;

      const data = {
        link: (modalEditSocialMedia.type.id === 4 ? this.generateLinkWhatsapp(modalEditSocialMedia.number, modalEditSocialMedia.message) : modalEditSocialMedia.link)
      }

      api({
        method: 'put',
        url,
        data
      })
      .then((response) => {        
        Swal.fire(
          'Atualização!',
          'Rede social atualizada com sucesso.',
          'success'
        );

        this.getSocialMedias();

        $('#changeModalEditSocialMedia').modal('hide');

        let modalEditSocialMedia = {
          id: '',
          link: '',
          type: {
            id: '',
            name: '',
            icon: ''
          },
          number: '',
          message: ''
        };

        this.setState({ modalEditSocialMedia });
      });

    }

    submitAddCertification = (e) => {
        e.preventDefault();
        let { modalAddCertification } = this.state;

        let url = `/tattoo-artist-store-certification`;

        const formData = new FormData();

        formData.append('name', modalAddCertification.name);
        formData.append('certificationTypeId', modalAddCertification.certificationTypeId);
        formData.append('file', modalAddCertification.selectedFile);

        api({
          method: 'post',
          url,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => {
            Swal.fire(
              'Adicionado!',
              'Certificação adicionada com sucesso',
              'success'
            );

            this.getCertification();
            this.addCertificationClose();

            let modalAddCertification = {
              name: '',
              certificationTypeId: '',
              selectedFile: null
            };

            this.setState({ modalAddCertification });
        })
        .catch((response) => {
          console.log(response);
        });
    }    

    submitEditCertification = (e) => {
      e.preventDefault();

      let { modalEditCertification } = this.state;      
      let url = `/tattoo-artist-update-certification/${modalEditCertification.id}`;

      const formData = new FormData();

      formData.append('name', modalEditCertification.name);
      formData.append('certificationTypeId', modalEditCertification.certificationTypeId);
      formData.append('file', modalEditCertification.selectedFile);

      api({
        method: 'post',
        url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => {

          Swal.fire(
            'Atualização!',
            'Certificação atualizada com sucesso',
            'success'
          );

          this.getCertification();
          this.editCertificationClose();

          let modalEditCertification = {
            id: '',
            name: '',
            file: {
              url: ''
            },
            certificationTypeId: '',
            selectedFile: null
          };

          this.setState({ modalEditCertification });
        })
        .catch((response) => {
          console.log(response);
        });

    }

    deleteCertification(id) {
      Swal.fire({
        title: 'Você tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Não',
        preConfirm: (login) => {
            let url = `/tattoo-artist-destroy-certification/${id}`;
            api({
              method: 'delete',
              url
            }).then((response) => {
              Swal.fire(
                'Deletado!',
                'Certificação deletada com sucesso',
                'success'
              );
              this.getCertification();
              this.editCertificationClose();
            });
        },
      });   
    }

    deleteSocialMedia(id) {     
      Swal.fire({
        title: 'Você tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Não',
        preConfirm: () => {
            let url = `/tattoo-artist-destroy-social-media/${id}`;

            api({
              method: 'delete',
              url
            }).then((response) => {
              Swal.fire(
                'Deletado!',
                'Rede social deletada com sucesso.',
                'success'
              );
              this.getSocialMedias();
              $('#changeModalEditSocialMedia').modal('hide');
            });
        },
      });        
    }

    addMessage = () => {
      let url = '/tattoo-artist-store-posts';

      let { post } = this.state;

      api({
        method: 'post',
        url,
        data: {
          content: post.message
        }
      })
        .then((response) => {
          this.getPosts();
          post.message = '';
          post.rowsMessage = 1;
          this.setState({ post });
        });

    }

    deletePost(id) {
      Swal.fire({
        title: 'Você tem certeza em deletar postagem?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Não',
        preConfirm: () => {
          let url = `/tattoo-artist-destroy-posts/${id}`;
          api({
            method: 'delete',
            url
          }).then((response) => {
            Swal.fire(
              'Deletado!',
              'Postagem deletada com sucesso.',
              'success'
            );
            this.getPosts();
          });
        },
      });
    }

    submitAddGalleryImage = (e) => {
        e.preventDefault();
        let { uploadGaleryImage } = this.state;

        let url = `/tattoo-artist-store-galleries`;

        const formData = new FormData();

        formData.append('title', uploadGaleryImage.title);
        formData.append('file', uploadGaleryImage.file);

        api({
          method: 'post',
          url,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => {
          Swal.fire(
            'Adicionado!',
            'Imagem adicionada com sucesso',
            'success'
          );

          this.getGalleries();
          this.addGalleryClose();

          uploadGaleryImage.title = '';
          uploadGaleryImage.file = null;

          this.setState({ uploadGaleryImage });
        })
        .catch((response) => {
          console.log(response);
        });
    }

    handleInputBlurGalleryTitle = () => {
      this.submitEditGalleryImage();      
    }

    submitEditGalleryImage() {
        let { imageView } = this.state;
        let url = `/tattoo-artist-update-galleries/${imageView.id}`;

        api({
          method: 'put',
          url,
          data: {
            title: imageView.title
          }
        });
    }

    deleteGalleryImage(id) {
      Swal.fire({
        title: 'Você tem certeza em deletar imagem?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Não',
        preConfirm: () => {
          let url = `/tattoo-artist-destroy-galleries/${id}`;
          api({
            method: 'delete',
            url
          }).then((response) => {
            Swal.fire(
              'Deletado!',
              'Imagem deletada com sucesso.',
              'success'
            );
            this.editGalleryClose();
            this.getGalleries();
          });
        },
      });
    }

    generateLinkWhatsapp(number, message) {
      let link = `https://api.whatsapp.com/send?phone=${number}&text=${message}&lang=pt_pt`;
      return link;
    }

    handleInputChangeFoto = e => { //possibilita a edição do texto no input
        this.setState({
            selectedAvatarFile : e.target.files[0]
        })
    }

    cadastroEstudio = () => {
        this.props.history.push('/cadastro_estudio')
    }

    changePhoto = () => { //possibilita a edição do texto no input
        const { selectedAvatarFile } = this.state;        
        let url = '/users-avatar';
        let formData = new FormData();

        formData.append('file', selectedAvatarFile);

        api({
          method: 'post',
          url,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => {
            if (response.data.url) {
                setAvatarUser(response.data.url);
                this.getAvatar();
                $('#uploadPhoto').modal('hide');
            }
        })
        .catch((response) => {
            console.log(response);
        });
    }

    getAvatar() {
        const { user } = this.state;
        return (!!user.avatar.url ? user.avatar.url : avatarDefault);
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

                          <Form.Textarea rows={this.state.descricaoTatuadorRows} id='desc'
                            className='mod-card-back-title'
                            onChange={this.handleInputChangeDescricao}
                            onBlur={this.handleInputBlurDescricao}
                            value={this.state.descricaoTatuador}
                            placeholder="Deixe uma descrição sobre você aqui"
                            maxLength="65"
                            />

                            <div className="Simple">
                                <DraggableArea tags={this.state.initialTags} render={({tag, id}) => (
                                <div className="tag ">                                    
                                    {tag.name}
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
                           {this.state.socialMedias.map(socialMedia => {
                             return (<a aria-label={`Editar ${socialMedia.type.name}`} data-balloon-pos="up" onClick={() => { this.editSocialMedia(socialMedia); }}>
                                <img className="social" src={socialMedia.type.icon} />
                              </a>);
                            })}
                            <a aria-label="Adicionar rede social" className="btn btn-primary mt-3" data-balloon-pos="down" onClick={() => { this.addSocialMedia(); }}>
                      <i className="fa fa-plus" style={{ color: '#FFF'}}></i>   
                            </a>                
                            <button className="chat" onClick={() => {
                                this.props.history.push('/agenda');
                            }}>Agenda</button>
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
                        this.addCertification();
                      }}><img src={plus}></img></button></Card.Header>
                        <Avatar.List className="p-3">
                          {this.state.certifications.map(certification => (
                                <Avatar aria-label={certification.name} data-balloon-pos="up" onClick={()=>{
                                    this.editCertification(certification)
                                }}>{certification.certificationType.name}</Avatar>
                          ))}
                        </Avatar.List>
                    </Card>
                    <Card>
                        <Card.Header><h2>Feedbacks</h2></Card.Header>
                        <List>
                        {this.state.feedbacks.map(feedback => (
                            <List.GroupItem>
                                <Media>
                              <Avatar size="md" imageURL={feedback.Scheduling.customer.User.avatar.url}></Avatar>
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
                        </List>
                    </Card>
                </div>
                <div className="col col-lg-8 mb-5">
                <Card>
                    <Card.Header>
                        <Form.Textarea rows={this.state.post.rowsMessage} id='mens' onChange={this.handleInputChangeMessage}
                      placeholder="Menssagem para seus seguidores" value={this.state.post.message} onKeyPress={this.handleEnterMessage} className="post"
                        />
                    </Card.Header>
                    <List>
                    {this.state.posts.map(post => (
                        <List.GroupItem>
                            <Media>
                              <Avatar size="md" imageURL={this.getAvatar()}></Avatar>
                                <Media.Body className="ml-3">
                                    <Media.Heading>
                                      <h4>{user.name}</h4>
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
                                <button className='btn' onClick={() => {
                                  this.deletePost(post.id);
                                }}><img src={trash}/></button>
                            </Media>
                        </List.GroupItem>
                    ))}
                    </List>
                </Card>
                <GalleryCard>
                    <Card.Header>
                        <h2>Galeria de artes</h2>
                        <button aria-label="Adicionar foto" data-balloon-pos="up" className="btn ml-auto" onClick={() => {
                            this.addGallery();
                        }}><img src={plus}/></button>
                    </Card.Header>
                    <div className="gallery">
                      {this.state.galleries.map(image => (
                            <div class="mb-3 pics animation all 2">                                
                                <Clickable onClick={() => {
                                    this.editGallery(image);
                                }}>
                                  <img className="rounded img-fluid" src={ image.file.url }/>
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
                    <h3 class="modal-title" id="TituloModalCentralizado">Alterar foto de perfil</h3>
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
                  <div class="modal-footer text-center">
                      <button className='btn btn-primary' onClick={this.changePhoto}>Upload</button>
                  </div>
                </div>
              </div>
              </div>

              <div class="modal fade" id="uploadGaleryImage" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="TituloModalCentralizado">Adicionar imagem a galeria</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form onSubmit={this.submitAddGalleryImage}>                      
                      <div className="form-group">
                        <label>Título*</label>
                        <input type="text" onChange={(e) => {
                          let uploadGaleryImage = this.state.uploadGaleryImage;
                          uploadGaleryImage.title = e.target.value;
                          this.setState({ uploadGaleryImage });
                        }} name="title" className="form-control" required />
                      </div>
                      <div className="form-group files">
                        <label>Imagem*</label>
                        <input type="file" onChange={(e) => {
                          let uploadGaleryImage = this.state.uploadGaleryImage;
                          uploadGaleryImage.file = e.target.files[0];
                          this.setState({ uploadGaleryImage });
                        }} name="file" className="form-control" required />
                      </div>
                      <small>Campos obrigatórios (*)</small> <br /> <br />
                      <button type="submit" className="btn btn-primary">Salvar</button>
                    </form> 
                  </div>                  
                </div>
              </div>
              </div>           

              <div class="modal fade" id="viewImage" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                      <input className='mod-card-back-title image-title' 
                      onChange={e => {
                        let imageView = this.state.imageView;
                        imageView.title = e.target.value;
                        this.setState({ imageView });                             
                      }}
                      value={this.state.imageView.title} onBlur={this.handleInputBlurGalleryTitle} />                           
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img className="rounded img-fluid" src={this.state.imageView.file.url}></img>
                  </div>
                  <div class="modal-footer">
                    <button className='btn btn-danger' onClick={() => { this.deleteGalleryImage(this.state.imageView.id); }}>Deletar</button>                    
                  </div>
                </div>
              </div>
              </div>

              <div class="modal fade" id="modalAddCertificate" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                     Adicionar Certificação
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form onSubmit={this.submitAddCertification}>
                      <div className="form-group">
                        <label>Tipo*</label>
                        <select className="form-control" onChange={(e) => {
                          let modalAddCertification = this.state.modalAddCertification;
                          modalAddCertification.certificationTypeId = e.target.value;
                          this.setState({ modalAddCertification });
                      }} value={this.state.modalAddCertification.certificationTypeId} required>
                          <option value="">Selecione</option>
                          {this.state.certificationTypes.map(certificationType => {
                            return (<option value={certificationType.id}>{certificationType.name}</option>);
                          })}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Nome*</label>
                        <input type="text" onChange={(e) => {
                          let modalAddCertification = this.state.modalAddCertification;
                          modalAddCertification.name = e.target.value;
                          this.setState({ modalAddCertification });
                        }} name="name" className="form-control" required />
                      </div> 
                      <div className="form-group">
                        <label>Arquivo*</label>
                        <input type="file" onChange={(e) => {
                          let modalAddCertification = this.state.modalAddCertification;
                          modalAddCertification.selectedFile = e.target.files[0];
                          this.setState({ modalAddCertification });
                        }} name="file" className="form-control" required />
                      </div>                                           
                      <small>Campos obrigatórios (*)</small> <br /> <br />
                      <button type="submit" className="btn btn-primary">Salvar</button>
                    </form>                    
                  </div>
                </div>
              </div>
              </div>

              <div class="modal fade" id="modalEditCertificate" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                     Editar Certificação
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <button className="btn btn-danger" onClick={() => {
                          this.deleteCertification(this.state.modalEditCertification.id);
                        }}>Deletar</button>
                      </div>
                      <div className="col-md-12 text-center">
                        <img className="rounded img-fluid my-3" src={this.state.modalEditCertification.file.url}></img>
                        <form onSubmit={this.submitEditCertification}>
                          <div className="form-group">
                            <label>Tipo*</label>
                            <select className="form-control" onChange={(e) => {
                              let modalEditCertification = this.state.modalEditCertification;
                              modalEditCertification.certificationTypeId = e.target.value;
                              this.setState({ modalEditCertification });
                            }} value={this.state.modalEditCertification.certificationTypeId} required>
                              <option value="">Selecione</option>
                              {this.state.certificationTypes.map(certificationType => {
                                return (<option value={certificationType.id}>{certificationType.name}</option>);
                              })}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Nome*</label>
                            <input type="text" onChange={(e) => {
                              let modalEditCertification = this.state.modalEditCertification;
                              modalEditCertification.name = e.target.value;
                              this.setState({ modalEditCertification });
                            }} name="name" value={this.state.modalEditCertification.name} className="form-control" required />
                          </div>
                          <div className="form-group">
                            <label>Arquivo*</label>
                            <input type="file" onChange={(e) => {
                              let modalEditCertification = this.state.modalEditCertification;
                              modalEditCertification.selectedFile = e.target.files[0];
                              this.setState({ modalEditCertification });
                            }} name="file" className="form-control" required />
                          </div>
                          <small>Campos obrigatórios (*)</small> <br /> <br />
                          <button type="submit" className="btn btn-primary">Salvar</button>
                        </form>        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
                           

              <div class="modal fade" id="changeModalEditSocialMedia" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                  <h3 class="modal-title" id="TituloModalCentralizado">Editar {this.state.modalEditSocialMedia.type.name}</h3>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <div className="row">
                          <div className="col-md-12 text-center">
                      <button className="btn btn-danger" onClick={() => {
                        this.deleteSocialMedia(this.state.modalEditSocialMedia.id);
                      }}>Deletar</button>
                          </div>
                          <div className="col-md-12">
                            <p> <strong>{this.state.modalEditSocialMedia.type.name}</strong> </p>
                           <form onSubmit={this.submitEditSocialMedia}>
                            {(this.state.modalEditSocialMedia.type.id !== 4 ? (
                                <div className="form-group">
                                  <label>Link*</label>
                                  <div class="input-group">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text fix-link">{this.state.baseURL}</span>
                                    </div>
                                    <input type="text" class="form-control" value={this.state.modalEditSocialMedia.link} onChange={(e) => {
                                    let modalEditSocialMedia = this.state.modalEditSocialMedia;
                                    modalEditSocialMedia.link = e.target.value;
                                    this.setState({ modalEditSocialMedia });
                                  }} name="link" className="form-control" placeholder="Link rede social" required/>
                            </div>
                                </div>
                                ) : (
                                  <div>
                                    <small>{this.state.modalEditSocialMedia.link}</small>
                                    <div className="form-group">
                                      <label>Número*</label>
                                      <input type="text" onChange={(e) => {
                                        let modalEditSocialMedia = this.state.modalEditSocialMedia;
                                        modalEditSocialMedia.number = e.target.value;
                                        this.setState({ modalEditSocialMedia });
                                      }} name="number" className="form-control" placeholder="Número do Whatsapp" required />
                                    </div>
                                    <div className="form-group">
                                      <label>Menssagem*</label>
                                      <textarea className="form-control" onChange={(e) => {
                                        let modalEditSocialMedia = this.state.modalEditSocialMedia;
                                        modalEditSocialMedia.message = e.target.value;
                                        this.setState({ modalEditSocialMedia });
                                      }} placeholder="Mensagem" required  ></textarea>
                                    </div>
                                  </div>
                                ))}
                              <small>Campos obrigatórios (*)</small> <br /> <br />
                              <button type="submit" className="btn btn-primary">Salvar</button>
                            </form>
                          </div>
                        </div>
                    </div>                   
                  </div>
                </div>
              </div>

              <div class="modal fade" id="changeModalAddSocialMedia" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                  <h3 class="modal-title" id="TituloModalCentralizado">Adicionar rede social</h3>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form onSubmit={this.submitAddSocialMedia}>                        
                        <div className="form-group">
                          <label>Tipo*</label>
                          <select className="form-control" onChange={(e) => {
                            let modalAddSocialMedia = this.state.modalAddSocialMedia;
                            modalAddSocialMedia.socialMediaTypeId = e.target.value;                            
                            this.setState({ modalAddSocialMedia });
                            this.defineBaseURL(modalAddSocialMedia.socialMediaTypeId)
                          }} required>
                            <option value="">Selecione</option>
                            {this.state.socialMediaTypes.map(socialMediaType => {
                              return (<option value={socialMediaType.id}>{socialMediaType.name}</option>);
                            })}
                          </select>
                        </div>

                        {(this.state.modalAddSocialMedia.socialMediaTypeId !== '4' ? (
                          <div className="form-group">
                            <label>Link*</label>
                            <div class="input-group">
                              <div class="input-group-prepend">
                              <span class="input-group-text fix-link">{this.state.baseURL}</span>
                              </div>
                              <input type="text" class="form-control" onChange={(e) => {
                              let modalAddSocialMedia = this.state.modalAddSocialMedia;
                              modalAddSocialMedia.link = e.target.value;
                              this.setState({ modalAddSocialMedia });
                            }} name="link" className="form-control" placeholder="Link rede social" required/>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="form-group">
                              <label>Número*</label>
                              <input type="text" onChange={(e) => {
                                let modalAddSocialMedia = this.state.modalAddSocialMedia;
                                modalAddSocialMedia.number = e.target.value;
                                this.setState({ modalAddSocialMedia });
                              }} name="number" className="form-control" placeholder="Número do Whatsapp" required />
                            </div>
                            <div className="form-group">
                              <label>Menssagem*</label>
                              <textarea className="form-control" onChange={(e) => {
                                let modalAddSocialMedia = this.state.modalAddSocialMedia;
                                modalAddSocialMedia.message = e.target.value;
                                this.setState({ modalAddSocialMedia });
                              }} placeholder="Mensagem" required  ></textarea>
                            </div>
                          </div>
                        ))}                                                 
                        <small>Campos obrigatórios (*)</small> <br /> <br />
                        <button type="submit" className="btn btn-primary">Salvar</button>
                      </form>
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
                </div>'
              </div>

              <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}
