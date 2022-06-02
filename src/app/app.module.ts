import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JeuListComponent } from './jeu-list/jeu-list.component';
import { LabyrintheComponent } from './jeu-list/labyrinthe/labyrinthe.component';
import {HotkeyModule} from 'angular2-hotkeys';
import { Jeu2Component } from './jeu-list/jeu2/jeu2.component';
import { Jeu3Component } from './jeu-list/jeu3/jeu3.component';
import { Jeu4Component } from './jeu-list/jeu4/jeu4.component';
import { QuestionComponent } from './jeu-list/jeu2/Question/question.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    JeuListComponent,
    LabyrintheComponent,
    Jeu2Component,
    Jeu3Component,
    Jeu4Component,
    QuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'home', component: JeuListComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'labyrinthe', component: LabyrintheComponent},
      { path: 'jeu/2', component: Jeu2Component},
      { path: 'jeu/3', component: Jeu3Component},
      { path: 'jeu/4', component: Jeu4Component},
      { path: 'que', component: QuestionComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full'}  
    ]),
    HotkeyModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }