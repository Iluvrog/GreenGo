import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  //@ViewChild('game') game: Jeu2Component | undefined ;

  questions: question[] = [];
  currentQuestion: question | undefined;
  counter:number = 0 ;
  score:number = 0 ;
  answer:boolean = false ;

  @Output() messageEvent = new EventEmitter<boolean>() ;

  constructor(private route: ActivatedRoute, private router:Router ) { }

  ngOnInit(): void {
    this.answer = false ;
    this.counter = JSON.parse( localStorage.getItem('counter') || "0" ) ;
    this.score = JSON.parse( localStorage.getItem('score') || "0" ) ;
    if(this.counter >= 4){
      this.counter = 0 ;
      this.score = 0 ;
    }

    /*this.questions = [
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
    ]*/
    this.currentQuestion = this.questions[this.counter] ;
  }

  respond (resp:string, id:number){
    if(resp == this.currentQuestion?.reponse){
      console.log("truu");
      this.score++ ;
      this.answer = true ;
    }
    else{
      this.answer = false ;
      console.log("fal");
    }

    this.counter++ ;

    localStorage.setItem('counter', JSON.stringify(this.counter) );
    localStorage.setItem('score', JSON.stringify(this.score) );
    /*
    for(var i=0; i <4; i++){
      var Button = <HTMLInputElement> document.getElementById(i.toString()) ;
      Button.disabled = true;
    }

    var Button = <HTMLInputElement> document.getElementById(id.toString()) ;
    Button.disabled = false ;
    */
  }

  countinue(){

    //this.game?.plateau[this.game.currentPosition[0]][this.game.currentPosition[1]] = 0 ;
    this.messageEvent.emit(this.answer) ;

    this.router.navigate(['jeu/2']) ;
    this.currentQuestion = this.questions[this.counter] ;

  }

}


