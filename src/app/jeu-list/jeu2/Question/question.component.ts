import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { question } from 'src/app/models/question';
import { ServiceService } from '../service.service';

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
  reponse:string | undefined;

  constructor(private route: ActivatedRoute, private router:Router, public service:ServiceService ) { }

  ngOnInit(): void {
    
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

  respond (resp:string, id:number){
    this.reponse = resp ;
    if(resp == this.currentQuestion?.reponse){
      this.score++ ;
      this.service.correctAnswer = true ;
    }
    else{
      this.service.correctAnswer = false ;
    }

    this.counter++ ;
    this.service.answer = true ;

    localStorage.setItem('counter', JSON.stringify(this.counter) );
    localStorage.setItem('score', JSON.stringify(this.score) );
    /*
    for(var i=0; i <4; i++){
      var Button = <HTMLInputElement> document.getElementById(i.toString()) ;
      Button.disabled = true;
    }

    var Button = <HTMLInputElement> document.getElementById(id.toString()) ;
    */
    
  }

  countinue(){
    this.router.navigate(['jeu/2']) ;
    this.currentQuestion = this.questions[this.counter] ;
    
  }

  confirm(){
    
  }

}


