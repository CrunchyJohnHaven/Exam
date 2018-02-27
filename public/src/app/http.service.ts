console.log('********* HTTP **********');

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class HttpService {
  errors = {};

  constructor(private _http: HttpClient) { }
  getProducts(){
    console.log('*** SERVICE - getProducts() **** : ')
    return this._http.get('/products')
  };


  constraints(){
  console.log('*** SERVICE - CONSTRAINTS() ****')
  return this._http.get('constraints');
  }

  renderErrors(data){
    console.log('*** SERVICE - renderErrors() ****')
    var errors = {} 
    if ("name" in data.error.errors) {
      errors['name'] = data.error.errors.name.message;
    }
    if ("quantity" in data.error.errors) {
      errors['quantity'] = data.error.errors.quantity.message;
    }
    if ("price" in data.error.errors) {
      errors['price'] = data.error.errors.price.message;
    }
    console.log('ERRORS: ', errors);
    return errors
    }
    getProduct(id){
       console.log('SERVICE - getProduct(ID): ', id);
       return this._http.get('/product/' + id);
     }
    deleteProduct(id) {
      console.log('SERVICE - deleteProduct(ID): ', id)
      return this._http.delete('/product/' + id);
    }
    addProduct(product){
      console.log('****** addProduct() ********: ', product);
      return this._http.post('/product', product)
    }
    updateProduct(id, product) {
      console.log('SERVICE - updateProduct(ID): ', id, product);
      return this._http.put('/product/' + id, product);
    }
  }


