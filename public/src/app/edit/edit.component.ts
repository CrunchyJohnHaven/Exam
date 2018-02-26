import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
titleEdit = "Edit this pet"
pet: any;
params: any;
lim = {};
errors = {};

  constructor(private _httpService: HttpService, private route: ActivatedRoute, private _router: Router) {
    this.route.params.subscribe( params => this.params = params);
   }


  ngOnInit() {
    this.pet = "";
    this.getPet();
    this.constraints();
  }
  getPet(){
    
    let observable = this._httpService.getPet(this.params.id);
    observable.subscribe(data => {
      this.pet = data;
      this.pet = this.pet.data
      if ("skill1" in this.pet.skills[0]) {
        this.pet.skill1 = this.pet.skills[0]['skill1']
      }
      if ("skill2" in this.pet.skills[0]) {
        this.pet.skill2 = this.pet.skills[0]['skill2']
      }
      if ("skill3" in this.pet.skills[0]) {
        this.pet.skill3 = this.pet.skills[0]['skill3']
      }
      console.log('**** EDIT - getPet():', this.pet)
    })
  };
  updatePet() {
    console.log('***** updatePet() ******', this.pet);
    
    let observable = this._httpService.updatePet(this.params.id, this.pet);
    observable.subscribe(data => {
      if("error" in data){ this.errorsRend(data) }
      else
      this.home();
    });
  };
  delete() {
    console.log('****** EDIT - delete() ****: ', this.params.id);
    let observable = this._httpService.deletePet(this.params.id);
    observable.subscribe(data => {
      if("error" in data){ this.errorsRend(data) }
      else
      this.home();
    });
  };
  home() {
    console.log('***** EDIT - home() ******');
    this._router.navigate(["/"]);
  }
  constraints(){
    let observable = this._httpService.constraints()
    observable.subscribe( data => {
      this.lim = data
    })
  }
  errorsRend(data){ 
    this.errors = this._httpService.renderErrors(data);
    console.log('THIS.ERRORS: ', this.errors);
  }
}

