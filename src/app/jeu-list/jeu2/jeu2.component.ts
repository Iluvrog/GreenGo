import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { ServiceService } from './service.service';
import { question } from 'src/app/models/question';
import { QuestionService } from 'src/app/question/question.service';


@Component({
  selector: 'app-jeu2',
  templateUrl: './jeu2.component.html',
  styleUrls: ['./jeu2.component.css'],
  /*
  template:`
    <app-question (messageEvent)="receiveMessage($event)"></app-question>`
    */
})

export class Jeu2Component implements OnInit {

  answer:boolean | undefined ;
  correctAnswer:boolean | undefined;
  isQuestion : boolean | undefined;
  // 0: close, 1: open, 2:impty, 3:correct, 4:false, 5:exit
  niveauxBase: number[][][] = [] ;
  niveaux: number[][][] = [] ;
  plateau: number[][];
  hight_lvl1:number;
  width_lvl1:number;
  hight_lvl2:number;
  width_lvl2:number;
  hight_lvl3:number;
  width_lvl3:number;
  hight_lvl4:number;
  width_lvl4:number;
  levelCounter:number = 0 ;
  currentPosition: number[] = new Array(2) ;
  exit:boolean[] = [] ;
  questions: question[] = [];
  currentQuestion: question | undefined;
  counter:number = 0 ;
  score:number = 0 ;
  reponse:string | undefined;


  constructor(private route: ActivatedRoute, private router:Router, public questionService: QuestionService) {
    this.exit = [false,false,false,false];

    this.width_lvl1 = 5 ;
    this.hight_lvl1 = 11 ;
    this.plateau = new Array(this.width_lvl1) ;

    for(var i=0; i<this.width_lvl1; i++){
      this.plateau[i] = new Array(this.hight_lvl1) ;
    }

    for(var i=0; i<this.width_lvl1; i++){
      for(var j=0; j<this.hight_lvl1; j++){
        if(j<3 || j >7){
          this.plateau[i][j] = 2 ;
        } 
        else         
          this.plateau[i][j] = 0 ;
      }
    }

    this.plateau[4][3] = 1 ;
    this.plateau[4][5] = 5 ;

    for(var i=1; i<4; i++){
      for(var j=4; j<7; j++){
          this.plateau[i][j] = 2 ;
      }
    }

    this.niveaux[0] = this.plateau ;

    this.width_lvl2 = 9 ;
    this.hight_lvl2 = 11 ;
    this.plateau = new Array(this.width_lvl2) ;
    
    for(var i=0; i<this.width_lvl2; i++){
      this.plateau[i] = new Array(this.hight_lvl2) ;
    }

    for(var i=0; i<this.width_lvl2; i++){
      for(var j=0; j<this.hight_lvl2; j++){
        if((j==2 || j==5 || j ==8 || i ==3 || i==5 ))         
          this.plateau[i][j] = 0 ;
        else{
          this.plateau[i][j] = 2 ;
        }   
      }
    }
    this.plateau[4][5] = 1 ;
    this.plateau[8][2] = 5 ;

    this.plateau[3][0] = 2 ;
    this.plateau[3][1] = 2 ;
    this.plateau[5][0] = 2 ;
    this.plateau[5][1] = 2 ;

    this.plateau[3][9] = 2 ;
    this.plateau[3][10] = 2 ;
    this.plateau[5][9] = 2 ;
    this.plateau[5][10] = 2 ;

    this.plateau[4][2] = 2 ;
    this.plateau[4][8] = 2 ;

    this.niveaux[1] = this.plateau ;

    this.width_lvl3 = 11 ;
    this.hight_lvl3 = 11 ;
    this.plateau = new Array(this.width_lvl3) ;

    for(var i=0; i<this.width_lvl3; i++){
      this.plateau[i] = new Array(this.hight_lvl3) ;
    }

    for(var i=0; i<this.width_lvl3; i++){
      for(var j=0; j<this.hight_lvl3; j++){
        this.plateau[i][j] = 0 ;
      }
    }
    this.plateau[0][0] = 2 ;
    this.plateau[1][0] = 2 ;
    this.plateau[2][0] = 2 ;
    this.plateau[3][0] = 2 ;
    this.plateau[4][0] = 2 ;
    this.plateau[10][0] = 2 ;
    
    for(var j=6; j<11; j++){
      this.plateau[j][10] = 2 ;
    }

    for(var u=1; u<4; u++){
      for(var j=6; j<9; j++){
      this.plateau[j][u] = 2 ;
      }
      this.plateau[10][u] = 2 ;
    }

    for(var u=2; u<5; u++){
      for(var j=1; j<4; j++){
      this.plateau[j][u] = 2 ;
      }
      this.plateau[10][u] = 2 ;
    }

    for(var u=6; u<9; u++){
      for(var j=7; j<10; j++){
      this.plateau[j][u] = 2 ;
      }
      this.plateau[0][u] = 2 ;
    }

    for(var u=7; u<10; u++){
      for(var j=2; j<5; j++){
      this.plateau[j][u] = 2 ;
      }
      this.plateau[0][u] = 2 ;
    }

  
    this.plateau[0][10] = 2 ;
    this.plateau[5][5] = 1 ;
    this.plateau[10][9] = 5 ;

    this.niveaux[2] = this.plateau ;

    this.width_lvl4 = 11 ;
    this.hight_lvl4 = 11 ;
    this.plateau = new Array(this.width_lvl4) ;

    for(var i=0; i<this.width_lvl4; i++){
      this.plateau[i] = new Array(this.hight_lvl4) ;
    }

    for(var i=0; i<this.width_lvl4; i++){
      for(var j=0; j<this.hight_lvl4; j++){
        this.plateau[i][j] = 0 ;
      }
    }
    
    for(var i=1; i<this.width_lvl4; i+=2){
      if(i != 5){
        for(var j=1; j<this.hight_lvl4-1; j++){
        this.plateau[i][j] = 2 ;
        }
      } 
    }
    
    for(var i=1; i<this.width_lvl4-1; i++){
      if(j != 5){
        for(var j=1; j<this.hight_lvl4; j+=2){
        this.plateau[i][j] = 2 ;
        }
      } 
    }

    for(var i=2; i<9; i+=2){
        for(var j=3; j<8; j+=2){
        this.plateau[i][j] = 0 ;
        this.plateau[j][i] = 0 ;
        }
    }

    this.plateau[4][3] = 2 ;
    this.plateau[3][6] = 2 ;
    this.plateau[7][4] = 2 ;
    this.plateau[6][7] = 2 ;
    this.plateau[1][5] = 0 ;
    this.plateau[5][1] = 0 ;
    this.plateau[9][5] = 0 ;
    this.plateau[5][9] = 0 ;
  
    this.plateau[5][5] = 1 ;
    this.plateau[5][0] = 5 ;

    this.niveaux[3] = this.plateau ;
    this.niveauxBase = this.niveaux ;
  }
  
  ngOnInit(): void {

    this.isQuestion = false;

    if(localStorage.getItem('niveaux-J2') != null)
      this.niveaux = JSON.parse( localStorage.getItem('niveaux-J2') || "" ) ;

    if(localStorage.getItem('plateau-J2') != null)
      this.plateau = JSON.parse(localStorage.getItem('plateau-J2') || "")

    let val = localStorage.getItem('levelCounter');
    this.levelCounter = (val == null) ? 0 : +val;
    console.log('levelCounter : '+this.levelCounter);

    if(localStorage.getItem('currentPosition-J2') != null)
      this.currentPosition = JSON.parse( localStorage.getItem('currentPosition-J2') || "" ) ; 
    
    if(localStorage.getItem('exit-J2') != null)
      this.exit = JSON.parse( localStorage.getItem('exit-J2') || "" ) ;

    this.plateau = this.niveaux[this.levelCounter] ;
  
    this.counter = JSON.parse( localStorage.getItem('counter-J2') || "0" ) ;
    this.score = JSON.parse( localStorage.getItem('score-J2') || "0" ) ;
    if(this.counter >= 4){
      this.counter = 0 ;
      this.score = 0 ;
    }

    this.questions = [
      {
        question: 'question1...',
        reponse: 'A',
        choix: ['A','B','C','D'],
        feedback: 'feedback',
        type: 0 
      },
      {
        question: 'question2...',
        reponse: 'B',
        choix: ['A','B','C','D'],
        feedback: 'feedback',
        type: 1
      },
      {
        question: 'question3...',
        reponse: 'C',
        choix: ['A','B','C','D'],
        feedback: 'feedback',
        type: 2
      },
      {
        question: 'question4...',
        reponse: 'D',
        choix: ['A','B','C','D'],
        feedback: 'feedback',
        type: 3
      }
    ]
    this.currentQuestion = this.questions[this.counter] ;
    this.charger();
  }

  next(){
    this.levelCounter++;
    this.plateau = this.niveaux[this.levelCounter];
    localStorage.setItem('levelCounter', JSON.stringify(this.levelCounter) ); 
  }

  previous(){
    if (this.levelCounter > 0)
      this.levelCounter--;
    this.plateau = this.niveaux[this.levelCounter] ;

    localStorage.setItem('levelCounter', JSON.stringify(this.levelCounter) );
  }

  async click(i:number, j:number){

    this.currentPosition = [i,j] ;

    if(this.plateau){ 
      if(this.plateau[this.currentPosition[0]][this.currentPosition[1]] == 5){
        this.levelCounter++ ;
        this.plateau = this.niveaux[this.levelCounter] ;
        return ;
      }
    }

    this.isQuestion = true;

    this.answer = false ;

    this.adjacent(this.currentPosition) ;

    while(!this.answer){
      await new Promise(r => setTimeout(r, 500));
    }

    if(this.plateau){ 
      if(this.correctAnswer)
        this.plateau[this.currentPosition[0]][this.currentPosition[1]] = 3 ;
      else
        this.plateau[this.currentPosition[0]][this.currentPosition[1]] = 4 ;
    }
    localStorage.setItem('niveaux-J2', JSON.stringify(this.niveaux));
    localStorage.setItem('levelCounter-J2', JSON.stringify(this.levelCounter) );
    localStorage.setItem('currentPosition-J2', JSON.stringify(this.currentPosition) );
    localStorage.setItem('exit-J2', JSON.stringify(this.exit) ); 
  }
  
  adjacent(pos:number[]) {
    

    if(this.plateau){
      if( pos[1]+1 < this.plateau[0].length ){
        if(this.plateau[pos[0]][pos[1]+1] == 0)
          this.plateau[pos[0]][pos[1]+1] = 1 ;
        else if(this.plateau[pos[0]][pos[1]+1] == 5){
            this.exit[this.levelCounter] = true ;
        }
      }
        
      if( pos[1]-1 >= 0 ){
        if(this.plateau[pos[0]][pos[1]-1] == 0)
          this.plateau[pos[0]][pos[1]-1] = 1 ;
        else if(this.plateau[pos[0]][pos[1]-1] == 5){
          this.exit[this.levelCounter] = true ;
        }
      }
      
      if( pos[0]+1 < this.plateau.length){
        if(this.plateau[pos[0]+1][pos[1]] == 0)
          this.plateau[pos[0]+1][pos[1]] = 1 ;
        else if(this.plateau[pos[0]+1][pos[1]] == 5){
          this.exit[this.levelCounter] = true ;
        }
      }
         
      if( pos[0]-1 >= 0){
        if(this.plateau[pos[0]-1][pos[1]] == 0)
          this.plateau[pos[0]-1][pos[1]] = 1 ;
        else if(this.plateau[pos[0]-1][pos[1]] == 5){
          this.exit[this.levelCounter] = true ;
        }
      }
      localStorage.setItem('exit-J2', JSON.stringify(this.exit) );
      console.log("exit : ", this.exit);
        

    }
  }
  
  restart(){
    this.exit[this.levelCounter] = false;
    this.niveaux[this.levelCounter] = this.niveauxBase[this.levelCounter] ;
    this.plateau = this.niveaux[this.levelCounter] ;
    
    localStorage.setItem('niveaux-J2', JSON.stringify(this.niveaux));
    localStorage.setItem('exit-J2', JSON.stringify(this.exit));
    localStorage.setItem('plateau-J2', JSON.stringify(this.plateau));
    
    this.nouvellePartie();
  }

  respond (resp:string, id:number){
    this.reponse = resp ;
    if(resp == this.currentQuestion?.reponse){
      this.score++ ;
      this.correctAnswer = true ;
    }
    else{
      this.correctAnswer = false ;
    }

    this.counter++ ;
    this.answer = true ;

    localStorage.setItem('counter-J2', JSON.stringify(this.counter) );
    localStorage.setItem('score-J2', JSON.stringify(this.score) );
    
  }

  countinue(){
    this.isQuestion = false;
    this.currentQuestion = this.questions[this.counter] ;
    this.questionSuivante();
  }

  isActivate = false;
  isValidate = false;
  isFinish = false;
  previousNb = 0;
  nbQuestion = 1;
  nbRepJuste = 0;

  typeQuestion = 2;

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

  valider(){
    let tab = this.questionService.valider(this.is1, this.is2, this.is3, this.is4, this.q1, this.q2, this.q3, this.q4, this.isActivate, this.nbRepJuste, this.colorQ1, this.colorQ2, this.colorQ3, this.colorQ4, 0, true);
    this.colorQ1 = tab[0];
    this.colorQ2 = tab[1];
    this.colorQ3 = tab[2];
    this.colorQ4 = tab[3];
    this.isValidate = tab[4];
    if(this.isValidate){
      this.nbRepJuste = tab[5];
      this.is1 = tab[6];
      this.is2 = tab[7];
      this.is3 = tab[8];
      this.is4 = tab[9];
      this.isActivate = tab[10];
      this.previousNb = tab[11];
      this.correctAnswer = tab[12];
      if(this.plateau){ 
        if(this.correctAnswer)
          this.plateau[this.currentPosition[0]][this.currentPosition[1]] = 3 ;
        else
          this.plateau[this.currentPosition[0]][this.currentPosition[1]] = 4 ;
      }
      localStorage.setItem('plateau-J2', JSON.stringify(this.plateau));
    }
    this.sauvegarder();
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
    let tab = this.questionService.questionSuivante(this.nbQuestion, true, 1);

    this.nbQuestion = tab[0];
    this.isFinish = tab[1];
    this.is1 = tab[2];
    this.is2 = tab[3];
    this.is3 = tab[4];
    this.is4 = tab[5];
    this.isActivate = tab[6];
    this.previousNb = tab[7];
    this.isValidate = tab[8];
    this.colorQ1 = tab[9];
    this.colorQ2 = tab[10];
    this.colorQ3 = tab[11];
    this.colorQ4 = tab[12];
    this.sauvegarder();
  }

  nouvellePartie(){
    let tab = this.questionService.nouvellePartie();

    this.is1 = tab[0];
    this.is2 = tab[1];
    this.is3 = tab[2];
    this.is4 = tab[3];
    this.isActivate = tab[4];
    this.previousNb = tab[5];
    this.isValidate = tab[6];
    this.colorQ1 = this.colorQ2 = this.colorQ3 = this.colorQ4 = tab[7];
    this.nbRepJuste = tab[8];
    this.nbQuestion = tab[9];
    this.isFinish = tab[10];
    this.sauvegarder();
  }

  sauvegarder(){
    localStorage.setItem('isValidate-J2', this.isValidate.toString());
    if(this.colorQ1 != null && this.colorQ2 != null && this.colorQ3 != null && this.colorQ4 != null){
      localStorage.setItem('colorQ1-J2', this.colorQ1);
      localStorage.setItem('colorQ2-J2', this.colorQ2);
      localStorage.setItem('colorQ3-J2', this.colorQ3);
      localStorage.setItem('colorQ4-J2', this.colorQ4);
    }
    localStorage.setItem('nbRepJuste-J2', this.nbRepJuste.toString());
    localStorage.setItem('nbQuestion-J2', this.nbQuestion.toString());
    localStorage.setItem('isFinish-J2', this.isFinish.toString());
    localStorage.setItem('isValidate-J2', this.isValidate.toString());
  }

  charger(){
    this.isActivate = (localStorage.getItem('isActivate-J2') == null || localStorage.getItem('isActivate-J2') == "false") ? false : true;
    this.isValidate = (localStorage.getItem('isValidate-J2') == null || localStorage.getItem('isValidate-J2') == "false") ? false : true;
    this.isFinish = (localStorage.getItem('isFinish-J2') == null || localStorage.getItem('isFinish-J2') == "false") ? false : true;
   
    this.colorQ1 = (localStorage.getItem("colorQ1-J2") == null) ? 'nothing' : localStorage.getItem("colorQ1-J2");
    this.colorQ2 = (localStorage.getItem("colorQ2-J2") == null) ? 'nothing' : localStorage.getItem("colorQ2-J2");
    this.colorQ3 = (localStorage.getItem("colorQ3-J2") == null) ? 'nothing' : localStorage.getItem("colorQ3-J2");
    this.colorQ4 = (localStorage.getItem("colorQ4-J2") == null) ? 'nothing' : localStorage.getItem("colorQ4-J2");

    this.previousNb = 0;
    var val = localStorage.getItem("nbQuestion-J2");
    this.nbQuestion = (val == null) ? 1 : +val;

    val = localStorage.getItem("nbRepJuste-J2");
    this.nbRepJuste = (val == null) ? 0 : +val;
    
    let width: number;
    let height: number;
    if(this.levelCounter == 0){
      width = this.width_lvl1;
      height = this.hight_lvl1;
    }else if(this.levelCounter == 1){
      width = this.width_lvl2;
      height = this.hight_lvl2;
    }else if(this.levelCounter == 2){
      width = this.width_lvl3;
      height = this.hight_lvl3
    }else if(this.levelCounter == 3){
      width = this.width_lvl4;
      height = this.hight_lvl4;
    }else{
      width = -1;
      height = -1;
    }

    let tab = (localStorage.getItem('plateau-J2') == null) ? '' : localStorage.getItem("plateau-J2");
    if(tab != ''){
      console.log('tab : '+ tab);
    
      var cpt = 0;
      var i = 0;
      var j = 0;
      let b = true;
      while(i < width){
        while(j < height){
          if(tab?.charAt(cpt) == '0'){
            this.plateau[i][j] = 0;
            b = true;
          }else if(tab?.charAt(cpt) == '1'){
            this.plateau[i][j] = 1;
            b = true;
          }else if(tab?.charAt(cpt) == '2'){
            this.plateau[i][j] = 2;
            b = true;
          }else if(tab?.charAt(cpt) == '3'){
            this.plateau[i][j] = 3;
            b = true;
          }else if(tab?.charAt(cpt) == '4'){
            this.plateau[i][j] = 4;
            b = true;
          }else if(tab?.charAt(cpt) == '5'){
            this.plateau[i][j] = 5;
            b = true;
          }else{
            b = false;
          }
          cpt++;
          if(b){
            j++;
          }
        }
        j = 0;
        i++;
      }
      console.log('plateau : ' + this.plateau);
    }
  }
}
