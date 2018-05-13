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

  constructor() { }
  ngOnInit() {
    navigator.geolocation.getCurrentPosition(pos => {
      let mapProp = {
        center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    })
  }

  mapRoute() {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);

    directionsService.route({
      origin: 'chicago, il',
      destination: 'st louis, mo',
      travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}
