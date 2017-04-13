import { Component } from '@angular/core';
import { NavbarComponent } from './../navbar-component/navbar.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css']
})

export class AppComponent  { 
  public banner = './app/images/CyllianLegendsBanner.png';
}
