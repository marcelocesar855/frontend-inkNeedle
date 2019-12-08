import React, { Component } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import {getUser} from '../services/auth'
import '../styles/General.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventCalendar from '../components/EventCalendar';
import avatarDefault from './../images/avatar.png';

export default class Agenda extends Component {

    state = {
        user : getUser()
    }
    
    getAvatar() {
        const { user } = this.state;
        if(user != null){
            return (!!user.avatar.url ? user.avatar.url : avatarDefault);
        }
    }

  render() {
      return(
            <div className="wrapper wrapper-logado">
               <Navbar avatar={this.getAvatar()}/>
                <div className="container">
                <div className="row">
                    <EventCalendar></EventCalendar>
                </div>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}
