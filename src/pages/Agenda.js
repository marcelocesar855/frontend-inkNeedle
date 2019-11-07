import React, { Component } from 'react';
import api from '../services/api';
import FullCalendar from '../components/EventCalendar';
import '../styles/General.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventCalendar from '../components/EventCalendar';

export default class Agenda extends Component {
    handleInputChange =  e => {

    };

  render() {
      return(
            <div className="wrapper wrapper-logado">
                <ul className="navbar navbar-fixed-top justify-content-end">
                    <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Minha Conta</a></li>
                    <li><a className="text-white" onClick={() => {this.props.history.push('/');}}>Ajuda</a></li>
                </ul>
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
