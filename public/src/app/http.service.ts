import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class HttpService {
  errors = {};

  constructor(private _http: HttpClient) { }
  getPets(){return this._http.get('/pets')};

  constraints(){
  console.log('*** SERVICE - CONSTRAINTS ****')
  return this._http.get('constraints');
  }
  renderErrors(data){
    var errors = {} 
    if ("name" in data.error.errors) {
      errors['name'] = data.error.errors.name.message;
    }
    if ("description" in data.error.errors) {
      errors['description'] = data.error.errors.description.message;
    }
    if ("type" in data.error.errors) {
      errors['type'] = data.error.errors.type.message;
    }
    console.log('ERRORS: ', errors);
    return errors
    }
  addPet(pet){
    console.log('****** addPet() ********: ', pet);
    return this._http.post('/pets', pet)};

  getPet(id){
    console.log('SERVICE - getPet(ID): ', id);
    return this._http.get('/pets/' + id);
  }
  updatePet(id, pet) {
    console.log('SERVICE - updatePet(ID): ', id, pet);
    return this._http.put('/pets/' + id, pet);
  }
  deletePet(id) {
    console.log('SERVICE - deletePet(ID): ', id)
    return this._http.delete('/pets/' + id);
  }
  likePet(id, pet) {
    console.log('SERVICE - likePet(ID): ', id);
    return this._http.put('/pets/' + id + "/like", pet);
  }
}

