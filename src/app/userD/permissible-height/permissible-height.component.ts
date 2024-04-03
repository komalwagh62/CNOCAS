import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-permissible-height',
  templateUrl: './permissible-height.component.html',
  styleUrls: ['./permissible-height.component.scss']
})
export class PermissibleHeight implements OnInit {
  latitude: any;
  longitude: any;
  line: any;
  popupContent: any;
  lat!: any;
  long!: any;
  updatedDistance!: number;
  TopElevationForm!: FormGroup | any;
  marker: any;
  selectedAirportName: string = '';
  selectedAirport: any;
  @ViewChild('map') mapElement!: ElementRef;
  marker2: any;
  airports: any[] = [];
  map: any;
  icao: string = "";
  geojsonLayer: any = null;
  selectedAirportCity: string = '';

  showmap:boolean = false;

  constructor(private formbuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.TopElevationForm = this.formbuilder.group({
      Latitude: ['', [Validators.required]],
      Longitude: ['', [Validators.required]],
      ICAO: ['', [Validators.required]],
      Site_Elevation: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern(/^[0-5]+(?:\.[0-5]+)?$/)]),
    });

    this.TopElevationForm.get('ICAO').valueChanges.subscribe((icao: string) => {
      this.icao = icao; // Set the value of icao when ICAO changes
      const selectedAirport = this.airports.find(airport => airport.airport_icao === icao);
      this.selectedAirport = selectedAirport;
      this.selectedAirportName = selectedAirport ? selectedAirport.airport_name : '';
      this.selectedAirportCity = selectedAirport ? selectedAirport.airport_city : '';
      if (icao === 'VEJH') {
        console.log("icao is found");
        this.loadGeoJSON(this.map);
      } else {
        console.log("icao is not VEJH");
        if (this.geojsonLayer) {
          this.map.removeLayer(this.geojsonLayer);
        }
      }
    });

    this.getLocation();
    this.fetchAirports();
  }

  submitForm() {
    this.showmap = true;
    if (this.TopElevationForm.valid) {
      const airport_icao = this.TopElevationForm.get('ICAO')?.value;
      if (airport_icao) {
        const latitude = this.TopElevationForm.get('Latitude')?.value;
        const longitude = this.TopElevationForm.get('Longitude')?.value;
        this.loadGeoJSON(this.map);// Call showMap function with provided latitude and longitude
      } else {
        console.error("Please select an airport ICAO code.");
      }
    } else {
      console.error("Form is invalid");
    }
  }
  



  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.showMap(this.lat, this.long);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  calculateDistance(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number {
    const earthRadius = 6371;
    const latitudeDiff = this.degToRad(latitude2 - latitude1);
    const longitudeDiff = this.degToRad(longitude2 - longitude1);
    const a =
      Math.sin(latitudeDiff / 2) * Math.sin(latitudeDiff / 2) +
      Math.cos(this.degToRad(latitude1)) * Math.cos(this.degToRad(latitude2)) *
      Math.sin(longitudeDiff / 2) * Math.sin(longitudeDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  }

  degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  showMap(lat: number, lng: number) {
    this.map = L.map('map').setView([19.794444, 85.751111], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="https://www.cognitivenavigation.com/">Cognitive Navigation Pvt. Ltd </a>'
    }).addTo(this.map);
    L.control.scale().addTo(this.map);

    const newIcon = L.icon({
      iconUrl: 'assets/marker_map_icon.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });

    this.marker = L.marker([lat, lng]).addTo(this.map);
    this.marker2 = L.marker([19.794444, 85.751111]).addTo(this.map);
    this.line = L.polyline([[lat, lng], [19.794444, 85.751111]], { color: 'blue' }).addTo(this.map);
  }

  loadGeoJSON(map: any) {
    if (!map) {
      console.error("Map object is required to load GeoJSON.");
      return;
    }

    fetch('assets/Height.geojsonl.json')
      .then(response => response.json())
      .then(geojsonData => {
        this.geojsonLayer = L.geoJSON(geojsonData, {
          style: (feature) => {
            if (!feature || !feature.properties || !feature.properties.Name) return {};
            const height = feature.properties.Name;
            let color = '';

            switch (height) {
              case '05.23':
                color = 'yellow';
                break;
              case '49.7':
                color = 'red';
                break;
              case '64.7':
                color = 'green';
                break;
              case '74.7':
                color = 'blue';
                break;
              case '59.7':
                color = 'pink';
                break;
              case '24.7':
                color = 'orange';
                break;
              case 'NOC_Req':
                color = 'brown';
                break;
              case 'Polygon 775':
                color = 'black';
                break;
            }

            return {
              color: color,
              weight: 0.5
            };
          },
          onEachFeature: (feature, layer) => {
            layer.on('click', (e) => {
              const { lat, lng } = e.latlng;
              this.latitude = lat;
              this.longitude = lng;

              if (this.marker) this.map.removeLayer(this.marker);
              if (this.line) this.map.removeLayer(this.line);

              this.marker = L.marker([lat, lng]).addTo(this.map);
              this.line = L.polyline([[lat, lng], [19.794444, 85.751111]], { color: 'blue' }).addTo(this.map);
              this.updatePolyline(lat, lng);
              this.TopElevationForm.get('Latitude').setValue(lat);
              this.TopElevationForm.get('Longitude').setValue(lng);
              this.updatedDistance = this.calculateDistance(lat, lng, 19.794444, 85.751111);

              const mapData = document.getElementById('mapData');
              if (mapData !== null) {
                mapData.innerHTML = '';
                mapData.innerHTML = `
                  <div>
                    Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}<br>
                    Distance: ${this.updatedDistance.toFixed(2)} km
                  </div>`;
                mapData.style.display = 'block';
                mapData.style.bottom = '0';
                mapData.style.right = '0';
                mapData.style.backgroundColor = 'white';
                mapData.style.padding = '10px';
                mapData.style.borderRadius = '5px';
                mapData.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
                mapData.style.zIndex = '9999';
              }
            });
          }
        });
        this.geojsonLayer.addTo(map);
      });
  }

  updatePolyline(lat: number, lng: number) {
    if (this.line) {
      this.line.setLatLngs([[lat, lng], [19.794444, 85.751111]]);
    }
  }

  fetchAirports(): void {
    this.http.get<any>('http://localhost:3001/api/airports').subscribe(
      response => {
        this.airports = response.airports;
      },
      error => {
        console.error('Error fetching airports:', error);
      }
    );
  }
}
