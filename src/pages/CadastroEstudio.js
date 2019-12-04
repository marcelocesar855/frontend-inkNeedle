import React, {Component} from 'react';
import api from '../services/api';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import viaCep from '../services/viaCep';
import '../styles/CadastroEstudio.css';
import '../styles/General.css';
import CurrencyFormat from 'react-currency-format';
import TimeRange from '../components/TimeSlider';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CadastroEstudio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome : '',
            cnpj : '',
            value : {
                start : '00:00',
                end : '23:59'
            },
            telefone : '',
            bodyPiercing : false,
            cep : '',
            endereco : '',
            bairro : '',
            uf: '',
            cidade: '',
            complemento: '',
            selectedFile : null
        };
        this.featureRef = React.createRef();
        this.handleInputChangeFuncionamento = this.handleInputChangeFuncionamento.bind(this);
    }

    handleInputChangeNome = e => { //possibilita a edição do texto no input
        this.setState({nome : e.target.value});
    };

    handleInputChangeCep = e => { //possibilita a edição do texto no input
        this.setState({cep : e.target.value});
    };

    handleInputChangeEndereco = e => { //possibilita a edição do texto no input
        this.setState({endereco : e.target.value});
    };

    handleInputChangeBairro = e => { //possibilita a edição do texto no input
        this.setState({bairro : e.target.value});
    };

    handleInputChangeUf = e => { //possibilita a edição do texto no input
        this.setState({uf : e.target.value});
    };

    handleInputChangeCidade = e => { //possibilita a edição do texto no input
        this.setState({cidade : e.target.value});
    };

    handleInputChangeFuncionamento(time) { //possibilita a edição do texto no input
        this.setState({value : time});
    };

    handleInputChangeTelefone = e => { //possibilita a edição do texto no input
        this.setState({telefone : e.target.value});
    };

    handleInputChangeBodyPiercing = e => { //possibilita a edição do texto no input
        this.setState({bodyPiercing : e.target.value});
    };

    handleInputChangeCnpj = e => { //possibilita a edição do texto no input
        this.setState({ cnpj : e.target.value});
    };

    handleInputChangeComplemento = e => { //possibilita a edição do texto no input
        this.setState({complemento : e.target.value});
    };

    handleInputChangeCertificado = e => { //possibilita a edição do texto no input
        this.setState({
            selectedFile : e.target.files[0],
            loaded : 0
        })
    };

    getAdressFromViaCEP = async (e) => {
        e.preventDefault();
        toast.configure()
        const cepInitState = {
            cep :  '',
            endereco : '',
            bairro : '',
            cidade : '',
            uf : ''
        }
        var cep = e.target.value;
        if (cep.length > 8){
            cep = cep.replace('-', '');
            await viaCep.get(cep + '/json').then(
                response => {
                    if(response.data.erro !== true){
                        this.setState({
                            endereco : response.data.logradouro,
                            bairro : response.data.bairro,
                            cidade : response.data.localidade,
                            uf : response.data.uf
                        })
                    }else{
                        this.pushErrorMessage('CEP inexistente.')
                        this.setState(cepInitState)
                    }
                }
            ).catch( error => {
                this.pushErrorMessage('Informe um CEP válido')
                this.setState(cepInitState)
            })
        }else {
            this.setState(cepInitState)
        }
    }

    pushErrorMessage (error) {
        toast.error(error,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
        })
    }

    handleSubmit = async (e) => {
        toast.configure() //envia as informações a serem salvar para o backend
        e.preventDefault();
        var erro = '';
        const nome = this.state.nome;
        const cnpj = this.state.cnpj;
        const local = {
            cep : this.state.cep,
            cidade : this.state.cidade,
            endereco : this.state.endereco,
            uf : this.state.uf,
            bairro : this.state.bairro,
            complemento : this.state.complemento
        }
        const {value} = this.state.value;
        const telefone = this.state.telefone;
        const bodyPiercing = this.state.bodyPiercing;
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        if(nome !== ''){
            if(local.endereco !== ''){
                if(local.uf !== ''){
                    if(local.cidade !== ''){
                        if(local.cep !== ''){
                            if(value !== null){
                                if(data !== null){
                                   
                                    await api.post('/studios', {
                                        name: nome,
                                        cnpj: cnpj,
                                        isBodyPiercing: true
                                    }).then(async (response) => {
                                        await this.saveAddress({
                                            name: local.endereco,
                                            neighborhood: local.bairro,
                                            city: local.cidade,
                                            state: local.uf,
                                            cep: local.cep,
                                            complement: local.complemento,
                                            latitude: local,
                                            longitude: local,
                                        }, response.data.id);

                                        toast.success("Estúdio cadastrado com sucesso!", {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true
                                        });

                                        this.toPerfilTatuador();
                                    }).catch((error) => {
                                        toast.success("Não foi possível Cadastrar Estúdio. Tente novamente mais tarde!", {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true
                                        });
                                    });
                                
                                }else{
                                    erro = "Envie uma cópia do seu certificado da Anvisa de Biosegurança para validarmos o estúdio!";
                                    this.pushErrorMessage(erro)
                                }
                            }else{
                                erro = "Informe o horário de funcionamento do estúdio.";
                                this.pushErrorMessage(erro)
                            }
                        }else{
                            erro = "Informe um CEP válido.";
                            this.pushErrorMessage(erro)
                        }
                    }else {
                        erro = 'Informe a cidade onde fica o estúdio';
                        this.pushErrorMessage(erro)
                    }
                }else{
                    erro = "Informe um estado.";
                    this.pushErrorMessage(erro)
                }
            }else{
                erro = "Informe o endereço do estúdio.";
                this.pushErrorMessage(erro)
            }
        }else{
            erro = "Informe o nome do estúdio.";
            this.pushErrorMessage(erro)
        }
    };

    async saveAddress(address, studioId) {
        const data = {
            name: address.name,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            cep: address.cep,
            complement: address.complement, 
            latitude: '0',
            longitude: '0'
        }

        const url = `studios/${studioId}/addresses`;

        await api.post(url, data).then((response) => {
            console.log(response);
        });
    }

    toPerfilTatuador = () => {
        this.props.history.push('/perfil_tatuador')
    }

    render() { //renderiza html
        return (
            <div className="wrapper">
               <Navbar/>
                <div className="wrapper-form">
                    <div className="titulo">
                        <h1>Informe os dados abaixo para o cadastrar o seu estúdio na <strong>InkNeedle!</strong></h1>
                    </div>
                    <form className="formulario">
                        <p>Nome:&nbsp;<input value={this.state.nome}
                        onChange={this.handleInputChangeNome} placeholder="Nome do estúdio"></input></p>
                        <p>CNPJ:&nbsp;<CurrencyFormat type="text" format="##.###.###/####-##" onChange={this.handleInputChangeCnpj} placeholder="CNPJ"></CurrencyFormat></p>
                        <div className="funcionamento">
                            <p>Funcionamento:&nbsp;De&nbsp;{this.state.value.start}&nbsp;às&nbsp;{this.state.value.end}</p>
                            <TimeRange format={24} value={this.state.value} maxValue={"23:59"} minValue={"00:00"}
                            onChange={this.handleInputChangeFuncionamento} step={15} name={"time_range"}></TimeRange>
                        </div>
                        <p>Telefone:&nbsp;<CurrencyFormat type="text" value={this.state.telefone}
                        onChange={this.handleInputChangeTelefone} format="(##) # ####-####" placeholder="Telefone do estúdio"></CurrencyFormat></p>
                        <p>Body Piercing:&nbsp;<select value={this.state.bodyPiercing} onChange={this.handleInputChangeBodyPiercing}>
                            <option value="false" disabled>Realiza Body Piercing?</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select></p>
                        <p>CEP:&nbsp;<CurrencyFormat type="text" value={this.state.cep} onChange={this.getAdressFromViaCEP}
                        onChange={this.handleInputChangeCep} format="#####-###" placeholder="CEP do estúdio"></CurrencyFormat></p>
                        <p>Endereço:&nbsp;<input type="text" value={this.state.endereco}
                        onChange={this.handleInputChangeEndereco} placeholder="Endereço"></input></p>
                        <p>Bairro:&nbsp;<input type="text" value={this.state.bairro}
                        onChange={this.handleInputChangeBairro} placeholder="Bairro"></input></p>
                        <p>Cidade:&nbsp;<input type="text" value={this.state.cidade}
                        onChange={this.handleInputChangeCidade} placeholder="Cidade"></input></p>
                        <p>UF:&nbsp;<input type="text" value={this.state.uf}
                        onChange={this.handleInputChangeUf} placeholder="UF (Estado)"></input></p>
                        <p>Complemento:&nbsp;<input type="text" value={this.state.complemento}
                        onChange={this.handleInputChangeComplemento} placeholder="Complemento"></input></p>
                        <div className="justify-content-center">
                            <div className="form-group files">
                                <div className="funcionamento">
                                    <p>Certificado Anvisa:</p>
                                </div>
                                <input type="file" multiple=""
                                onChange={this.handleInputChangeCertificado}></input>
                            </div>
	                    </div>
                        <button onClick={this.handleSubmit}>Cadastrar estúdio</button>
                    </form>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
        );
    }
}