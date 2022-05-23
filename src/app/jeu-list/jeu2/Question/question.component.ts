import { Component, OnInit } from '@angular/core';
import { question } from 'src/app/models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions: question[] = [];
  currentQuestion: question | undefined;
  counter:number = 0 ;
  score:number = 0 ;

  constructor() { }

  ngOnInit(): void {
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
    }
    this.counter++ ;
    this.currentQuestion = this.questions[this.counter] ;
  }

}

