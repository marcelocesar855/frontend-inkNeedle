import React, {Component} from 'react';
import '../styles/General.css';
import logo2 from '../images/logo2.png';
import help from './../images/help.png';
import { logout } from '../services/auth';

export default class NavbarNoLog extends Component {
    render () {
        return(
            <div>
            <nav class="navbar navbar-expand-lg p-0 pl-5">
                <a class="navbar-brand" href="/login"><img src={logo2}></img></a>
                <div class="collapse navbar-collapse" id="conteudoNavbarSuportado">
                    <ul className='mr-auto'></ul>
                    <ul class="navbar-nav mr-5" aria-label="Ajuda" data-balloon-pos="down">
                        <li class="nav-item">
                            <a class="link" href="/#mu-faq">
                            <img src={help}></img>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            </div>
        )
    }
}
