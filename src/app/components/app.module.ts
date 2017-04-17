import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app-component/app.component';
import { NavbarComponent } from './navbar-component/navbar.component';
import { InfoComponent } from './info-component/info.component';
import { GameComponent } from './game-component/game.component';
import { WikiComponent } from './wiki-component/wiki.component';

import { AppRoutingModule } from './app-routing.module';

//Server stuff
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    InfoComponent,
    GameComponent,
    WikiComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }