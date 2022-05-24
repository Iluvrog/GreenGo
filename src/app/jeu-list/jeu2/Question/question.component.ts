import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { question } from 'src/app/models/question';
import { Jeu2Component } from '../jeu2.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  template: `<game2 #game></game2>`
})
export class QuestionComponent implements OnInit {
  
  @ViewChild('game') game: Jeu2Component | undefined ;

  questions: question[] = [];
  currentQuestion: question | undefined;
  counter:number = 0 ;
  score:number = 0 ;
  @Input() answer:boolean | undefined ;

  constructor(private route: ActivatedRoute, private router:Router ) { }

  ngOnInit(): void {
    this.answer = false ;
    this.counter = JSON.parse( localStorage.getItem('counter') || "0" ) ;
    this.score = JSON.parse( localStorage.getItem('score') || "0" ) ;
    if(this.counter >= 4){
      this.counter = 0 ;
      this.score = 0 ;
    }

    this.questions = [
      {
        question: 'question1...',
        reponse: 'A',
        choix: ['A','B','C','D']
      },
      {
        question: 'question2...',
        reponse: 'B',
        choix: ['A','B','C','D']
      },
      {
        question: 'question3...',
        reponse: 'C',
        choix: ['A','B','C','D']
      },
      {
        question: 'question4...',
        reponse: 'D',
        choix: ['A','B','C','D']
      }
    ]
    this.currentQuestion = this.questions[this.counter] ;
  }

  respond (resp:string){
    if(resp == this.currentQuestion?.reponse){
      this.score++ ;
      this.answer = true ;
    }
    this.counter++ ;
    
    localStorage.setItem('counter', JSON.stringify(this.counter) );
    localStorage.setItem('score', JSON.stringify(this.score) );
    
  }

  countinue(){
    
    this.router.navigate(['jeu/2']) ;
    this.currentQuestion = this.questions[this.counter] ;
    //this.game?.plateau[this.game.currentPosition[0]][this.game.currentPosition[1]] = 0 ;

  }

}

