import React from 'react';
import './Map.css';

export default class MapComponent extends React.Component {

  constructor(props) {
    super(props);

    window.initMap = () => {
      const mapContainer = document.getElementsByClassName('MapContainer')[0];
      const google = window.google;
      this.map = new google.maps.Map(mapContainer, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });

      this.map.addListener('bounds_changed', () => {
        const newBounds = this.map.getBounds();
        this.props.updateBoundingBox(newBounds);
      });
    };

    this.loadGoogleMapsApi();
  }

  loadGoogleMapsApi() {
    if (!this.loadingMapsApi) {
      this.loadingMapsApi = new Promise(resolve => {
        const body = document.getElementsByTagName('body')[0];
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBZSQfCNSTbz0Rw4nbH31bIyvvgLUg0NPo&callback=initMap');
        scriptElement.onload = () => resolve();
        body.appendChild(scriptElement);
      });
    }

    return this.loadingMapsApi;
  }

  render() {
    return <div className="MapContainer"></div>;
  }

}