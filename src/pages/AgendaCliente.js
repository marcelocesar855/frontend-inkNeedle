import React, { Component } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import '../styles/General.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventCalendarCliente from '../components/EventCalendarCliente';

export default class AgendaCliente extends Component {

  render() {
      return(
            <div className="wrapper wrapper-logado">
               <Navbar/>
                <div className="container">
                <div className="row">
                    <EventCalendarCliente></EventCalendarCliente>
                </div>
                </div>
                <div className="footer-copyright text-center py-2 rodape">2019 - InkNeedle</div>
            </div>
      );
  }
}
