import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from "./service/level.service";


@Component({
  selector: 'app-labyrinthe',
  templateUrl: './labyrinthe.component.html',
  styleUrls: ['./labyrinthe.component.css']
})
export class LabyrintheComponent implements OnInit {

  allLevels!: {
    level: number;
    //"target-moves": number;
    positions: {
      man: number[];
      /*boxes: number[][];
      target: number[][];*/
    };
    cases: number[][];
  }[];
  currentLevel!: {
    level: number;
    //"target-moves": number;
    positions: {
      man: number[];
      //boxes: number[][];
      //target: number[][];
    };
    cases: number[][];
  };

  id: number = 0;
  public rows! : number;
  public columns! : number;
  public board!: boolean [][];
  
  private sub: any;
  public manPosition: number[];
  public currentMoves: number = 0;
  /*public targetMoves: number;

  public boxesPosition: number[][];
  public targetsPosition: number[][];
  
  
  public hasWon: boolean = false;
  public hasLost: boolean = false;*/

  constructor(private route: ActivatedRoute, private router:Router, private LevelService: LevelService ) { 
    this.manPosition = [];
  }


  ngOnInit(): void {
      this.sub = this.route.params.subscribe((params) => {
        //this.id = +params["id"];
        this.allLevels = this.LevelService.getAllLevels();
        console.log(this.id);
        this.currentLevel = this.allLevels[this.id];
        this.rows = this.currentLevel.cases.length;
        this.columns = this.currentLevel.cases[0].length;
        this.manPosition = this.currentLevel.positions.man;
        /*this.boxesPosition = this.currentLevel.positions.boxes;
        this.targetsPosition = this.currentLevel.positions.target;
        this.targetMoves = this.currentLevel["target-moves"];*/
        this.board = [];

        for (let i = 0; i < this.rows; i++) {
          this.board[i] = [];
          for (let j = 0; j < this.columns; j++) {
            this.board[i][j] = false;
          }
        }
        this.board[0][0] = true;
      });
  }
  
  getvalue(h : number, w : number): number {
    return this.currentLevel.cases[h][w];
  }

  perso(h : number, w : number): boolean {
    return this.manPosition[0] == h && this.manPosition[1] == w;
  }

  moveLeft() {
    if (this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] % 2 != 1) {
      this.manPosition[1] = this.manPosition[1] - 1;
      this.increaseMoves();
    }
  }

  moveRight() {
    if (this.pas_a_droite(this.manPosition[0],this.manPosition[1])) {
      this.manPosition[1] = this.manPosition[1] + 1;
      this.increaseMoves();
    }
  }

  pas_a_droite(l:number, c:number) : boolean{
    if(this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] < 4){
      return true;
    }else if(this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] < 8){
      return false;
    }else if(this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] < 12){
      return true;
    }else{
      return false;
    }
  }

  moveUp() {
    if (this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] < 8) {
      this.manPosition[0] = this.manPosition[0] - 1;
      this.increaseMoves();
    }
  }

  moveDown() {
    if (this.pas_a_bas(this.manPosition[0],this.manPosition[1])) {
      this.manPosition[0] = this.manPosition[0] + 1;
      this.increaseMoves();
    }
  }

  pas_a_bas(l:number, c:number) : boolean{
    if(this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] < 2){
      return true;
    }else if(this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] < 4){
      return false;
    }else if(this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] < 6){
      return true;
    }else if(this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] < 8){
      return false;
    }else if(this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] < 10){
      return true;
    }else if(this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] < 12){
      return false;
    }else if(this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] < 14){
      return true;
    }else{
      return false;
    }
  }

  increaseMoves(): void {
    this.currentMoves++;
  }

  refresh(): void {
    window.location.reload();
  }
}