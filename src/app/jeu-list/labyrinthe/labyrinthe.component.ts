import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from "./service/level.service";
import { HotkeysService, Hotkey } from 'angular2-hotkeys'; //npm install angular2-hotkeys --save
import { question } from 'src/app/models/question';
import {Question} from "../../question"
import { QuestionService } from 'src/app/question/question.service';

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
      books: number[][];
      exit : number[];
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
      books: number[][];
      exit : number[];
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
  public booksPosition : number[][];
  public exitPosition: number[];

  time: number = 0;
  timebegin : boolean = false;
  interval: any;

  public isQuestion = false;
  public isBook = false;

  constructor(private route: ActivatedRoute, private router:Router, private LevelService: LevelService,private _hotkeysService: HotkeysService,public questionService:QuestionService ) {
    this.manPosition = [];
    this.setHotKeys();
    this.doorsPosition = [];
    this.keysPosition = [];
    this.booksPosition = [];
    this.exitPosition = [];
  }

  ngOnInit(): void {
      if(localStorage.getItem('num_niv') != null)
        this.id = JSON.parse( localStorage.getItem('num_niv') || "" ) ;

      if(this.id > 1){
        this.id = 0;
      }
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
        this.booksPosition = this.currentLevel.positions.books;
        this.exitPosition = this.currentLevel.positions.exit;
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

        if(localStorage.getItem('perso') != null)
          this.manPosition = JSON.parse( localStorage.getItem('perso') || "" ) ;
        if(localStorage.getItem('nbmove') != null){
          this.currentMoves = JSON.parse( localStorage.getItem('nbmove') || "" ) ;
        }else{
          this.currentMoves = 0;
        }
        if(localStorage.getItem('doorsPosition') != null)
          this.doorsPosition = JSON.parse( localStorage.getItem('doorsPosition') || "" ) ;
        if(localStorage.getItem('keysPosition') != null)
          this.keysPosition = JSON.parse( localStorage.getItem('keysPosition') || "" ) ;
        if(localStorage.getItem('time') != null){
          this.time = JSON.parse( localStorage.getItem('time') || "" ) ;
          this.timebegin = true;
          this.startTimer();
        }else{
          this.time = 0;
        }

        if( localStorage.getItem('cle')){
          this.cle_question = JSON.parse( localStorage.getItem('cle') || "" ) ;
        }
        if( localStorage.getItem('question')){
          this.isQuestion = JSON.parse( localStorage.getItem('question') || "" ) ;
        }else{
          this.isQuestion = false;
        }
        if( localStorage.getItem('q')){
          this.currentQuestion = JSON.parse( localStorage.getItem('q') || "" ) ;
          this.initQuestion();
        }
        if( localStorage.getItem('rep')){
          this.reponse = JSON.parse( localStorage.getItem('rep') || "" ) ;
        }
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

  getID() : number{
    return this.id;
  }

  exit(h : number, w : number): boolean {
    return this.exitPosition[0] == h && this.exitPosition[1] == w;
  }

  getBooks(h : number, w : number): number {
    i:Number ;
    for (var i = 0 ; i < this.booksPosition.length; i++){
      if(this.booksPosition[i][0] == h && this.booksPosition[i][1] == w){
        return i;
      }
    }
    return -1;
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

  isInventaire(i: number): boolean {
    if(i >= this.keysPosition.length)
      return false;
    return this.keysPosition[i][2] == 1;
  }

  getNumberMove() : number{
    return this.currentMoves;
  }

  moveLeft() {
    if (this.currentLevel.cases[this.manPosition[0]][this.manPosition[1]] % 2 != 1 && this.not_door(this.manPosition[0],this.manPosition[1], 4)) {
      this.manPosition[1] = this.manPosition[1] - 1;
      this.increaseMoves();
    }
    this.checkObj();
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
    this.checkObj();
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
    this.checkObj();
  }

  moveDown() {
    if (this.pas_a_bas(this.manPosition[0],this.manPosition[1]) && this.not_door(this.manPosition[0],this.manPosition[1], 3)) {
      this.manPosition[0] = this.manPosition[0] + 1;
      this.increaseMoves();
    }
    this.checkObj();
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
    this.reinitStorage();
    window.location.reload();
  }

  setHotKeys() {
    this._hotkeysService.add(new Hotkey(['up', 'down','left','right','space'], (event: KeyboardEvent, combo: string): boolean => {
      if (combo === 'up') { this.moveUp(); this.onAction(); }
      if (combo === 'down') { this.moveDown(); this.onAction();}
      if (combo === 'left') { this.moveLeft(); this.onAction();}
      if (combo === 'right') { this.moveRight(); this.onAction();}
      if (combo === 'space') { this.action(); this.onAction();}
      return false; // Prevent bubbling
    }));
  }

  action(){
    this.on_and_take_keys();
    this.checkBook();
    this.checkObj();
  }

  on_and_take_keys() : void{
    var n = this.getKeys(this.manPosition[0],this.manPosition[1]);
    if(n != -1){//take key
      //question
      this.cle_question = n;
      this.questionSuivante();
      this.isQuestion = true;
      this.reponse = false;
      this.saveState();
    }
  }

  startTimer():void {
    this.timebegin = true;
    this.interval = setInterval(() => {
      this.time++;
    },1000);
  }

  stopTimer():void{
    clearInterval(this.interval);
    this.timebegin = false;
  }

  gettime(): number{
    return this.time;
  }

  nextLevel() : void{
    localStorage.clear();
    this.id = this.id + 1;
    this.stopTimer();
    this.ngOnInit();
    this.saveState();
  }

  previousLevel() : void{
    localStorage.clear();
    this.id = this.id - 1;
    this.stopTimer();
    this.ngOnInit();
    this.saveState();
  }

  retry() : void{
    localStorage.clear();
    this.stopTimer();
    this.ngOnInit();
    this.saveState();
  }

  reinitStorage() : void{
    localStorage.clear();
  }

  saveState() : void{
    localStorage.setItem('num_niv', JSON.stringify(this.id) );
    localStorage.setItem('perso', JSON.stringify(this.manPosition) );
    localStorage.setItem('nbmove', JSON.stringify(this.currentMoves) );
    localStorage.setItem('doorsPosition', JSON.stringify(this.doorsPosition) );
    localStorage.setItem('keysPosition', JSON.stringify(this.keysPosition) );
    localStorage.setItem('time', JSON.stringify(this.time) );
    localStorage.setItem('cle', JSON.stringify(this.cle_question) );
    localStorage.setItem('question', JSON.stringify(this.isQuestion) );
    localStorage.setItem('q', JSON.stringify(this.currentQuestion) );
    localStorage.setItem('rep', JSON.stringify(this.reponse) );
  }

  onAction(){
    if(!this.timebegin){
      this.startTimer();
    }
    this.saveState();
  }

  checkObj() : void{
    if(this.manPosition[0] == this.exitPosition[0] && this.manPosition[1] == this.exitPosition[1]){
      this.nextLevel();
    }
  }

  checkBook() : void{
      // todo
  }

  currentQuestion: Question = new Question();
  reponse: boolean = false;

  cle_question : number = 0;

  isActivate = false;
  isValidate = false;
  isFinish = false;
  isGenerate = false;
  previousNb = 0;
  nbQuestion = 1;
  nbRepJuste = 0;

  typeQuestion: number|undefined;

  is1 = false;
  is2 = false;
  is3 = false;
  is4 = false;

  q1 = 1;
  q2 = 1;
  q3 = 1;
  q4 = 0;

  colorQ1: string|null = 'nothing';
  colorQ2: string|null = 'nothing';
  colorQ3: string|null = 'nothing';
  colorQ4: string|null = 'nothing';

  reponse_string : string|undefined;

  clickReponse(nb: number){
    let tab = this.questionService.clickReponse(nb, this.previousNb, this.is1, this.is2, this.is3, this.is4, this.isValidate, this.isActivate);
    this.is1 = tab[0];
    this.is2 = tab[1];
    this.is3 = tab[2];
    this.is4 = tab[3];
    this.isActivate = tab[4];
    this.previousNb = tab[5];
  }

  clickReponseM(nb: number){
    let tab = this.questionService.clickReponseM(nb, this.previousNb, this.is1, this.is2, this.is3, this.is4, this.isActivate, this.isValidate);
    this.is1 = tab[0];
    this.is2 = tab[1];
    this.is3 = tab[2];
    this.is4 = tab[3];
    this.isActivate = tab[4];
  }

  countinue(){
    this.isQuestion = false;
  }

  valider(){
    if(this.q3 == undefined){
      this.q3 = 0;
    }
    if(this.q4 == undefined){
      this.q4 = 0;
    }
    let tab = this.questionService.valider(this.is1, this.is2, this.is3, this.is4, this.q1, this.q2, this.q3, this.q4, this.isActivate, 0, this.colorQ1, this.colorQ2, this.colorQ3, this.colorQ4, 0, true, false);
    this.colorQ1 = tab[0];
    this.colorQ2 = tab[1];
    this.colorQ3 = tab[2];
    this.colorQ4 = tab[3];
    this.isValidate = tab[4];
    if(this.isValidate){
      this.is1 = tab[6];
      this.is2 = tab[7];
      this.is3 = tab[8];
      this.is4 = tab[9];
      this.isActivate = tab[10];
      this.previousNb = tab[11];
      this.reponse = tab[12];

      if(this.reponse){
          this.keysPosition[this.cle_question][2] = 1;
          this.isQuestion = false;
      }
    }
    this.saveState();
  }

  reset(){
    let tab = this.questionService.reset();

    this.is1 = tab[0];
    this.is2 = tab[1];
    this.is3 = tab[2];
    this.is4 = tab[3];
    this.isActivate = tab[4];
    this.previousNb = tab[5];
  }

  questionSuivante(){

    this.currentQuestion = this.questionService.getNQuestions(1)[0] ;
    if(this.currentQuestion.answerValue != undefined){
      this.q1 = this.currentQuestion.answerValue[0];
      this.q2 = this.currentQuestion.answerValue[1];
      this.q3 = this.currentQuestion.answerValue[2];
      this.q4 = this.currentQuestion.answerValue[3];
    }
    this.typeQuestion = this.currentQuestion.questionType;


    let tab = this.questionService.questionSuivante(this.nbQuestion, true, 1);

    this.is1 = tab[2];
    this.is2 = tab[3];
    this.is3 = tab[4];
    this.is4 = tab[5];
    this.previousNb = tab[7];
    this.isValidate = tab[8];
    this.colorQ1 = tab[9];
    this.colorQ2 = tab[10];
    this.colorQ3 = tab[11];
    this.colorQ4 = tab[12];
    this.saveState();
  }

  initQuestion(){
    if(this.currentQuestion.answerValue != undefined){
      this.q1 = this.currentQuestion.answerValue[0];
      this.q2 = this.currentQuestion.answerValue[1];
      this.q3 = this.currentQuestion.answerValue[2];
      this.q4 = this.currentQuestion.answerValue[3];
    }
    this.typeQuestion = this.currentQuestion.questionType;


    let tab = this.questionService.questionSuivante(this.nbQuestion, true, 1);

    this.is1 = tab[2];
    this.is2 = tab[3];
    this.is3 = tab[4];
    this.is4 = tab[5];
    this.previousNb = tab[7];
    this.isValidate = tab[8];
    this.colorQ1 = tab[9];
    this.colorQ2 = tab[10];
    this.colorQ3 = tab[11];
    this.colorQ4 = tab[12];
  }
}
