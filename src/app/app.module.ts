import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JeuListComponent } from './jeu-list/jeu-list.component';
import { Jeu1Component } from './jeu-list/jeu1/jeu1.component';
import { Jeu2Component } from './jeu-list/jeu2/jeu2.component';
import { Jeu3Component } from './jeu-list/jeu3/jeu3.component';
import { Jeu4Component } from './jeu-list/jeu4/jeu4.component';
import { RuleJ3Component } from './jeu-list/jeu3/rule-j3/rule-j3.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { RulesComponent } from './jeu-list/jeu2/rules/rules.component';
import { GameOverComponent } from './jeu-list/jeu2/game-over/game-over.component';

@NgModule({
  declarations: [
    AppComponent,
    JeuListComponent,
    Jeu1Component,
    Jeu2Component,
    Jeu3Component,
    Jeu4Component,
    RuleJ3Component,
    RulesComponent,
    GameOverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'home', component: JeuListComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'jeu/1', component: Jeu1Component},
      { path: 'jeu/2', component: Jeu2Component},
      { path: 'jeu/3', component: Jeu3Component},
      { path: 'jeu/4', component: Jeu4Component},
      { path: 'jeu/3/rule', component: RuleJ3Component},
      { path: '**', redirectTo: 'home', pathMatch: 'full'}
    ]),
    BrowserAnimationsModule, 
    MatDialogModule
  ],
  entryComponents : [
    RulesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }