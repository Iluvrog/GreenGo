import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from './service.service';
import { MatDialog } from '@angular/material/dialog' ;
import { RulesComponent } from './rules/rules.component';
import { GameOverComponent } from './game-over/game-over.component';
import { getLocaleEraNames } from '@angular/common';


@Component({
  selector: 'app-jeu2',
  templateUrl: './jeu2.component.html',
  styleUrls: ['./jeu2.component.css']
})
export class Jeu2Component implements OnInit {

  answer:boolean | undefined ;
  // 0: close, 1: open, 2:impty, 3:correct, 4:false, 5:exit
  niveauxBase: number[][][] = [] ;
  niveaux: number[][][] = [] ;
  plateau: number[][] | undefined ;
  hight:number | undefined ;
  width:number | undefined ;
  currentPosition: number[] = new Array(2) ;
  exit:boolean[] = [] ;
  maxLevel:number = 0 ;

  constructor(private route: ActivatedRoute, private router:Router, public service:ServiceService,
    private dialogue: MatDialog ) {

    this.exit = [false,false,false,false] ;
    //this.service.levelCounter = 0 ;

    this.width = 5 ;
    this.hight = 11 ;
    this.plateau = new Array(this.width) ;

    for(var i=0; i<this.width; i++){
      this.plateau[i] = new Array(this.hight) ;
    }

    for(var i=0; i<this.width; i++){
      for(var j=0; j<this.hight; j++){
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

    this.width = 9 ;
    this.hight = 11 ;
    this.plateau = new Array(this.width) ;
    
    for(var i=0; i<this.width; i++){
      this.plateau[i] = new Array(this.hight) ;
    }

    for(var i=0; i<this.width; i++){
      for(var j=0; j<this.hight; j++){
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

    this.width = 11 ;
    this.hight = 11 ;
    this.plateau = new Array(this.width) ;

    for(var i=0; i<this.width; i++){
      this.plateau[i] = new Array(this.hight) ;
    }

    for(var i=0; i<this.width; i++){
      for(var j=0; j<this.hight; j++){
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

    this.width = 11 ;
    this.hight = 11 ;
    this.plateau = new Array(this.width) ;

    for(var i=0; i<this.width; i++){
      this.plateau[i] = new Array(this.hight) ;
    }

    for(var i=0; i<this.width; i++){
      for(var j=0; j<this.hight; j++){
        this.plateau[i][j] = 0 ;
      }
    }
    
    for(var i=1; i<this.width ; i+=2){
      if(i != 5){
        for(var j=1; j<this.hight-1; j++){
        this.plateau[i][j] = 2 ;
        }
      } 
    }
    
    for(var i=1; i<this.width-1; i++){
      if(j != 5){
        for(var j=1; j<this.hight; j+=2){
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

    if(localStorage.getItem('niveaux') != null)
      this.niveaux = JSON.parse( localStorage.getItem('niveaux') || "" ) ;

    this.service.levelCounter = JSON.parse( localStorage.getItem('levelCounter') || "0" ) ;

    if(localStorage.getItem('currentPosition') != null)
      this.currentPosition = JSON.parse( localStorage.getItem('currentPosition') || "" ) ; 
    
    if(localStorage.getItem('exit') != null)
      this.exit = JSON.parse( localStorage.getItem('exit') || "" ) ;

    this.maxLevel = JSON.parse( localStorage.getItem('maxLevel') || "0" ) ;

    this.plateau = this.niveaux[this.service.levelCounter] ;

    var Button = <HTMLInputElement> document.getElementById("previous") ;
    if(this.service.levelCounter == 0)
      Button.disabled = true;
    else
      Button.disabled = false;

    var Button = <HTMLInputElement> document.getElementById("next") ;
    if(this.service.levelCounter == this.maxLevel)
      Button.disabled = true;
    else
      Button.disabled = false;
  }

  next (){
    this.service.levelCounter++ ;
    this.plateau = this.niveaux[this.service.levelCounter] ;
    localStorage.setItem('levelCounter', JSON.stringify(this.service.levelCounter) );

    var Button = <HTMLInputElement> document.getElementById("previous") ;
    if(this.service.levelCounter > 0)
      Button.disabled = false;

    Button = <HTMLInputElement> document.getElementById("next") ;
    if(this.service.levelCounter == this.maxLevel)
      Button.disabled = true; 
     
  }

  previous (){

    this.service.levelCounter-- ;
    this.plateau = this.niveaux[this.service.levelCounter] ;

    localStorage.setItem('levelCounter', JSON.stringify(this.service.levelCounter) );

    var Button = <HTMLInputElement> document.getElementById("next") ;
    if(this.service.levelCounter < 3)
      Button.disabled = false;

    Button = <HTMLInputElement> document.getElementById("previous") ;
    if(this.service.levelCounter == 0)
      Button.disabled = true;

    
  }

  async click(i:number, j:number){

    this.currentPosition = [i,j] ;

    if(this.plateau){ 
      if(this.plateau[this.currentPosition[0]][this.currentPosition[1]] == 5){
        if(this.service.levelCounter == 3){
          this.dialogue.open(GameOverComponent) ;
          return;
        }
        if(this.service.levelCounter == 0){
          var Button = <HTMLInputElement> document.getElementById("previous") ;
          Button.disabled = false;
        }
        this.service.levelCounter++ ;
        this.plateau = this.niveaux[this.service.levelCounter] ;
        this.maxLevel++ ;
        localStorage.setItem('maxLevel', JSON.stringify(this.maxLevel) );
        return ;
      }
    }

    this.router.navigate(['que']) ;
    

    this.service.answer = false ;

    this.adjacent(this.currentPosition) ;

    while(!this.service.answer){
      await new Promise(r => setTimeout(r, 500));
    }

    if(this.plateau){ 
      if(this.service.correctAnswer)
        this.plateau[this.currentPosition[0]][this.currentPosition[1]] = 3 ;
      else
        this.plateau[this.currentPosition[0]][this.currentPosition[1]] = 4 ;
    }
    localStorage.setItem('niveaux', JSON.stringify(this.niveaux) );
    localStorage.setItem('levelCounter', JSON.stringify(this.service.levelCounter) );
    localStorage.setItem('currentPosition', JSON.stringify(this.currentPosition) );
    localStorage.setItem('exit', JSON.stringify(this.exit) ); 
  }
  
  adjacent(pos:number[]) {
    

    if(this.plateau){
      if( pos[1]+1 < this.plateau[0].length ){
        if(this.plateau[pos[0]][pos[1]+1] == 0)
          this.plateau[pos[0]][pos[1]+1] = 1 ;
        else if(this.plateau[pos[0]][pos[1]+1] == 5){
            this.exit[this.service.levelCounter] = true ;
        }
      }
        
      if( pos[1]-1 >= 0 ){
        if(this.plateau[pos[0]][pos[1]-1] == 0)
          this.plateau[pos[0]][pos[1]-1] = 1 ;
        else if(this.plateau[pos[0]][pos[1]-1] == 5){
          this.exit[this.service.levelCounter] = true ;
        }
      }
      
      if( pos[0]+1 < this.plateau.length){
        if(this.plateau[pos[0]+1][pos[1]] == 0)
          this.plateau[pos[0]+1][pos[1]] = 1 ;
        else if(this.plateau[pos[0]+1][pos[1]] == 5){
          this.exit[this.service.levelCounter] = true ;
        }
      }
         
      if( pos[0]-1 >= 0){
        if(this.plateau[pos[0]-1][pos[1]] == 0)
          this.plateau[pos[0]-1][pos[1]] = 1 ;
        else if(this.plateau[pos[0]-1][pos[1]] == 5){
          this.exit[this.service.levelCounter] = true ;
        }
      }

      console.log("exit : ", this.exit);
        

    }
  }
  
  restart(){
    localStorage.removeItem('plateau') ;
    this.exit[this.service.levelCounter] = false ;
    this.niveaux[this.service.levelCounter] = this.niveauxBase[this.service.levelCounter] ;
    this.plateau = this.niveaux[this.service.levelCounter] ;
    this.service.scores[this.service.levelCounter] = 0 ;
    localStorage.setItem('niveaux', JSON.stringify(this.niveaux) );
    localStorage.setItem('exit', JSON.stringify(this.exit) );
    localStorage.setItem('score', JSON.stringify(this.service.scores) );
  }

  openRules(){
    this.dialogue.open(RulesComponent) ;
  }

  sum(list:number[]):number{
    var s = 0 ;
    for(var i = 0; i<list.length; i++){
      s+=list[i] ;
    }
    return s ;
  }
   
}
