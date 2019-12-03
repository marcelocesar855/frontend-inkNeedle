import React, { Component } from 'react';
import {List, Media, Avatar} from "tabler-react";
import '../styles/Notifications.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';
import '../styles/General.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUser } from '../services/auth';
import avatarDefault from './../images/avatar.png';
import $ from 'jquery';

export default class Notifications extends Component {

  state = {
    user: getUser(),
    notifications : [{id : 1, nome : 'Marcelo César', content :'iis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', read : false},
        {id : 2, nome : 'Marcelo César', content : ' ut fermentum massa justo sit amet risus.', read : true},
        {id : 3, nome : 'Marcelo César', content : 'risque nisl consectetur et. Sed posuere consectetur est at lobortis.', read : true},
        {id : 4, nome : 'Marcelo César', content : 'am porta sem malesuada magna mollis euismod. Donec sed odio dui.', read : true}]
  }

  getAvatar() {
    const { user } = this.state;
    return (!!user.avatarUrl ? user.avatarUrl : avatarDefault);
  }

  getNotificationsNumber() {
    let count = 0;
    this.props.notifications.forEach(element => element.status === 1 && count++);    
    return count;
  }

componentDidMount () {
  this.props.notifications.map(notification => {
    if (notification.read == false) {
      $('#hasNew').css('display', 'inline');
    }
  })
}

  render() {
      return(
        <div class = "notification">
          <div class = "number" id='hasNew'> </div>
          <div class="number"> {this.getNotificationsNumber()} </div>
          <i class="fas fa-bell notBtn">
            <div class = "box">
              <div class = "display">
                <div class = "nothing"> 
                  <i class="fas fa-child stick"></i> 
                  <div class = "cent">Você está atualizado em tudo!</div>
                </div>
                <div class = "cont">
                  {this.props.notifications.map(notification => (
                    <div class={'sec', notification.status === 0 ? '': 'new'} >
                        <List.GroupItem className='sec-int'>
                        <Media>
                            <Avatar size="md" imageURL={this.getAvatar()}></Avatar>
                            <Media.Body className="ml-3">
                                <Media.Heading>
                              <h4>{notification.title}</h4>
                                </Media.Heading>
                            <small>{notification.message.split('\n').map(function(item) {
                                    return (
                                        <span>
                                        {item}
                                        <br/>
                                        </span>
                                    )
                                    })}</small>
                            </Media.Body>
                        </Media>
                    </List.GroupItem>                    
               </div>
                    ))}
                  </div>
              </div>
           </div>
           </i>
      </div>
      );
  }
}
