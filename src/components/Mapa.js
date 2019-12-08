import React, { useState, Component } from 'react';
import api from '../services/api';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Avatar} from "tabler-react";
import $ from 'jquery';

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBYNeQZyttCVHKAI4WkvL7NlkniJmo7T6Q')
})(class Mapa extends Component {

    constructor (props){
        super(props)
        this.state = {
            selectedPlace : {
                id: 0, lat:0, lng: 0,addresses : [{latitude : '0', longitude : '0'}]
            },
            selected : false
        }
      };

      componentWillMount () {
        this.setState({selected : false})
      }

      openStudio(studio, selected) {
        if(studio.id != 0 && selected){
          window.location.href = `perfil_estudio/${studio.id}`;
        }
      }

  render() {
    var vis = false;
    return (
        <Map google={this.props.google} zoom={14} initialCenter={{lat : JSON.parse(localStorage.getItem('@user-loc')).lat, lng : JSON.parse(localStorage.getItem('@user-loc')).lng}} >
           {this.props.places.map(
             studio =>(
            <Marker key={studio.id}
            position={{
                lat: studio.addresses[0].latitude,
                lng: studio.addresses[0].longitude
            }} onClick={() => {
              this.setState({selected : true,
                selectedPlace : studio})
            }}>
            </Marker>
           ))}

            <InfoWindow visible={this.state.selected} position={{
                lat: this.state.selectedPlace.addresses[0].latitude,
                lng: this.state.selectedPlace.addresses[0].longitude
            }}  onClick={this.openStudio(this.state.selectedPlace, this.state.selected)} >
            <Avatar size="md" imageURL={this.state.selectedPlace.avatarUrl}></Avatar>
            <h3 className='to-link'>{this.state.selectedPlace.name}</h3>
            <p>{this.state.selectedPlace.description}</p> 
            </InfoWindow>
        </Map>
    );
  }
})
