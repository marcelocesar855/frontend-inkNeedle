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
import { getUser } from '../services/auth';
import certif1 from '../images/certif1.jpg';
import certif2 from '../images/certif2.jpg';
import certif3 from '../images/certif3.jpg';
import trash from '../images/trash.png';
import delTag from '../images/delete.png';
import delMember from '../images/delete1.png';
import banner from '../images/banner1.jpg';
import avatarDefault from './../images/avatar.png';

import Swal from 'sweetalert2'
import api from '../services/api';
import moment from 'moment';

export default class PerfilTatuador extends Component {

    state = {//variavel que armazena dados do componente para serem usados por ele, e caso alguma das informações mude o render() é executado novamente
        user: getUser(),
        studioId: null,
        studio: {            
            id: null,
            isManager: null,
            name: "",
            addresses: [],
            score: 0
        },
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
        baseURL: '',
        certificationTypes: [],
        certifications: [],
        modalAddCertification: {
            name: '',
            certificationTypeId: '',
            selectedFile: null
        },
        modalEditCertification: {
            id: '',
            name: '',
            file: {
                url: ''
            },
            certificationTypeId: '',
            selectedFile: null
        },
        feedbacks: [],
        descricaoEstudio : '',
        descricaoEstudioRows: 1,
        menssagem : '',
        initialTags: [],
        posts: [],
        post: {
            message: '',
            rowsMessage: 1
        },
        rowsMessage: 1,
        galleries: [],
        uploadGaleryImage: {
            title: '',
            file: null
        },
        imageView: { id: null, title: '', file: { url: '' } },
        members : [],        
        events : [],        
        foto : null,
        addMember : null,
        selectedFile : null,
        rowsEvent : 1,
        menssageControl : true,
        postDelete : null,
        photoView : {id : 0, title : '', content : null},
        certificateView : {id : 0, sigla : '', nome : '', content : null},
        facebook : '',
        twitter : '',
        instagram : '',
        memberDelete : { id : 0, nome : '', descricao : ''},
        eventView : {nome : '', local : '', hora : ''},
        preco : 0, content : null, descricao : ''
    };

    componentDidMount() {
        const { match: { params } } = this.props;
        const studioId = params.studioId;

        this.setState({ studioId });      
        
        this.getStudio(studioId);
        this.getDescription(studioId);
        this.getTags(studioId);
        this.getSocialMediaTypes(studioId);
        this.getSocialMedias(studioId);
        this.getEvents(studioId);
        this.getMembers(studioId);
        this.getCertificationTypes();
        this.getCertification(studioId);
        this.getFeedbacks(studioId);
        this.getPosts(studioId);
        this.getGalleries(studioId);
        this.setState({ foto: test });
        const lines = document.getElementById('desc').scrollHeight / 20;
        this.setState({ descricaoEstudioRows: lines })
    }

    getStudio(studioId) {
        api.get(`/my-studio/${studioId}`)
        .then(res => {
            this.setState({ studio: res.data });
        });
    }

    getDescription(studioId) {
        api.get(`/studio-show-description/${studioId}`)
            .then(res => {
                const { description } = res.data;
                this.setState({ descricaoEstudio: description });
                const lines = document.getElementById('desc').scrollHeight / 20;
                this.setState({ descricaoEstudioRows: lines })
            })
    }

    getTags(studioId) {
        api.get(`/studio-index-tags/${studioId}`)
        .then(res => {
            this.setState({ initialTags: res.data });
        })
    }

    getSocialMediaTypes() {
        api.get(`/tattoo-artist-index-social-media-types`)
        .then(res => {
            this.setState({ socialMediaTypes: res.data });
        })
    }

    getSocialMedias(studioId) {
        api.get(`/studio-index-social-media/${studioId}`)
            .then(res => {
                this.setState({ socialMedias: res.data });
            })
    }

    getCertificationTypes() {
        api.get(`tattoo-artist-index-certification-types`)
            .then(res => {
                const certificationTypes = res.data;
                this.setState({ certificationTypes });
            })
    }

    getCertification(studioId) {
        api.get(`/studio-index-certification/${studioId}`)
            .then(res => {
                const certifications = res.data;
                this.setState({ certifications });
            })
    }

    getFeedbacks(studioId) {
        api.get(`/studio-my-feedbacks/${studioId}`)
            .then(res => {
                this.setState({ feedbacks: res.data });
            })
    }

    getPosts(studioId) {
        api.get(`/studio-index-posts/${studioId}`)
        .then(res => {
            this.setState({ posts: res.data });
        })
    }

    getGalleries(studioId) {
        api.get(`/studio-index-galleries/${studioId}`)
            .then(res => {
                this.setState({ galleries: res.data });
            })
    }

    getEvents(studioId) {
        api.get(`/studio-index-event/${studioId}`)
            .then(res => {
                this.setState({ events: res.data });
            })
    }

    getMembers(studioId) {
        api.get(`/studio-my-members/${studioId}`)
            .then(res => {
                this.setState({ members: res.data });
            })
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

    async saveTag(name) {
        let url = 'studio-store-tag';
        let check = false;

        const { studioId } = this.state;   

        await api({
            method: 'post',
            url,
            data: {
                name,
                studioId
            }
        })
            .then((response) => {
                check = true;
            });

        return check;
    }

    async deleteTag(id) {
        let check = false;
        let url = `/studio-destroy-tag/${id}`;

        const { studioId } = this.state;   

        await api({
            method: 'delete',
            url,
            data: {
                studioId
            }
        })
            .then((response) => {
                check = true;
            });

        return check;
    }

    defineBaseURL(id) {
        switch (id) {
            case '1': this.setState({ baseURL: 'https://www.facebook.com/' }); break;

            case '2': this.setState({ baseURL: 'https://www.twitter.com/' }); break;

            case '3': this.setState({ baseURL: 'https://www.instagram.com/' }); break;

            default: this.setState({ baseURL: '' }); break;
        }
    }

    defineBaseURLEdit(id) {
        switch (id) {
            case 1: this.setState({ baseURL: 'https://www.facebook.com/' }); break;

            case 2: this.setState({ baseURL: 'https://www.twitter.com/' }); break;

            case 3: this.setState({ baseURL: 'https://www.instagram.com/' }); break;

            default: this.setState({ baseURL: '' }); break;
        }
    }

    addSocialMedia() {
        $('#changeModalAddSocialMedia').modal('show');
    }

    editSocialMedia(socialMedia) {
        this.setState({ modalEditSocialMedia: socialMedia });
        this.defineBaseURLEdit(socialMedia.type.id)
        $('#changeModalEditSocialMedia').modal('show');
    }

    submitAddSocialMedia = (e) => {
        e.preventDefault();
        let url = '/studio-store-social-media';

        let { modalAddSocialMedia, studioId } = this.state;

        const data = {
            link: (modalAddSocialMedia.socialMediaTypeId === '4' ? this.generateLinkWhatsapp(modalAddSocialMedia.number, modalAddSocialMedia.message) : modalAddSocialMedia.link),
            socialMediaTypeId: modalAddSocialMedia.socialMediaTypeId,
            studioId
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

                this.getSocialMedias(studioId);

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
        let { modalEditSocialMedia, studioId } = this.state;

        let url = `/studio-update-social-media/${modalEditSocialMedia.id}`;

        const data = {
            studioId,
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

                this.getSocialMedias(studioId);

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

    generateLinkWhatsapp(number, message) {
        let link = `https://api.whatsapp.com/send?phone=${number}&text=${message}&lang=pt_pt`;
        return link;
    }

    deleteSocialMedia(id) {
        const { studioId } = this.state;
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF8C00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Não',
            preConfirm: () => {
                let url = `/studio-destroy-social-media/${id}`;

                api({
                    method: 'delete',
                    url,
                    data: {
                        studioId
                    }
                }).then((response) => {
                    Swal.fire(
                        'Deletado!',
                        'Rede social deletada com sucesso.',
                        'success'
                    );
                    this.getSocialMedias(studioId);
                    $('#changeModalEditSocialMedia').modal('hide');
                });
            },
        });
    }

    addCertification() {
        $('#modalAddCertificate').modal('show');
    }

    addCertificationClose() {
        $('#modalAddCertificate').modal('hide');
    }

    editCertification(modalEditCertification) {
        this.setState({ modalEditCertification });
        $('#modalEditCertificate').modal('show');
    }

    editCertificationClose() {
        $('#modalEditCertificate').modal('hide');
    }

    submitAddCertification = (e) => {
        e.preventDefault();
        let { modalAddCertification, studioId } = this.state;

        let url = `/studio-store-certification`;

        const formData = new FormData();

        formData.append('name', modalAddCertification.name);
        formData.append('certificationTypeId', modalAddCertification.certificationTypeId);
        formData.append('file', modalAddCertification.selectedFile);
        formData.append('studioId', studioId);

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

                this.getCertification(studioId);
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

        let { modalEditCertification, studioId} = this.state;
        let url = `/studio-update-certification/${modalEditCertification.id}`;

        const formData = new FormData();

        formData.append('name', modalEditCertification.name);
        formData.append('certificationTypeId', modalEditCertification.certificationTypeId);
        formData.append('file', modalEditCertification.selectedFile);
        formData.append('studioId', studioId);

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

                this.getCertification(studioId);
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
        const { studioId } = this.state;

        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF8C00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Não',
            preConfirm: (login) => {
                let url = `/studio-destroy-certification/${id}`;
                api({
                    method: 'delete',
                    url,
                    data: {
                        studioId
                    }
                }).then((response) => {
                    Swal.fire(
                        'Deletado!',
                        'Certificação deletada com sucesso',
                        'success'
                    );
                    this.getCertification(studioId);
                    this.editCertificationClose();
                });
            },
        });
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
    }
    
    handleEnterMessage = e => {
        if (e.key === 'Enter' && !!this.state.post.message && this.state.post.message.length > 0) {
            this.addMessage();
        }
    }  

    addMessage = () => {
        let url = '/studio-store-posts';

        let { post, studioId } = this.state;

        api({
            method: 'post',
            url,
            data: {
                content: post.message,
                studioId
            }
        })
            .then((response) => {
                this.getPosts(studioId);
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
            confirmButtonColor: '#FF8C00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Não',
            preConfirm: () => {
                let { studioId } = this.state;
                let url = `/studio-destroy-posts/${id}`;
                api({
                    method: 'delete',
                    url,
                    data: {
                        studioId
                    }
                }).then((response) => {
                    Swal.fire(
                        'Deletado!',
                        'Postagem deletada com sucesso.',
                        'success'
                    );
                    this.getPosts(studioId);
                });
            },
        });
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

    submitAddGalleryImage = (e) => {
        e.preventDefault();
        let { uploadGaleryImage, studioId } = this.state;

        let url = `/studio-store-galleries`;

        const formData = new FormData();

        formData.append('title', uploadGaleryImage.title);
        formData.append('file', uploadGaleryImage.file);
        formData.append('studioId', studioId);

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

                this.getGalleries(studioId);
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
        let { imageView, studioId } = this.state;
        let url = `/tattoo-artist-update-galleries/${imageView.id}`;

        api({
            method: 'put',
            url,
            data: {
                title: imageView.title,
                studioId
            }
        });
    }

    deleteGalleryImage(id) {
        Swal.fire({
            title: 'Você tem certeza em deletar imagem?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF8C00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Não',
            preConfirm: () => {
                let { studioId } = this.state;
                let url = `/tattoo-artist-destroy-galleries/${id}`;
                api({
                    method: 'delete',
                    url,
                    data: {
                        studioId
                    }
                }).then((response) => {
                    Swal.fire(
                        'Deletado!',
                        'Imagem deletada com sucesso.',
                        'success'
                    );
                    this.editGalleryClose();
                    this.getGalleries(studioId);
                });
            },
        });
    }

    handleInputChangeDescricao = e => { //possibilita a edição do texto no input
        const lineHeight = 20;
        const previousRows = e.target.rows;
        e.target.rows = 1;
        const descricaoEstudioRows = ~~(e.target.scrollHeight / lineHeight);
        if (descricaoEstudioRows === previousRows) {
            e.target.rows = descricaoEstudioRows;
        }
        const descricaoEstudio = e.target.value;
        this.setState({ descricaoEstudio, descricaoEstudioRows });
    };

    handleInputBlurDescricao = () => {
        let { descricaoEstudio, studioId } = this.state;
        let url = '/studio-description';

        api({
            method: 'put',
            url,
            data: {
                description: descricaoEstudio,
                studioId
            }
        });
    }    

    submitAddMember = (e) => {
        e.preventDefault();
        let { addMember, studioId } = this.state;

        let url = `/studio-send-invitation`;

        api({
            method: 'post',
            url,
            data: {
                email: addMember,
                studioId
            }
        })
            .then((response) => {
                Swal.fire(
                    'Adicionado!',
                    'Tatuador adicionada com sucesso',
                    'success'
                );

                this.getMembers(studioId);               
                addMember = null;
                this.setState({ addMember });
            })
            .catch((response) => {
                console.log(response);
            });
    }

    submitRemoverMember = (memberId) => {
        let { studioId } = this.state;

        let url = `/studio-remove-member`;

        api({
            method: 'post',
            url,
            data: {
                memberId,
                studioId
            }
        })
            .then((response) => {
                Swal.fire(
                    'Removido!',
                    'Tatuador removido com sucesso',
                    'success'
                );

                this.getMembers(studioId);                
            })
            .catch((response) => {
                console.log(response);
            });
    }


    handleSubmit = async (e) => { //método responsável por interceptar o submit do form
        e.preventDefault(); //evita comportamentos padrões do submit
    };

    handleInputChange =  e => {
    };

    handleInputChangeDescEvent = e => { //possibilita a edição do texto no input
        const lineHeight = 20;
        const previousRows = e.target.rows;
        e.target.rows = 1;
        const currentRows = ~~(e.target.scrollHeight / lineHeight);
        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }
        this.setState({ 
            eventView : {
                nome : this.state.eventView.nome, local : this.state.eventView.local, hora : this.state.eventView.hora,
                preco : this.state.eventView.preco, content : this.state.eventView.content,
                descricao : e.target.value,
            },
            rowsEvent : currentRows
        })
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

    handleInputChangeMember= e => { //possibilita a edição do texto no input
        this.setState({ 
            addMember : e.target.value
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
            preco : 0, content : null, descricao : ''}
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
    
    getAvatar() {
        const { user } = this.state;
        return (!!user.avatarUrl ? user.avatarUrl : avatarDefault);
    }

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
                                <Profile.Image className="card-profile-img" avatarURL={this.getAvatar()}/>
                            </Clickable>
                            <h2>{this.state.studio.name}
                                <Rate className="ml-2" defaultValue={this.state.studio.score} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                            </h2>
                            
                                  <Form.Textarea rows={this.state.descricaoEstudioRows} id='desc'
                                      className='mod-card-back-title'
                                      onChange={this.handleInputChangeDescricao}
                                      onBlur={this.handleInputBlurDescricao}
                                      value={this.state.descricaoEstudio}
                                      placeholder="Deixe uma descrição sobre você aqui"
                                      maxLength="65"
                                />

                            <div className="Simple">
                                <DraggableArea tags={this.state.initialTags} render={({ tag, id }) => (
                                <div className="tag ">
                                    {tag.name}
                                    &nbsp;&nbsp;
                                    <img
                                        className="delete"
                                        src={delTag}
                                        onClick={() => this.handleClickDelete(tag)}/>
                                </div>)} onChange={tags => console.log(tags)} />
                            </div>
                            <div className="inputs">
                                <input ref={r => this.input = r} className="rounded-left" />
                                <button className="rounded-right" onClick={this.handleClickAdd}>Add tag</button>
                            </div>
                            {this.state.socialMedias.map(socialMedia => {
                                return (<a aria-label={`Editar ${socialMedia.type.name}`} data-balloon-pos="up" onClick={() => { this.editSocialMedia(socialMedia); }}>
                                        <img className="social" src={socialMedia.type.icon} />
                                </a>);
                            })}
                            <a aria-label="Adicionar rede social" className="btn btn-primary mt-3" data-balloon-pos="down" onClick={() => { this.addSocialMedia(); }}>
                                <i className="fa fa-plus" style={{ color: '#FFF' }}></i>
                            </a>    
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
                                <form onSubmit={this.submitAddMember}>
                                    <input value={this.state.addMember} onChange={this.handleInputChangeMember} placeholder=' E-mail do novo membro' required></input>
                                    <button type="submit" class="dropdown-item">Convidar</button>
                                </form>
                            </div>
                        </div>
                        </Card.Header>
                        <List>
                            {this.state.members.map(member => (
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={member.avatarUrl}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <h3>{member.name}
                                            <Rate className="ml-2" defaultValue={ member.score } style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true"/>
                                            </h3>
                                        </Media.Heading>
                                        <small>{member.description}</small>
                                    </Media.Body>
                                    <button aria-label="Excluir membro" data-balloon-pos="up" className="btn ml-auto" onClick={() => {
                                        this.setState({ memberDelete: member})
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
                        {this.state.events.map(event => (
                            <List.GroupItem>
                                <Media>
                                    <Avatar size="md" imageURL={event.bannerUrl}></Avatar>
                                    <Media.Body className="ml-3">
                                        <Media.Heading>
                                            <a onClick={() => {
                                                $('#viewEvent').modal('show');
                                                const lines = document.getElementById('descEvent').scrollHeight / 20;
                                                this.setState({
                                                    eventView : event,
                                                    rowsEvent : lines
                                                })
                                            }}><h4 className='to-link'>{event.title}</h4></a>
                                        </Media.Heading>
                                        <small>
                                            <p><img src={loc}/>&nbsp;&nbsp;{event.description}
                                                <br /><img src={clo} />&nbsp;&nbsp;{moment.utc(event.dateHour).format('LLL') }
                                            {/* <br/><img src={mone}/>&nbsp;&nbsp;<font color="green">{event.title !== 0.0 ? 'R$ '+ this.mascaraValor(event.preco.toFixed(2)) : 'Grátis' }</font> */}
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
                                      this.addCertification();
                                  }}><img src={plus}></img></button></Card.Header>
                              <Avatar.List className="p-3">
                                  {this.state.certifications.map(certification => (
                                      <Avatar aria-label={certification.name} data-balloon-pos="up" onClick={() => {
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
                                                  <Rate defaultValue={feedback.score} style={{ fontSize: 20 }} allowHalf allowClear={false} disabled="true" />
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
                                                      <h4>{this.state.studio.name}</h4>
                                                  </Media.Heading>
                                                  <small>{post.content.split('\n').map(function (item) {
                                                      return (
                                                          <span>
                                                              {item}
                                                              <br />
                                                          </span>
                                                      )
                                                  })}</small>
                                              </Media.Body>
                                              <button className='btn' onClick={() => {
                                                  this.deletePost(post.id);
                                              }}><img src={trash} /></button>
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
                                  }}><img src={plus} /></button>
                              </Card.Header>
                              <div className="gallery">
                                  {this.state.galleries.map(image => (
                                      <div class="mb-3 pics animation all 2">
                                          <Clickable onClick={() => {
                                              this.editGallery(image);
                                          }}>
                                              <img className="rounded img-fluid" src={image.file.url} />
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
                                          <button type="submit" className="btn btn-primary" style={{ float: 'left' }}>Salvar</button>
                                          <button className="btn btn-danger" style={{ float: 'right' }} onClick={() => {
                                              this.deleteCertification(this.state.modalEditCertification.id);
                                          }}>Deletar</button>
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
                                                      }} name="link" className="form-control" placeholder="Link rede social" required />
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
                                          <button type="submit" className="btn btn-primary" style={{ float: 'left' }}>Salvar</button>
                                          <button className="btn btn-danger" style={{ float: 'right' }} onClick={() => {
                                              this.deleteSocialMedia(this.state.modalEditSocialMedia.id);
                                          }}>Deletar</button>
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
                                              }} name="link" className="form-control" placeholder="Link rede social" required />
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
                    <p><font color='red'>Obs: {this.state.memberDelete.name} será notificado e só poderá fazer parte da equipe novamente com um novo convite.</font></p>
                  </div>
                  <div class="modal-footer">
                      <button className='agendar' onClick={() => {
                        this.submitRemoverMember(this.state.memberDelete.id)
                          $('#deleteMember').modal('hide');
                      }}>Sim</button>
                      <button className='agendar' onClick={() => {
                          $('#deleteMember').modal('hide');
                      }}>Não</button>
                  </div>
                </div>
              </div>
              </div>

              {/* <div class="modal fade" id="viewEvent" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
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
                            <Form.Textarea rows={this.state.rowsEvent} id='descEvent'
                            className='mod-card-back-title'
                            onChange={this.handleInputChangeDescEvent}
                            value={this.state.eventView.descricao}
                            placeholder="Descreva o evento a ser realizado"
                            />
                  </div>
                  <div class="modal-footer">
                        <button className='cancel-event' onClick={() => {
                            $('#cancelEvent').modal('show');
                        }}>Cancelar evento</button>
                  </div>
                </div>
              </div>
              </div> */}

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
