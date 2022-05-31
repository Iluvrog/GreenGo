import { Question } from './question';
import { Component, OnInit } from '@angular/core';
import fileQuestionsJSON from '../assets/questions.json'
import fileAnswerJSON from '../assets/answers.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TER';
  gameSelected: string | undefined;
  gameList: string[] | undefined

  questionsJSON = fileQuestionsJSON//Actuellement se trouve dans src/assets/question, plus tard sera recuperer par requete http
  answersJSON = fileAnswerJSON//Pareil


  questions : Question[] = [] //Variable a utiliser contenant la liste de toutes les questions, si on veut choisir n questions aleatoirement, il y a la fonction getNQuestions
  
  
  ngOnInit(): void {
    this.gameList = ["Labyrinthe","Trivial poursuit", "Incollables", "Qui veut gagner des millions"];
    console.log(this.gameList)
    this.questions = []
    this.parseJSONToModel()
    console.log(this.questions)
  }


  parseJSONToModel(){
    this.questionsJSON.forEach(element => {
      let quest: Question = new Question
      quest.text = element.QUESTION
      quest.questionType = +element.FORMAT //+ pour cast en number

      this.answersJSON.forEach(ans =>{
        if(ans.IDQ === element.ID){
          quest.answers?.push(ans.ANSWER)
          quest.answerValue?.push(+ans.VALUE)
        }

      });
      this.questions?.push(quest)
  });
  }

  /* Choisis àléatoirement n questions parmis l'array questions, sans repetition*/
  getNQuestions(n:number){
   let lesQuestions =  []

    for (var a = [...Array(this.questions?.length).keys()], i = n; i--; ) {
      var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
      lesQuestions.push(this.questions[random])
  }
    return lesQuestions
    
  }

  // selectGame(game : string){
  //   console.log(`Vous souhaitez jouer a ${game}`)
  //   this.goToLink(`localhost:4200/${game}`)
  // }

  // goToLink(url : string){
  //   window.open(url,"_blank")
  // }
}
