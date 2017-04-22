import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app-component/app.component';
import { NavbarComponent } from './navbar-component/navbar.component';
import { InfoComponent } from './info-component/info.component';
import { GameComponent } from './game-component/game.component';
import { GameNav } from './game-component/game-nav/game-nav.component';
import { WikiComponent } from './wiki-component/wiki.component';

import { GameMapCreatorComponent } from './game-component/game-creator/game-map-creator.component';
import { GameCharacterCreatorComponent } from './game-component/game-creator/game-character-creator.component';
import { GameItemCreatorComponent } from './game-component/game-creator/game-item-creator.component';

import { AppRoutingModule } from './app-routing.module';

//Server stuff
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    InfoComponent,
    GameComponent,
    GameNav,
    GameMapCreatorComponent,
    GameCharacterCreatorComponent,
    GameItemCreatorComponent,
    WikiComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }