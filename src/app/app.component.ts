import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TER';
  gameSelected: string | undefined;
  gameList: string[] | undefined
  
  
  ngOnInit(): void {
    this.gameList = ["Labyrinthe","Trivial poursuit", "Incollables", "Qui veut gagner des millions"];
    console.log(this.gameList)
  }

  // selectGame(game : string){
  //   console.log(`Vous souhaitez jouer a ${game}`)
  //   this.goToLink(`localhost:4200/${game}`)
  // }

  // goToLink(url : string){
  //   window.open(url,"_blank")
  // }
}
