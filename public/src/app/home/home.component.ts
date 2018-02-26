import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Hometitle = "These pets are looking for a home!";
  pets: any;
  message: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.pets = "";
    this.message = "";
    this.getPets();

  }
  getPets() {
    let observable = this._httpService.getPets();
    observable.subscribe(data=> {
      this.pets = data;
      
      this.message = this.pets.message
      this.pets = this.pets.data

      console.log('this.message:', this.message); 
      console.log('this.pets:', this.pets); 

    });
  } 
}
