import { Component, OnInit } from '@angular/core';
import { allLevels } from 'src/app/jeu-list/labyrinthe/AllLevels';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelsComponent implements OnInit {

  public allLevels: any[];

  constructor() { 
    this.allLevels = allLevels;
  }

  ngOnInit() {
  }

}