import React, { useState, Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBYNeQZyttCVHKAI4WkvL7NlkniJmo7T6Q')
})(class Mapa extends Component {

    constructor (props){
        super(props)
        this.state = {
          initialPlaces: [
            {id: 1, lat:-15.829140, lng: -48.050059}, {id: 2, lat:-15.831241, lng: -48.054097}, {id: 3, lat:-15.833658, lng: -48.053154},
            {id: 4,  lat:-15.834852, lng: -48.051838}, {id: 5, lat:-15.833068, lng: -48.046275}, {id: 6, lat:-15.832104, lng: -48.056953},
            {id: 7, lat:-15.827529, lng: -48.052586}, {id: 8, lat:-15.831183,  lng: -48.058239}, {id: 9, lat:-15.828938, lng: -48.039934}, 
            {id: 10, lat:-15.836881, lng: -48.057940}],
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
        if (navigator.geolocation) {
            var startPos;
          var geoSuccess = (position) => {
            if (position.coords.latitude != null){
                startPos = position;
                localStorage.setItem('@user-loc', JSON.stringify({lat : startPos.coords.latitude, lng : startPos.coords.longitude}));
            }
          };
          navigator.permissions.query({name:'geolocation'}).then( status => {
            if (status.state == 'granted'){
              navigator.geolocation.getCurrentPosition(geoSuccess)
            }else{
              alert('Conceda permissão ao navegador a acessar sua localização para usar o serviço de busca.')
            }

          })
        //   const lat = this.state.loc.lat;
        //     const long = this.state.loc.long;
        //   await api.post('studios/search-geo', {
        //     headers: {
        //         'Authorization': 'Bearer ' + getToken(),
        //       },
        //     lat,
        //     long
        //   }).then(response => {
        //     this.setState({estudios : response.data})
        //   }).catch(error => {
        //       alert(error)
        //   })
      }
      else {
        console.log('Geolocation is not supported for this Browser/OS.');
      }
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
            <p>Teste</p> 
            <p>{this.state.selectedPlace.id}</p> 
            </InfoWindow>
        </Map>
    );
  }
})
