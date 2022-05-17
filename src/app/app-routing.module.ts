import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabyrintheComponent } from './labyrinthe/labyrinthe.component';

const routes: Routes = [
  { path: 'Labyrinthe' , component: LabyrintheComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
