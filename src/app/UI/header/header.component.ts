import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from '../../Server/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,public apiservice:ApiService) { }

  ngOnInit(): void {
  }


  logout() {
    console.log("de")
    this.router.navigate(['UserLogin']);
  }

  navigateToProfile(){
    this.router.navigate(['users-profile']);
  }

  
}
