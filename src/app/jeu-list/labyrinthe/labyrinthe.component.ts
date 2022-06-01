import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from "./service/level.service";
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { NumberValueAccessor } from '@angular/forms';

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
      doors: number[][];
      keys: number[][];
    };
    cases: number[][];
  }[];
  currentLevel!: {
    level: number;
    //"target-moves": number;
    positions: {
      man: number[];
      doors: number[][];
      keys: number[][];
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
  public doorsPosition: number[][];
  public keysPosition: number[][];
  /*public targetMoves: number;

  
  
  
  
  public hasWon: boolean = false;
  public hasLost: boolean = false;*/

  constructor(private route: ActivatedRoute, private router:Router, private LevelService: LevelService,private _hotkeysService: HotkeysService ) { 
    this.manPosition = [];
    this.setHotKeys();
    this.doorsPosition = [];
    this.keysPosition = [];
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
        this.doorsPosition = this.currentLevel.positions.doors;
        this.keysPosition = this.currentLevel.positions.keys;
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

  getDoors(h : number, w : number): number[] {
    i:Number ;
    for (var i = 0 ; i < this.doorsPosition.length; i++){
      if(this.doorsPosition[i][0] == h && this.doorsPosition[i][1] == w && this.doorsPosition[i][3] == 0){
        return [i , this.doorsPosition[i][2]];
      }
    }
    return [];
  }

  getKeys(h : number, w : number): number {
    i:Number ;
    for (var i = 0 ; i < this.keysPosition.length; i++){
      if(this.keysPosition[i][0] == h && this.keysPosition[i][1] == w && this.keysPosition[i][2] == 0 ){
        return i;
      }
    }
    return -1;
  }

  moveLeft() {
    if (this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] % 2 != 1 && this.not_door(this.manPosition[0],this.manPosition[1], 4)) {
      this.manPosition[1] = this.manPosition[1] - 1;
      this.increaseMoves();
    }
  }

  not_door(h : number, w : number , dir : number): boolean {
    i:Number ;
    for (var i = 0 ; i < this.doorsPosition.length; i++){
      if(this.doorsPosition[i][0] == h && this.doorsPosition[i][1] == w && this.doorsPosition[i][2] == dir && this.doorsPosition[i][3] == 0 && this.keysPosition[i][2] == 0){
        return false;
      }
      else if(this.doorsPosition[i][0] == h && this.doorsPosition[i][1] == w && this.doorsPosition[i][2] == dir && this.doorsPosition[i][3] == 0 && this.keysPosition[i][2] == 1){
        this.doorsPosition[i][3] = 1;
        return true;
      }
    }
    return true;
  }

  moveRight() {
    if (this.pas_a_droite(this.manPosition[0],this.manPosition[1]) && this.not_door(this.manPosition[0],this.manPosition[1], 2)) {
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
    if (this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] < 8 && this.not_door(this.manPosition[0],this.manPosition[1], 1)) {
      this.manPosition[0] = this.manPosition[0] - 1;
      this.increaseMoves();
    }
  }

  moveDown() {
    if (this.pas_a_bas(this.manPosition[0],this.manPosition[1]) && this.not_door(this.manPosition[0],this.manPosition[1], 3)) {
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

  setHotKeys() {
    this._hotkeysService.add(new Hotkey(['up', 'down','left','right','space'], (event: KeyboardEvent, combo: string): boolean => {
      if (combo === 'up') { this.moveUp(); }
      if (combo === 'down') { this.moveDown(); }
      if (combo === 'left') { this.moveLeft(); }
      if (combo === 'right') { this.moveRight(); }
      if (combo === 'space') { this.action(); }
      return false; // Prevent bubbling
    }));
  }

  action(){
    this.on_and_take_keys();
  }

  on_and_take_keys() : void{
    var n = this.getKeys(this.manPosition[0],this.manPosition[1]);
    if(n != -1){//take key
      this.keysPosition[n][2] = 1;
    }
  }
}