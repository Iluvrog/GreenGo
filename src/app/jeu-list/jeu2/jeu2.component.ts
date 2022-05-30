import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from './service.service';


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
  // 0: close, 1: open, 2:impty, 3:correct, 4:false
  niveaux: number[][][] = [] ;
  plateau: number[][] | undefined ;
  hight:number | undefined ;
  width:number | undefined ;
  levelCounter:number = 0 ;
  currentPosition: number[] = new Array(2) ;

  constructor(private route: ActivatedRoute, private router:Router, public service:ServiceService ) {
    this.width = 5 ;
    this.hight = 11 ;
    this.plateau = new Array(this.width) ;
    i:Number ;
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

    this.width = 3 ;
    this.hight = 7 ;
    this.plateau = new Array(this.width) ;

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

    this.niveaux[3] = this.plateau ;

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
    this.plateau[0][0] = 1 ;

    this.niveaux[4] = this.plateau ;
  }
  
  ngOnInit(): void {
    
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

  async click(i:number, j:number){
    this.router.navigate(['que']) ;
    this.currentPosition = [i,j] ;

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
    
    localStorage.setItem('plateau', JSON.stringify(this.plateau) );
    localStorage.setItem('levelCounter', JSON.stringify(this.levelCounter) );
    localStorage.setItem('currentPosition', JSON.stringify(this.currentPosition) ); 
  }
  
  adjacent(pos:number[]) {
    
    if(this.plateau){
      if( pos[1]+1 < this.plateau[0].length && this.plateau[pos[0]][pos[1]+1] == 0)
        this.plateau[pos[0]][pos[1]+1] = 1 ;
      if( pos[1]-1 >= 0 && this.plateau[pos[0]][pos[1]-1] == 0)
        this.plateau[pos[0]][pos[1]-1] = 1 ;
      
      if( pos[0]+1 < this.plateau.length && this.plateau[pos[0]+1][pos[1]] == 0)
        this.plateau[pos[0]+1][pos[1]] = 1 ;
       
      if( pos[0]-1 >= 0 && this.plateau[pos[0]-1][pos[1]] == 0)
        this.plateau[pos[0]-1][pos[1]] = 1 ;

    }
  }
  
  restart(){
    localStorage.removeItem('plateau') ;
    this.plateau = this.niveaux[this.levelCounter] ;
  }
   
}
