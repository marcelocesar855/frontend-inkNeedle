
import React, { Component } from 'react';
import {Avatar} from "tabler-react";
import { getUser } from '../services/auth';
import '../styles/Tabler.css'
import '../styles/General.css';
import Notifications from'./Notifications';
import logo2 from '../images/logo2.png';
import { logout } from '../services/auth';
import help from './../images/help.png';
import socket from "./../services/socket";

const io = socket();

export default class Navbar extends Component {

    constructor (props){
        super(props)
        this.state = {
            notifications: []
        }
    }

    componentDidMount() {
        io.on('initResponse', initResponse => {
            if (initResponse.userNotifications) {
                this.setInitialNotifications(initResponse.userNotifications);
            }
        });
    }

    setInitialNotifications(notifications) {
        this.setState({ notifications });       
    }

    render () {
        return(
            <div>
            <nav class="navbar navbar-expand-lg p-0 pl-5">
                <a class="navbar-brand " href="/login"><img src={logo2}></img></a>
                    <ul className='mr-auto'></ul>
                    <ul class="navbar-nav">
                        <li className='nav-item'>
                            <Notifications notifications={ this.state.notifications }></Notifications>
                        </li>
                        <li class="nav-item dropdown dropleft" aria-label="Minha conta" data-balloon-pos="down">
                            <a class="link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" >
                            <Avatar imageURL={this.props.avatar}></Avatar>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="/editar_perfil">Editar informações</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="" onClick={() => {
                                logout();
                                window.location.href = '/login';
                            }}>Sair</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown mr-5" aria-label="Ajuda" data-balloon-pos="down">
                            <a href="/#mu-faq">
                                <img src={help}></img>
                            </a>
                        </li>
                    </ul>
            </nav>
            </div>
        )
    }

}
