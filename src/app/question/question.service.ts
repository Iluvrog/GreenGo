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

  valider(is1: boolean, is2: boolean, is3: boolean, is4: boolean, q1: number, q2: number, q3: number, q4: number, isActivate: boolean, nbRepJuste: number, colorQ1: string|null, colorQ2: string|null, colorQ3: string|null, colorQ4: string|null, time: number) :any[]{
    let b: boolean = true;
    let total = q1 + q2 + q3 + q4;
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
      if(b){
        nbRepJuste = nbRepJuste + (newScore / total) ;
      }
      console.log(b);
      console.log(nbRepJuste);
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
  }

  nouvellePartie() :any[]{
    alert("Vous avez commencez une nouvelle partie");
    
    let tab = this.reset();
    return [tab[0], tab[1], tab[2], tab[3], tab[4], tab[5], false, 'nothing', 0, 1, false];
  }
}