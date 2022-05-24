import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { question } from 'src/app/models/question';
import { QuestionComponent } from './Question/question.component';


@Component({
  selector: 'app-jeu2',
  templateUrl: './jeu2.component.html',
  styleUrls: ['./jeu2.component.css'],
  template:`
    <app-jeu2 (messageEvent)="receiveMessage($event)"></app-jeu2>`
})
export class Jeu2Component implements OnInit {

  constructor(private route: ActivatedRoute, private router:Router ) { }

  answer = true ;
  // 0: close, 1: open, 2:impty, 3:correct, 4:false
  niveaux: number[][][] = [] ;
  plateau: number[][] | undefined ;
  hight:number | undefined ;
  width:number | undefined ;
  levelCounter:number = 0 ;
  currentPosition: number[] = new Array(2) ;
  
  ngOnInit(): void {

    this.width = 3 ;
    this.hight = 4 ;
    this.plateau = new Array(this.width) ;
    i:Number ;
    for(var i=0; i<this.width; i++){
      this.plateau[i] = new Array(this.hight) ;
    }

    for(var i=0; i<this.width; i++){
      for(var j=0; j<this.hight; j++){
        this.plateau[i][j] = 0 ;
      }
    }
    //this.currentPosition = [0,0] ;

    this.plateau[1][1] = 1 ;
    //this.plateau[1][1] = 2 ;
    //this.plateau[2][1] = 4 ;
    //this.plateau[1][3] = 4 ;
    //this.plateau[1][2] = 2 ;

    this.niveaux[0] = this.plateau ;

    this.width = 3 ;
    this.hight = 5 ;
    this.plateau = new Array(this.width) ;
    i:Number ;
    for(var i=0; i<this.width; i++){
      this.plateau[i] = new Array(this.hight) ;
    }

    for(var i=0; i<this.width; i++){
      for(var j=0; j<this.hight; j++){
        this.plateau[i][j] = 0 ;
      }
    }
    this.plateau[0][2] = 2 ;
    this.plateau[1][0] = 2 ;
    this.plateau[1][4] = 2 ;
    this.plateau[2][2] = 2 ;
    this.plateau[1][2] = 1 ;

    

    this.niveaux[1] = this.plateau ;

    this.width = 3 ;
    this.hight = 7 ;
    this.plateau = new Array(this.width) ;
    i:Number ;
    for(var i=0; i<this.width; i++){
      this.plateau[i] = new Array(this.hight) ;
    }

    for(var i=0; i<this.width; i++){
      for(var j=0; j<this.hight; j++){
        this.plateau[i][j] = 0 ;
      }
    }
    this.plateau[0][0] = 1 ;
    this.plateau[1][1] = 2 ;
    this.plateau[1][2] = 2 ;
    this.plateau[2][2] = 3 ;
    this.plateau[1][3] = 2 ;

    this.plateau[0][5] = 2 ;
    this.plateau[2][5] = 2 ;
    this.plateau[1][5] = 4 ;

    this.niveaux[2] = this.plateau ;

    this.plateau = this.niveaux[this.levelCounter] ;
    
    
    if( localStorage.getItem('plateau') != null)
      this.plateau = JSON.parse( localStorage.getItem('plateau') || "" ) ;

    this.levelCounter = JSON.parse( localStorage.getItem('levelCounter') || "0" ) ;

    if(localStorage.getItem('currentPosition') != null)
      this.currentPosition = JSON.parse( localStorage.getItem('currentPosition') || "" ) ;
    
  }

  next (){
    this.levelCounter++ ;
    this.plateau = this.niveaux[this.levelCounter] ;
    
  }

  previous (){
    if (this.levelCounter > 0)
      this.levelCounter-- ;
    this.plateau = this.niveaux[this.levelCounter] ;
  }

  click(i:number, j:number){
    this.router.navigate(['que']) ;
    this.currentPosition = [i,j] ;

    if(this.plateau){ 
      if(this.answer)
        this.plateau[this.currentPosition[0]][this.currentPosition[1]] = 3 ;
      else
        this.plateau[this.currentPosition[0]][this.currentPosition[1]] = 4 ;
      
      this.adjacent(this.currentPosition) ;
    }

    localStorage.setItem('plateau', JSON.stringify(this.plateau) );
    localStorage.setItem('levelCounter', JSON.stringify(this.levelCounter) );
    localStorage.setItem('currentPosition', JSON.stringify(this.currentPosition) ); 
  }

  receiveMessage($event: boolean){
    this.answer = $event ;
  }
  
  adjacent(pos:number[]) {
    
    if(this.plateau){
      if(this.plateau[pos[0]][pos[1]+1] == 0 && pos[1]+1 < this.plateau[0].length)
        this.plateau[pos[0]][pos[1]+1] = 1 ;
      if(this.plateau[pos[0]][pos[1]-1] == 0 && pos[1]-1 >= 0)
        this.plateau[pos[0]][pos[1]-1] = 1 ;

      if(this.plateau[pos[0]+1][pos[1]] == 0 && pos[0]+1 < this.plateau.length)
        this.plateau[pos[0]+1][pos[1]] = 1 ;
      if(this.plateau[pos[0]-1][pos[1]] == 0 && pos[0]-1 >= 0)
        this.plateau[pos[0]-1][pos[1]] = 1 ;
    }
  }
  
  restart(){
    localStorage.removeItem('plateau') ;
    this.plateau = this.niveaux[this.levelCounter] ;
  }
   
}
