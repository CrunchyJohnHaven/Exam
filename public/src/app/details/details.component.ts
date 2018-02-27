console.log('********* DETAILS **********');
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product: any;
  params: any;
  constructor(private _httpService: HttpService, private route: ActivatedRoute, private _router: Router) {
    this.route.params.subscribe( params => this.params = params);
  }

  ngOnInit() {
    this.product = "";
    this.getProduct();
  }
  getProduct(){
    let observable = this._httpService.getProduct(this.params.id);
    observable.subscribe(data => {
      this.product = data
      this.product = this.product.data
      console.log('***** DETAILS - getProduct(): ', this.product);
    })
  }
  home() {
    console.log('***** DETAILS - home() ******');
    this._router.navigate(["/"]);
  }
  delete() {
    console.log('****** EDIT - delete() ****: ', this.params.id);
    let observable = this._httpService.deleteProduct(this.params.id);
    observable.subscribe(data => {
      if(data["error"]){
        console.log("EDIT - ERROR at submitPet: ", data);
      }
      else
      this.home();
  });
};
}




// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpService } from '../http.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-details',
//   templateUrl: './details.component.html',
//   styleUrls: ['./details.component.css']
// })
// export class DetailsComponent implements OnInit {
// pet: any
// params: any;
//   constructor(private _httpService: HttpService, private route: ActivatedRoute, private _router: Router) {
//     this.route.params.subscribe( params => this.params = params);
//    }


//   ngOnInit() {
//     this.pet = "";
//     this.getPet()

//   }
//   getPet(){
//     let observable = this._httpService.getPet(this.params.id);
//     observable.subscribe(data => {
//       this.pet = data;
//       this.pet = this.pet.data
//       if ("skill1" in this.pet.skills[0]) {
//         this.pet.skill1 = this.pet.skills[0]['skill1']
//       }
//       if ("skill2" in this.pet.skills[0]) {
//         this.pet.skill2 = this.pet.skills[0]['skill2']
//       }
//       if ("skill3" in this.pet.skills[0]) {
//         this.pet.skill3 = this.pet.skills[0]['skill3']
//       }
//       // for (var i = 0; i < )
//       console.log('***** DETAILS - getPet(): ', this.pet);
//     });
//   };
//   home() {
//     console.log('***** EDIT - home() ******');
//     this._router.navigate(["/"]);
//   }
//   details(pet) {
//     console.log('***** EDIT - details(ID) ******: ', pet);
//     this._router.navigate(["/details/:id, pet._id]");
//   }
//   delete() {
//     console.log('****** EDIT - delete() ****: ', this.params.id);
//     let observable = this._httpService.deletePet(this.params.id);
//     observable.subscribe(data => {
//       if(data["error"]){
//         console.log("EDIT - ERROR at submitPet: ", data);
//       }
//       else
//       this.home();
//   });
// };
// likePet() {
//   console.log('***** likePet() ******', this.pet);
//   let observable = this._httpService.likePet(this.pet._id, this.pet);
//   observable.subscribe(data => {
//     if(data["error"]){
//       console.log("EDIT - ERROR at updatePet: ", data);
//     }
//     else
//     this.getPet();
//     });
//   };
// }
