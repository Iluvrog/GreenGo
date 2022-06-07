import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/question/question.service';
import { Question } from '../../question';

@Component({
  selector: 'app-jeu3',
  templateUrl: './jeu3.component.html',
  styleUrls: ['./jeu3.component.css']
})
export class Jeu3Component implements OnInit {

  constructor(private questionService: QuestionService) { 
  
  }

  ngOnInit(): void {
    this.isMenu = true;
    this.isSauvegarde = (localStorage.getItem('isSauvegarde-J3') == null || localStorage.getItem('isSauvegarde-J3') == "false") ? false : true;
    this.isActivate = (localStorage.getItem('isActivate-J3') == null || localStorage.getItem('isActivate-J3') == "false") ? false : true;
    this.isValidate = (localStorage.getItem('isValidate-J3') == null || localStorage.getItem('isValidate-J3') == "false") ? false : true;
    this.isFinish = (localStorage.getItem('isFinish-J3') == null || localStorage.getItem('isFinish-J3') == "false") ? false : true;
   
    this.colorQ1 = (localStorage.getItem("colorQ1-J3") == null) ? 'nothing' : localStorage.getItem("colorQ1-J3");
    this.colorQ2 = (localStorage.getItem("colorQ2-J3") == null) ? 'nothing' : localStorage.getItem("colorQ2-J3");
    this.colorQ3 = (localStorage.getItem("colorQ3-J3") == null) ? 'nothing' : localStorage.getItem("colorQ3-J3");
    this.colorQ4 = (localStorage.getItem("colorQ4-J3") == null) ? 'nothing' : localStorage.getItem("colorQ4-J3");

    this.previousNb = 0;
    var val = localStorage.getItem("nbQuestion-J3");
    this.nbQuestion = (val == null) ? 1 : +val;

    val = localStorage.getItem("nbRepJuste-J3");
    this.nbRepJuste = (val == null) ? 0 : +val;

    val = localStorage.getItem("Timer-J3");
    this.time = (val == null) ? 30 : +val;

    this.colorTimer = (localStorage.getItem("colorTimer-J3") == null) ? 'textVert' : localStorage.getItem("colorTimer-J3");
    this.startTimer(this.time);

    
    val = localStorage.getItem('textRep1-J3');
    this.textRep1 = (val == undefined) ? '' : val;
    
    val = localStorage.getItem('textRep2-J3');
    this.textRep2 = (val == undefined) ? '' : val;
    
    val = localStorage.getItem('textRep3-J3');
    this.textRep3 = (val == undefined) ? '' : val;

    val = localStorage.getItem('textRep4-J3');
    this.textRep4 = (val == undefined) ? '' : val;
    
    val = localStorage.getItem('q1-J3');
    this.q1 = (val == null) ? 0 : +val;

    val = localStorage.getItem('q2-J3');
    this.q2 = (val == null) ? 0 : +val;

    val = localStorage.getItem('q3-J3');
    this.q3 = (val == null) ? 0 : +val;

    val = localStorage.getItem('q4-J3');
    this.q4 = (val == null) ? 0 : +val;
    
    val = localStorage.getItem('questionType-J3');
    console.log('val : ' + val)
    this.typeQuestion = (val == null) ? 0 : +val;

    val = localStorage.getItem('Text-J3');
    this.currentQuestion.text = (val == undefined) ? '' : val;
    
    val = localStorage.getItem('feedback-J3'); 
    this.currentQuestion.feedback = (val == undefined) ? '' : val;
  }

  currentQuestionsList : Question[] | undefined;
  currentQuestion : Question = new Question();
  idCurrentQuestion : number | undefined;

  isMenu: boolean = true;
  isSauvegarde: boolean = false;

  //pas besoin
  colorTimer: string|null = 'textVert';
  time: number = 15;
  isStart = false;

  //pas besoin
  isActivate = false;
  isValidate = false;
  isFinish = false;
  previousNb = 0;
  nbQuestion = 1;
  nbRepJuste = 0;
  numberQuestion = 4;

  //besoin
  //0 : 4 réponse / 1 choix
  //1 : 2 réponse / 1 choix
  //2 : 4 réponse / plusieurs choix
  typeQuestion: number|undefined;

  //pas besoin
  is1 = false;
  is2 = false;
  is3 = false;
  is4 = false;

  //besoin
  q1 = 1;
  q2 = 1;
  q3 = 1;
  q4 = 0;

  //Pas besoin
  colorQ1: string|null = 'nothing';
  colorQ2: string|null = 'nothing';
  colorQ3: string|null = 'nothing';
  colorQ4: string|null = 'nothing';

  textRep1 :string|null = '';
  textRep2 :string|null = '';
  textRep3 :string|null = '';
  textRep4 :string|null = '';

  feedback :string|null = '';

  clickReponse(nb: number){
    let tab = this.questionService.clickReponse(nb, this.previousNb, this.is1, this.is2, this.is3, this.is4, this.isValidate, this.isActivate);
    this.is1 = tab[0];
    this.is2 = tab[1];
    this.is3 = tab[2];
    this.is4 = tab[3];
    this.isActivate = tab[4];
    this.previousNb = tab[5];
  }

  clickReponseM(nb: number){
    let tab = this.questionService.clickReponseM(nb, this.previousNb, this.is1, this.is2, this.is3, this.is4, this.isActivate, this.isValidate);
    this.is1 = tab[0];
    this.is2 = tab[1];
    this.is3 = tab[2];
    this.is4 = tab[3];
    this.isActivate = tab[4];
  }

  valider(){
    if(this.q3 == undefined){
      this.q3 = 0;
    }
    if(this.q4 == undefined){
      this.q4 = 0;
    }
    let tab = this.questionService.valider(this.is1, this.is2, this.is3, this.is4, this.q1, this.q2, this.q3, this.q4, this.isActivate, this.nbRepJuste, this.colorQ1, this.colorQ2, this.colorQ3, this.colorQ4, this.time, false);
    this.colorQ1 = tab[0];
    this.colorQ2 = tab[1];
    this.colorQ3 = tab[2];
    this.colorQ4 = tab[3];
    this.isValidate = tab[4];
    if(this.isValidate){
      this.nbRepJuste = tab[5];
      this.is1 = tab[6];
      this.is2 = tab[7];
      this.is3 = tab[8];
      this.is4 = tab[9];
      this.isActivate = tab[10];
      this.previousNb = tab[11];
    }
    this.sauvegarder();
  }

  reset(){
    let tab = this.questionService.reset();
  
    this.is1 = tab[0];
    this.is2 = tab[1];
    this.is3 = tab[2];
    this.is4 = tab[3];
    this.isActivate = tab[4];
    this.previousNb = tab[5];
  }

  questionSuivante(){
    let tab = this.questionService.questionSuivante(this.nbQuestion, false, 3);
    this.genererQuestion(this.nbQuestion);
    this.nbQuestion = tab[0];
    this.isFinish = tab[1];
    this.is1 = tab[2];
    this.is2 = tab[3];
    this.is3 = tab[4];
    this.is4 = tab[5];
    this.isActivate = tab[6];
    this.previousNb = tab[7];
    this.isValidate = tab[8];
    this.colorQ1 = tab[9];
    this.colorQ2 = tab[10];
    this.colorQ3 = tab[11];
    this.colorQ4 = tab[12];
    this.sauvegarder();

    this.colorTimer = 'textVert';
    if(!this.isFinish){
      if(!this.isStart){
        this.startTimer(30);
      }else{
        this.time = 30;
      }
    }
  }

  nouvellePartie(){
    let tab = this.questionService.nouvellePartie();
    this.genererQuestion(0);
    this.is1 = tab[0];
    this.is2 = tab[1];
    this.is3 = tab[2];
    this.is4 = tab[3];
    this.isActivate = tab[4];
    this.previousNb = tab[5];
    this.isValidate = tab[6];
    this.colorQ1 = this.colorQ2 = this.colorQ3 = this.colorQ4 = tab[7];
    this.nbRepJuste = tab[8];
    this.nbQuestion = tab[9];
    this.isFinish = tab[10];
    this.isSauvegarde = true;
    this.isMenu = false;
    this.sauvegarder();

    this.colorTimer = 'textVert';
    if(!this.isStart){
      this.startTimer(30);
    }else{
      this.time = 30;
    }
    
  }

  sauvegarder(){
    localStorage.setItem('isSauvegarde-J3', this.isSauvegarde.toString());
    localStorage.setItem('isValidate-J3', this.isValidate.toString());
    if(this.colorQ1 != null && this.colorQ2 != null && this.colorQ3 != null && this.colorQ4 != null){
      localStorage.setItem('colorQ1-J3', this.colorQ1);
      localStorage.setItem('colorQ2-J3', this.colorQ2);
      localStorage.setItem('colorQ3-J3', this.colorQ3);
      localStorage.setItem('colorQ4-J3', this.colorQ4);
    }
    localStorage.setItem('nbRepJuste-J3', this.nbRepJuste.toString());
    localStorage.setItem('nbQuestion-J3', this.nbQuestion.toString());
    localStorage.setItem('isFinish-J3', this.isFinish.toString());
    localStorage.setItem('isValidate-J3', this.isValidate.toString());
    if(this.textRep1 != undefined){
      localStorage.setItem('textRep1-J3', this.textRep1);
    }else{
      localStorage.setItem('textRep1-J3', '');
    }
    if(this.textRep2 != undefined){
      localStorage.setItem('textRep2-J3', this.textRep2);
    }else{
      localStorage.setItem('textRep2-J3', '');
    }
    if(this.textRep3 != undefined){
      localStorage.setItem('textRep3-J3', this.textRep3);
    }else{
      localStorage.setItem('textRep3-J3', '');
    }
    if(this.textRep4 != undefined){
      localStorage.setItem('textRep4-J3', this.textRep4);
    }else{
      localStorage.setItem('textRep4-J3', '');
    }

    if(this.q1 != undefined){
      localStorage.setItem('q1-J3', this.q1.toString());
    }else{
      localStorage.setItem('q1-J3', '');
    }if(this.q2 != undefined){
      localStorage.setItem('q2-J3', this.q2.toString());
    }else{
      localStorage.setItem('q2-J3', '');
    }if(this.q3 != undefined){
      localStorage.setItem('q3-J3', this.q3.toString());
    }else{
      localStorage.setItem('q3-J3', '');
    }if(this.q4 != undefined){
      localStorage.setItem('q4-J3', this.q4.toString());
    }else{
      localStorage.setItem('q4-J3', '');
    }
    
    if(this.currentQuestion.questionType != undefined){
      localStorage.setItem('questionType-J3', this.currentQuestion.questionType?.toString())
    }else{
      localStorage.setItem('questionType-J3', '0');
    }
    if(this.currentQuestion.text != undefined){
      localStorage.setItem('Text-J3', this.currentQuestion.text);
    }else{
      localStorage.setItem('Text-J3', '');
    }
    if(this.currentQuestion.feedback != null){
      localStorage.setItem('feedback-J3', this.currentQuestion.feedback);
    }else{
      localStorage.setItem('feedback-J3', '');
    } 
  }

  startTimer(val: number) {
    if(!this.isStart){
      this.isStart = true;
      this.time = val;
      if(val <= 20 && val > 10){
        this.colorTimer = 'textOrange';
      }else if(val <= 10){
        this.colorTimer = 'textRouge';
      }else{
        this.colorTimer = 'textVert';
      }
      let intervalId = setInterval(() => {
        if (this.time - 1 == -1 || this.isValidate) {
          if(!this.isValidate){
            this.valider();
          }
          clearInterval(intervalId);
          this.isStart = false;
        }else{
          this.time -= 1;
          if(this.time == 20){
            this.colorTimer = 'textOrange';
          }else if(this.time == 10){
            this.colorTimer = 'textRouge';
          }
          localStorage.setItem('Timer-J3', this.time.toString());
          if(this.colorTimer != null){
            localStorage.setItem('colorTimer-J3', this.colorTimer);
          }
        } 
      }, 1000)
    }
  }

  chargerPartie(){
    this.isMenu = false;
  }

  regles(){

  }

  quitter(){
    this.isMenu = true;
  }

  genererQuestion(nb: number){
    this.currentQuestionsList = this.questionService.getNQuestions(this.numberQuestion);
    this.currentQuestion = this.currentQuestionsList[nb];
    this.typeQuestion = this.currentQuestion.questionType;
    if(this.currentQuestion?.answers != undefined){
      this.textRep1 = this.currentQuestion?.answers[0]
      this.textRep2 = this.currentQuestion?.answers[1]
      this.textRep3 = this.currentQuestion?.answers[2]
      this.textRep4 = this.currentQuestion?.answers[3]
    }
    if(this.currentQuestion?.answerValue != undefined){
      this.q1 = this.currentQuestion?.answerValue[0];
      this.q2 = this.currentQuestion?.answerValue[1];
      this.q3 = this.currentQuestion?.answerValue[2];
      this.q4 = this.currentQuestion?.answerValue[3];
    }
    if(this.currentQuestion?.feedback != undefined){
      this.feedback = this.currentQuestion?.feedback;
    }
  }
}