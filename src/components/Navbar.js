import React, {Component} from 'react';
import {Avatar, Notification} from "tabler-react";
import { getUser } from '../services/auth';
import '../styles/Tabler.css'
import '../styles/General.css';
import Notifications from'./Notifications';
import logo2 from '../images/logo2.png';
import { logout } from '../services/auth';
import avatarDefault from './../images/avatar.png';
import help from './../images/help.png';
import { StreamApp, NotificationDropdown, FlatFeed } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

export default class Navbar extends Component {

    constructor (props){
        super(props)
        this.state = {
            user : getUser()
        }
      }

      getAvatar() {
        const { user } = this.state;
        return (!!user.avatarUrl ? user.avatarUrl : avatarDefault);
    }

    render () {
        return(
            <div>
            <nav class="navbar navbar-expand-lg p-0 pl-5">
                <a class="navbar-brand" href="#"><img src={logo2}></img></a>
                <div class="collapse navbar-collapse" id="conteudoNavbarSuportado">
                    <ul className='mr-auto'></ul>
                    <ul class="navbar-nav">
                        <li className='nav-item'>
                            <Notifications></Notifications>
                        </li>
                        <li class="nav-item dropdown dropleft" aria-label="Minha conta" data-balloon-pos="down">
                            <a class="link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" >
                            <Avatar imageURL={this.getAvatar()}></Avatar>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Configurações</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="" onClick={() => {
                                logout()
                                this.props.history.push('/login')
                            }}>Sair</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown mr-5" aria-label="Ajuda" data-balloon-pos="down">
                            <a href="#">
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
