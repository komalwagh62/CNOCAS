import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iUser } from '../iUser';
import { User } from '../user';
import { Airport } from '../airport';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isAuthenticated: boolean = false;
  
  public baseUrl: string = 'http://localhost:3001/api';
  public loginUserId : string = "";
  public userData!: User;
  public token : string  = "";
  public airportData!:Airport;
  
  

  constructor(public http: HttpClient) {
    // this.baseUrl = 'http://localhost:3001/api';
  }
  
}
