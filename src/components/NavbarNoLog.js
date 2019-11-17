import React, {Component} from 'react';
import '../styles/General.css';
import logo2 from '../images/logo2.png';
import { logout } from '../services/auth';

export default class NavbarNoLog extends Component {
    render () {
        return(
            <div>
            <nav class="navbar navbar-expand-lg p-0 pl-5">
                <a class="navbar-brand" href="#"><img src={logo2}></img></a>
                <div class="collapse navbar-collapse" id="conteudoNavbarSuportado">
                    <ul className='mr-auto'></ul>
                    <ul class="navbar-nav">
                        <li class="nav-item">
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