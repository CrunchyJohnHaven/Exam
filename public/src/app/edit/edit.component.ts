console.log('********* EDIT **********');
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
titleEdit = "Update Product"
params: any;
lim = {};
errors = {};
product: any;

  constructor(private _httpService: HttpService, private route: ActivatedRoute, private _router: Router) {
    this.route.params.subscribe( params => this.params = params);
    this._router.routeReuseStrategy.shouldReuseRoute = function(){
      return true;
   }
   }


  ngOnInit() {
    this.product = "";
    this.constraints();
    this.getProduct();
  }

  constraints(){
    console.log('*** EDIT - Constraints() ****');
    let observable = this._httpService.constraints()
    observable.subscribe( data => {
      this.lim = data
    })
  }
  errorsRend(data){ 
    console.log('*** EDIT - errorsRend(DATA):', data);
    this.errors = this._httpService.renderErrors(data);
    console.log('THIS.ERRORS: ', this.errors);
  }
  home() {
    console.log('***** EDIT - home() ******');
    this._router.navigate(["/"]);
  }
  reset(){
    console.log('***** EDIT - reset() ******');
    this.getProduct();
  }
  updateProduct() {
    console.log('***** updateProduct() ******', this.product);
    let observable = this._httpService.updateProduct(this.params.id, this.product);
    observable.subscribe(data => {
      if("error" in data){ this.errorsRend(data) }
      else
      this.home();
    });
  };
  getProduct(){
    let observable = this._httpService.getProduct(this.params.id);
    observable.subscribe(data => {
      this.product = data;
      this.product = this.product.data
      console.log('**** EDIT - getProduct():', this.product)
    })
  };
}

