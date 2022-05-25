import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jeu-list',
  templateUrl: './jeu-list.component.html',
  styleUrls: ['./jeu-list.component.css']
})
export class JeuListComponent implements OnInit {
  gameList: string[] | undefined;
  constructor() {
     
  }

  ngOnInit(): void {
    this.gameList = ["labyrinthe","2", "3", "4"];
    console.log(this.gameList)
  }

}
