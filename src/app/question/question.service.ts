import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

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

  clickReponseM(nb: number, previousNb: number, is1: boolean, is2: boolean, is3: boolean, is4: boolean, isActivate: boolean):any[]{
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
    return [is1, is2, is3, is4, isActivate];
  }

  valider(is1: boolean, is2: boolean, is3: boolean, is4: boolean, q1: boolean, q2: boolean, q3: boolean, q4: boolean, isActivate: boolean, nbRepJuste: number, colorQ1: string|null, colorQ2: string|null, colorQ3: string|null, colorQ4: string|null) :any[]{
    if(isActivate){
      if(is1){
        if(q1){
          colorQ1 = 'green';
          nbRepJuste++;
          //localStorage.setItem('nbRepJuste', this.nbRepJuste.toString());
        }else{
          colorQ1 = 'red';
        }
        //localStorage.setItem('colorQ1', this.colorQ1);
      }
      if(is2){
        if(q2){
          colorQ2 = 'green';
          nbRepJuste++;
          //localStorage.setItem('nbRepJuste', this.nbRepJuste.toString());
        }else{
          colorQ2 = 'red';
        }
        //localStorage.setItem('colorQ2', this.colorQ2);
      }
      if(is3){
        if(q3){
          colorQ3 = 'green';
          nbRepJuste++;
          //localStorage.setItem('nbRepJuste', this.nbRepJuste.toString());
        }else{
          colorQ3 = 'red';
        }
        //localStorage.setItem('colorQ3', this.colorQ3);
      }
      if(is4){
        if(q4){
          colorQ4 = 'green';
          nbRepJuste++;
          //localStorage.setItem('nbRepJuste', this.nbRepJuste.toString());
        }else{
          colorQ4 = 'red';
        }
        //localStorage.setItem('colorQ4', this.colorQ4);
      }
      //localStorage.setItem('isValidate', this.isValidate.toString());
      return[colorQ1, colorQ2, colorQ3, colorQ4, true, nbRepJuste, false, false, false, false, 0];
    }else{
      alert("Vous devez choisir une réponse pour valider");
      return['nothing', 'nothing', 'nothing', 'nothing', false, nbRepJuste];
    }
  }

  reset(): any[]{
    return [false, false, false, false, false, 0];
  }

  questionSuivante(nbQuestion :number) :any[]{
    nbQuestion++;
    let tab : any[];
    if(nbQuestion == 4){
      tab = this.reset();
      return [nbQuestion, true, tab[0], tab[1], tab[2], tab[3], tab[4], tab[5], false, 'nothing', 'nothing', 'nothing', 'nothing'];
    }else{
      tab = this.reset();
      return [nbQuestion, false, tab[0], tab[1], tab[2], tab[3], tab[4], tab[5], false, 'nothing', 'nothing', 'nothing', 'nothing'];
    }

    /*localStorage.setItem('nbQuestion', this.nbQuestion.toString());
    localStorage.setItem('isFinish', this.isFinish.toString());
    localStorage.setItem('isValidate', this.isValidate.toString());
    localStorage.setItem('colorQ1', this.colorQ1);
    localStorage.setItem('colorQ2', this.colorQ2);
    localStorage.setItem('colorQ3', this.colorQ3);
    localStorage.setItem('colorQ4', this.colorQ4);*/
  }

  nouvellePartie() :any[]{
    alert("Vous avez commencez une nouvelle partie");
    
    let tab = this.reset();
    return [tab[0], tab[1], tab[2], tab[3], tab[4], tab[5], false, 'nothing', 0, 1, false];


    /*localStorage.setItem('isValidate', this.isValidate.toString());
    localStorage.setItem('colorQ1', this.colorQ1);
    localStorage.setItem('colorQ2', this.colorQ2);
    localStorage.setItem('colorQ3', this.colorQ3);
    localStorage.setItem('colorQ4', this.colorQ4);
    localStorage.setItem('nbRepJuste', this.nbRepJuste.toString());
    localStorage.setItem('nbQuestion', this.nbQuestion.toString());
    localStorage.setItem('isFinish', this.isFinish.toString());*/
  }
}