import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { question } from 'src/app/models/question';

@Component({
  selector: 'app-jeu3',
  templateUrl: './jeu3.component.html',
  styleUrls: ['./jeu3.component.css']
})
export class Jeu3Component implements OnInit {

  questions: question[] = [];
  currentQuestion: question | undefined;
  counter:number = 0 ;
  score:number = 0 ;

  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
   /* this.questions = [
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

  respond (resp:string){
    if(resp == this.currentQuestion?.reponse){
      this.score++ ;
    }
    this.counter++ ;
    this.currentQuestion = this.questions[this.counter] ;

    //this.router.navigate(['jeu/2/']) ;
  }

}
