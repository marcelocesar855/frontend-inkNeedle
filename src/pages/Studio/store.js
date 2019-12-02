import React, { Component } from 'react';
import { toast } from 'react-toastify'
import api from '../../services/api';
import CurrencyFormat from 'react-currency-format';
import viaCep from '../../services/viaCep';
import 'react-toastify/dist/ReactToastify.css';
import 'balloon-css';
import $ from 'jquery';
import 'bootstrap';
import Navbar from '../../components/Navbar';
import { Card } from "tabler-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/PerfilTatuador.css';
import '../../styles/General.css';
import '../../styles/Tabler.css';
import '../../styles/Stars.css';
import '../../styles/Tags.css';

export default class store extends Component {

    constructor(props) {
        super(props);        
        this.featureRef = React.createRef();
        this.handleInputChangeFuncionamento = this.handleInputChangeFuncionamento.bind(this);
    }

    state = {
        name: '',
        cnpj: '',
        isBodyPiercing: false
    };

    handleStudioSubmit = async (e) => { //método responsável por interceptar o submit do form
        e.preventDefault(); //evita comportamentos padrões do submit
        const { name, cnpj, isBodyPiercing } = this.state;

        if (!!name && !!cnpj) {
            this.pushErrorMessage('Todos os campos (*) são obrigatórios');
        }

        api.post('/studios', {
            name,
            cnpj,
            isBodyPiercing 
        }).then((response) => {
            this.pushSuccessMessage('Estúdio cadastrado com sucesso.');
            this.handleSteps('address');
        }).catch((error) => {
            this.pushErrorMessage('Não foi possível Cadastrar Estúdio. Tente novamente mais tarde.');
        });
    };  

    handleInputText = (e) => {
        const { name, value } = e.target;        
        this.setState({
            [name]: value
        });        
    }  

    handleInputCheckbox = (e) => {
        const { name, checked } = e.target;       
        this.setState({
            [name]: checked
        });        
    } 
    
    handleSteps(step) {
        let $stepCadStudio = $('#step-cad-studio');
        let $stepCadAddress = $('#step-cad-address');

        switch (step) {
            case 'studio':
                $stepCadStudio.removeClass('hide').addClass('show');
                $stepCadAddress.removeClass('show').addClass('hide');
                break;
            case 'address':
                $stepCadAddress.removeClass('hide').addClass('show');
                $stepCadStudio.removeClass('show').addClass('hide');
                break;        
        }
    }

    handleInputChangeNome = e => { //possibilita a edição do texto no input
        this.setState({ nome: e.target.value });
    };

    handleInputChangeCep = e => { //possibilita a edição do texto no input
        this.setState({ cep: e.target.value });
    };

    handleInputChangeEndereco = e => { //possibilita a edição do texto no input
        this.setState({ endereco: e.target.value });
    };

    handleInputChangeBairro = e => { //possibilita a edição do texto no input
        this.setState({ bairro: e.target.value });
    };

    handleInputChangeUf = e => { //possibilita a edição do texto no input
        this.setState({ uf: e.target.value });
    };

    handleInputChangeCidade = e => { //possibilita a edição do texto no input
        this.setState({ cidade: e.target.value });
    };

    handleInputChangeFuncionamento(time) { //possibilita a edição do texto no input
        this.setState({ value: time });
    };

    handleInputChangeTelefone = e => { //possibilita a edição do texto no input
        this.setState({ telefone: e.target.value });
    };

    handleInputChangeBodyPiercing = e => { //possibilita a edição do texto no input
        this.setState({ bodyPiercing: e.target.value });
    };

    handleInputChangeComplemento = e => { //possibilita a edição do texto no input
        this.setState({ complemento: e.target.value });
    };

    handleInputChangeCertificado = e => { //possibilita a edição do texto no input
        this.setState({
            selectedFile: e.target.files[0],
            loaded: 0
        });       
        
    };
    
    getAdressFromViaCEP = async (e) => {
        e.preventDefault();
        toast.configure()
        const cepInitState = {
            cep: '',
            endereco: '',
            bairro: '',
            cidade: '',
            uf: ''
        }
        var cep = e.target.value;
        if (cep.length > 8) {
            cep = cep.replace('-', '');
            await viaCep.get(cep + '/json').then(
                response => {
                    if (response.data.erro !== true) {
                        this.setState({
                            endereco: response.data.logradouro,
                            bairro: response.data.bairro,
                            cidade: response.data.localidade,
                            uf: response.data.uf
                        })
                    } else {
                        this.pushErrorMessage('CEP inexistente.')
                        this.setState(cepInitState)
                    }
                }
            ).catch(error => {
                this.pushErrorMessage('Informe um CEP válido')
                this.setState(cepInitState)
            })
        } else {
            this.setState(cepInitState)
        }
    }

    pushErrorMessage(message) {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
        })
    }

    pushSuccessMessage(message) {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
        })
    }

    render() {
        this.pushErrorMessage('sdfsdf');
        return (
            <div className="wrapper wrapper-logado">
                <Navbar />
                <div className="container mt-5">
                    <div className="row ">                        
                        <div id="step-cad-studio" className="col col-md-12 show">
                            <Card>
                                <Card.Header>
                                    Cadastra Estúdio
                                </Card.Header>
                                <Card.Body>
                                    <form onSubmit={this.handleStudioSubmit}>
                                        <div className="form-group">
                                            <label>Nome*</label>
                                            <input type="text" onChange={this.handleInputText} name="name" className="form-control" placeholder="Nome do estúdio"/>
                                        </div>                                                                          
                                        <div className="form-group">
                                            <label>CNPJ*</label>
                                            <CurrencyFormat type="text" format="##.###.###/####-##" onBlur={this.handleInputText} name="cnpj" className="form-control" placeholder="CNPJ"></CurrencyFormat>
                                        </div>                                                                          
                                        <div className="form-group">
                                            <label>Realiza Body Piercing?</label>
                                            <input type="checkbox" onChange={this.handleInputCheckbox} name="isBodyPiercing" className="form-control"/>
                                        </div>     
                                        <small>Campos obrigatórios (*)</small> <br/> <br/>                                                                    
                                        <button type="submit" className="btn btn-primary">Cadastrar estúdio</button>
                                    </form>
                                </Card.Body>                                
                            </Card>                           
                        </div>
                        <div id="step-cad-address" className="col col-md-12 hide">
                            <Card>
                                <Card.Header>
                                    Cadastra Endereço do Estúdio
                                </Card.Header>
                                <Card.Body>
                                    <form onSubmit={this.handleStudioSubmit}>
                                        <div className="form-group">
                                            <label>Nome*</label>
                                            <input type="text" onChange={this.handleInputText} name="name" className="form-control" placeholder="Nome do estúdio"/>
                                        </div>                                                                          
                                        <div className="form-group">
                                            <label>CNPJ*</label>
                                            <CurrencyFormat type="text" format="##.###.###/####-##" onBlur={this.handleInputText} name="cnpj" className="form-control" placeholder="CNPJ"></CurrencyFormat>
                                        </div>                                                                          
                                        <div className="form-group">
                                            <label>Realiza Body Piercing?</label>
                                            <input type="checkbox" onChange={this.handleInputCheckbox} name="isBodyPiercing" className="form-control"/>
                                        </div>     
                                        <small>Campos obrigatórios (*)</small> <br/> <br/>                                                                    
                                        <button type="submit" className="btn btn-primary">Cadastrar estúdio</button>
                                    </form>
                                </Card.Body>                                
                            </Card>                           
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
                                            ></input>
                                    </p>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button className='agendar' >Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
        );
    }
}
