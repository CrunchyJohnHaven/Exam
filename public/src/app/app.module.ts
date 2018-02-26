import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//router
import { AppRoutingModule } from './app-routing.module';
//component
import { AppComponent } from './app.component';
//sub-components
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
//service
import {HttpService} from './http.service';
//routing 
import { HttpClientModule } from '@angular/common/http';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    HomeComponent,
    NewComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
