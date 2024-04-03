import { Component } from '@angular/core';
import { ApiService } from '../../Server/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 
  constructor(public apiservice:ApiService){

  }
}
