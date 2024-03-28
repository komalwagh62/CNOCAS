import { Component } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-header-side-nav',
  templateUrl: './header-side-nav.component.html',
  styleUrl: './header-side-nav.component.scss'
})
export class HeaderSideNavComponent {
  sidenavOpen = false;

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }
  map!: L.Map;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([51.5, -0.09]).addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }

}
