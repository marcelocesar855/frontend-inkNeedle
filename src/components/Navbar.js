import React, {Component} from 'react';
import '../styles/General.css';
import logo2 from '../images/logo2.png';
import { logout } from '../services/auth';

export default class Navbar extends Component {
    render () {
        return(
            <div>
            <nav class="navbar navbar-expand-lg p-0 pl-5">
                <a class="navbar-brand" href="#"><img src={logo2}></img></a>
                <div class="collapse navbar-collapse" id="conteudoNavbarSuportado">
                    <ul className='mr-auto'></ul>
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" >
                                Minha conta
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Ação</a>
                            <a class="dropdown-item" href="#">Outra ação</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="" onClick={() => {
                                logout()
                                this.props.history.push('/login')
                            }}>Sair</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="link" href="#">
                                Ajuda
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            </div>
        )
    }

}