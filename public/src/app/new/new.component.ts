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
  newTitle = "Know of a pet needing a home?";
  newPet: any;
  lim = {};
  errors = {};
  
  constructor(private _httpService: HttpService, private _router: Router) {this.newPet = {name: ''}}

  ngOnInit() {
    this.constraints();
  }
  constraints(){
    let observable = this._httpService.constraints()
    observable.subscribe( data => {
      this.lim = data
    })
  }
  submitPet() {
    console.log('***** submitPet() ******', this.newPet);
    let observable = this._httpService.addPet(this.newPet);
    observable.subscribe(data => {
      console.log('**** NEW - submitPet() - ERRORS', data);
      if("error" in data){ this.errorsRend(data) }
      else
      this.home();
    });
  };
  errorsRend(data){ 
    this.errors = this._httpService.renderErrors(data);
    console.log('THIS.ERRORS: ', this.errors);
  }
  home() {
    console.log('***** NEW - home() ******');
    this._router.navigate(["/"]);
      }
}
