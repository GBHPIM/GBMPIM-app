import { Component, OnInit } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private lat: number;
  private lng: number;
  private map: any;
  private addressStart = '';
  private addressEnd = '';
  private currentLatlng;

  constructor() { }
  ngOnInit() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.currentLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      let mapProp = {
        center: this.currentLatlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    })
  }

  mapRoute(start = 'chicago, il', fin = 'st louis, mo') {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);

    directionsService.route({
      origin: start,
      destination: fin,
      travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  getAddressOnChangeOrigin(place, l) {
    console.log(place);
    this.addressStart = place.address_components.map((x) => x.short_name).join(' ');
    if (this.addressEnd !== '') {
      this.mapRoute(this.addressStart, this.addressEnd);
    } 
  }

  
  getAddressOnChangeDestination(place, l) {
    console.log(place);
    this.addressEnd = place.address_components.map((x) => x.short_name).join(' ');
    if (this.addressStart !== '') {
      this.mapRoute(this.addressStart, this.addressEnd);
    } else {
      this.mapRoute(this.currentLatlng, this.addressEnd);
    }
  }
}
