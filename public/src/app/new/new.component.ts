console.log('****** NEW ********');
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newTitle = "New Product";
  newProduct: any;
  lim = {};
  errors = {};
  
  constructor(private _httpService: HttpService, private _router: Router) {this.newProduct = {name: ''}}

  ngOnInit() {
    this.constraints();
  }
  constraints(){
    console.log('*** NEW - Constraints() ****');
    let observable = this._httpService.constraints()
    observable.subscribe( data => {
      this.lim = data
    })
  }

  home() {
    console.log('***** NEW - home() ******');
    this._router.navigate(["/"]);
  } 
  reset(){
    console.log('***** EDIT - reset() ******');
    this.newProduct = {name: ''}
  }
  submitProduct() {
    console.log('***** submitProduct() ******', this.newProduct);
    let observable = this._httpService.addProduct(this.newProduct);
    observable.subscribe(data => {
      console.log('**** NEW - submitPet() - ERRORS', data);
      if("error" in data){ this.errorsRend(data) }
      else
      this.home();
    });
}
  errorsRend(data){ 
    this.errors = this._httpService.renderErrors(data);
    console.log('THIS.ERRORS: ', this.errors);
  }
}


