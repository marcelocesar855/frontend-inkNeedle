import React, { useState, Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Avatar} from "tabler-react";

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBYNeQZyttCVHKAI4WkvL7NlkniJmo7T6Q')
})(class Mapa extends Component {

    constructor (props){
        super(props)
        this.state = {
            selectedPlace : {
                id: 0, lat:0, lng: 0
            },
            selected : false,
            loc : {
              lat : 0,
              lng : 0
            }
        }
      };

      componentDidMount = async () => {
       
    }

      shouldComponentUpdate() {
        return false;  
      }

  render() {
      const estudios = this.props.initialPlaces;
    return (
        <Map google={this.props.google} zoom={14} initialCenter={{lat : JSON.parse(localStorage.getItem('@user-loc')).lat, lng : JSON.parse(localStorage.getItem('@user-loc')).lng}} >
           {estudios.map(studio =>(
            <Marker key={studio.id}
            position={{
                lat: studio.lat,
                lng: studio.lng
            }} onClick={() => {
                this.setState({selectedPlace: studio});
                this.setState({selected : true})
            }}>
            </Marker>
           ))}

            <InfoWindow visible={this.state.selectedPlace} position={{
                lat: this.state.selectedPlace.lat,
                lng: this.state.selectedPlace.lng
            }}>
            <Avatar size="md" imageURL={this.state.selectedPlace.imageURL}></Avatar>
            <a onClick={() => {
              this.props.history.push('/perfil_estudio')
              }}><h3>{this.state.selectedPlace.name}</h3> </a>
            <p>{this.state.selectedPlace.descricao}</p> 
            </InfoWindow>
        </Map>
    );
  }
})
