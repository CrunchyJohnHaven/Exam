console.log('********* HOME **********');
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Hometitle = "Product List";
  products: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.products = "";
    this.getProducts();
  } 
  getProducts() {
    console.log('HOME - getProducts() *****');
    let observable = this._httpService.getProducts();
    observable.subscribe(data=> {
      this.products = data;
      this.products = this.products.data
      console.log('this.pets:', this.products); 
    });
  } 
}






// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpService } from '../http.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   Hometitle = "These pets are looking for a HOME!";
//   pets: any;
//   message: any;

//   constructor(private _httpService: HttpService) { }

//   ngOnInit() {
//     this.pets = "";
//     this.message = "";
//     this.getPets();

//   }
//   getPets() {
//     let observable = this._httpService.getPets();
//     observable.subscribe(data=> {
//       this.pets = data;
      
//       this.message = this.pets.message
//       this.pets = this.pets.data

//       console.log('this.message:', this.message); 
//       console.log('this.pets:', this.pets); 

//     });
//   } 
// }
