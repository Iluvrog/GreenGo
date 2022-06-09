import { Injectable } from '@angular/core';
import { Question } from '../question';
import fileQuestionsJSON from '../../assets/questions.json'
import fileAnswerJSON from '../../assets/answers.json'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questionsJSON = fileQuestionsJSON//Actuellement se trouve dans src/assets/question, plus tard sera recuperer par requete http
  answersJSON = fileAnswerJSON//Pareil

  numberOfQuestions : number | undefined //a initialiser dans le constructeur peut etre selon le type de jeu
  allQuestions : Question[]  = [] //Variable a utiliser contenant la liste de toutes les questions
  
  currentQuestionsList: Question[] | undefined //Liste de n questions courante

  constructor() {
    this.allQuestions = []
    this.currentQuestionsList  = []
    this.parseJSONToModel()//On remplit allQuestions ici
  }

  parseJSONToModel(){
    this.questionsJSON.forEach(element => {
      let quest: Question = new Question(element.QUESTION)
      quest.questionType = +element.FORMAT //+ pour cast en number
      
      
      this.answersJSON.forEach(ans =>{
        if(ans.IDQ === element.ID){
          quest.answers?.push(ans.ANSWER)
          quest.answerValue?.push(+ans.VALUE)
        }
        
      });
      this.allQuestions?.push(quest)
      quest.feedback = element.FEEDBACK;
    });
  }
  /* Choisis àléatoirement n questions parmis l'array questions, A FAIRE : FAIRE EN SORTE QUE PAS DE REPETITION*/
  getNQuestions(n:number){
    let lesQuestions =  []
    
    for (var a = [...Array(this.allQuestions?.length).keys()], i = n; i--; ) {
      var random = Math.floor(Math.random()*this.allQuestions?.length);
      lesQuestions.push(this.allQuestions[random])
    }
     return lesQuestions 
  }

  clickReponse(nb: number, previousNb: number, is1: boolean, is2: boolean, is3: boolean, is4: boolean, isValidate: boolean, isActivate: boolean) :any[]{
    if(!isValidate){
      if(!isActivate){
        isActivate = true;
      }
      is1 = is2 = is3 = is4 = false;
      if(nb == 1 && !(previousNb == 1)){
        if(!is1){
          is1 = true;
        }
      }else if(nb == 2 && !(previousNb == 2)){
        if(!is2){
          is2 = true;
        }
      }else if(nb == 3 && !(previousNb == 3)){
        if(!is3){
          is3 = true;
        }
      }else if(nb == 4 && !(previousNb == 4)){
        if(!is4){
          is4 = true;
        }
      }
      if(previousNb == nb){
        return this.reset();
      }else{
        previousNb = nb;
      }
    }
    return [is1, is2, is3, is4, isActivate, previousNb];
   }

  clickReponseM(nb: number, previousNb: number, is1: boolean, is2: boolean, is3: boolean, is4: boolean, isActivate: boolean, isValidate: boolean):any[]{
    if(!isValidate){
      if(!isActivate){
        isActivate = true;
      }
      if(nb == 1 && !(previousNb == 1)){
        is1 = !is1;
      }
      if(nb == 2 && !(previousNb == 2)){
        is2 = !is2;
      }
      if(nb == 3 && !(previousNb == 3)){
        is3 = !is3;
      }
      if(nb == 4 && !(previousNb == 4)){
        is4 = !is4;
      }
    }
    return [is1, is2, is3, is4, isActivate];
  }

  valider(is1: boolean, is2: boolean, is3: boolean, is4: boolean, q1: number, q2: number, q3: number, q4: number, isActivate: boolean, nbRepJuste: number, colorQ1: string|null, colorQ2: string|null, colorQ3: string|null, colorQ4: string|null, time: number, ruleM: boolean, ruleJ3: boolean) :any[]{
    let b: boolean = true;
    let total = q1 + q2 + q3 + q4;
    console.log('q1 : ' + q1);
    console.log('q2 : ' + q2);
    console.log('q3 : ' + q3);
    console.log('q4 : ' + q4);
    let newScore = 0;
    if(isActivate || time == 0){
      colorQ1 = (q1 > 0) ? 'blue' : 'nothing';
      colorQ2 = (q2 > 0) ? 'blue' : 'nothing';
      colorQ3 = (q3 > 0) ? 'blue' : 'nothing';
      colorQ4 = (q4 > 0) ? 'blue' : 'nothing';

      if(is1){
        if(q1 > 0){
          colorQ1 = 'green';
          newScore++;
        }else{
          colorQ1 = 'red';
          b = false;
        }
      }
      if(is2){
        if(q2 > 0){
          colorQ2 = 'green';
          newScore++;
        }else{
          colorQ2 = 'red';
          b = false;
        }
      }
      if(is3){
        if(q3 > 0){
          colorQ3 = 'green';
          newScore++;
        }else{
          colorQ3 = 'red';
          b = false;
        }
      }
      if(is4){
        if(q4 > 0){
          colorQ4 = 'green';
          newScore++;
        }else{
          colorQ4 = 'red';
          b = false;
        }
      }
      if(ruleM){
        if(newScore != total){
          b = false;
        }
      }
      if(b){
        if(ruleJ3){
          if(nbRepJuste < 10 && newScore == total){
            nbRepJuste++;
          }else if(newScore != total){
            nbRepJuste--;
          }
        }else{
          nbRepJuste = nbRepJuste + (newScore / total) ;
        }
      }else if(!b && ruleJ3 && nbRepJuste > 1){
        nbRepJuste--;
      }
      console.log("le total " +total);
      console.log(nbRepJuste);
      return[colorQ1, colorQ2, colorQ3, colorQ4, true, nbRepJuste, false, false, false, false, false, 0, b];
    }else{
      alert("Vous devez choisir une réponse pour valider");
      return['nothing', 'nothing', 'nothing', 'nothing', false, nbRepJuste];
    }
  }

  reset(): any[]{
    return [false, false, false, false, false, 0];
  }

  questionSuivante(nbQuestion :number, rule2:boolean, nb: number) :any[]{
    nbQuestion++;
    let tab : any[];
    if(nbQuestion == (nb+1) && !rule2){
      tab = this.reset();
      return [nbQuestion, true, tab[0], tab[1], tab[2], tab[3], tab[4], tab[5], false, 'nothing', 'nothing', 'nothing', 'nothing'];
    }else{
      tab = this.reset();
      return [nbQuestion, false, tab[0], tab[1], tab[2], tab[3], tab[4], tab[5], false, 'nothing', 'nothing', 'nothing', 'nothing'];
    }
  }

  nouvellePartie() :any[]{
    let tab = this.reset();
    return [tab[0], tab[1], tab[2], tab[3], tab[4], tab[5], false, 'nothing', 0, 1, false];
  }
}