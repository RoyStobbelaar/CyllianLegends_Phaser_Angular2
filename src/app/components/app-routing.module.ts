import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app-component/app.component';
import { NavbarComponent } from './navbar-component/navbar.component';
import { InfoComponent } from './info-component/info.component';
import { GameComponent } from './game-component/game.component';
import { WikiComponent } from './wiki-component/wiki.component';


const appRoutes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'info', component: InfoComponent },
  { path: 'wiki', component: WikiComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}