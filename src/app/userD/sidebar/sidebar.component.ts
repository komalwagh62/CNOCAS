import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Server/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
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
    
}
}