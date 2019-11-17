import React, { Component } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import '../styles/General.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventCalendar from '../components/EventCalendar';

export default class Agenda extends Component {
    handleInputChange =  e => {

    };

  render() {
      return(
            <div className="wrapper wrapper-logado">
               <Navbar/>
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
