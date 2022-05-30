import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/question/question.service';

@Component({
  selector: 'app-jeu3',
  templateUrl: './jeu3.component.html',
  styleUrls: ['./jeu3.component.css']
})
export class Jeu3Component implements OnInit {

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
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
  }

  isActivate = false;
  isValidate = false;
  isFinish = false;
  previousNb = 0;
  nbQuestion = 1;
  nbRepJuste = 0;
  typeQuestion = 0;

  is1 = false;
  is2 = false;
  is3 = false;
  is4 = false;

  q1 = true;
  q2 = false;
  q3 = false;
  q4 = false;

  colorQ1: string|null = 'nothing';
  colorQ2: string|null = 'nothing';
  colorQ3: string|null = 'nothing';
  colorQ4: string|null = 'nothing';

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
    let tab = this.questionService.clickReponseM(nb, this.previousNb, this.is1, this.is2, this.is3, this.is4, this.isActivate)
    this.is1 = tab[0];
    this.is2 = tab[1];
    this.is3 = tab[2];
    this.is4 = tab[3];
    this.isActivate = tab[4];
  }

  valider(){
    let tab = this.questionService.valider(this.is1, this.is2, this.is3, this.is4, this.q1, this.q2, this.q3, this.q4, this.isActivate, this.nbRepJuste, this.colorQ1, this.colorQ2, this.colorQ3, this.colorQ4);
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
    let tab = this.questionService.questionSuivante(this.nbQuestion);

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
  }

  nouvellePartie(){
    let tab = this.questionService.nouvellePartie();

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
    this.sauvegarder();
  }

  sauvegarder(){
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
    localStorage.setItem('nbQuestion-J3', this.nbQuestion.toString());
    localStorage.setItem('isFinish-J3', this.isFinish.toString());
    localStorage.setItem('isValidate-J3', this.isValidate.toString());
  }
}