import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Jeu3Component } from './jeu3.component';

describe('Jeu3Component', () => {
  let component: Jeu3Component;
  let fixture: ComponentFixture<Jeu3Component>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule ],
      declarations: [ Jeu3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Jeu3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click response', ()=>{
    component.clickReponse(0);
    let service= component.getService()
    let tab = service.clickReponse(0, component.previousNb, component.is1, component.is2, component.is3, component.is4, component.isValidate, component.isActivate);
    expect(component.is1).toBe(tab[0]);
    expect(component.is2).toBe(tab[1]);
    expect(component.is3).toBe(tab[2]);
    expect(component.is4).toBe(tab[3]);
    expect(component.isActivate).toBe(tab[4]);
    expect(component.previousNb).toBe(tab[5]);
  });

  it('should respondM', () => {
    component.clickReponseM(0);
    let service = component.getService();
    let tab = service.clickReponseM(0, component.previousNb, component.is1, component.is2, component.is3, component.is4, component.isValidate, component.isActivate);
    expect(component.is1).toBe(tab[0]);
    expect(component.is2).toBe(tab[1]);
    expect(component.is3).toBe(tab[2]);
    expect(component.is4).toBe(tab[3]);
  });

  it('should reset', () => {
      component.reset();
      let service = component.getService();
      let tab = service.reset();
      expect(component.is1).toBe(tab[0]);
      expect(component.is2).toBe(tab[1]);
      expect(component.is3).toBe(tab[2]);
      expect(component.is4).toBe(tab[3]);
      expect(component.isActivate).toBe(tab[4]);
      expect(component.previousNb).toBe(tab[5]);
  });

  it('should start a new session', () =>{
    component.nouvellePartie();
    let service = component.getService()
    let tab = service.nouvellePartie();
    expect(component.is1).toBe(tab[0]);
    expect(component.is2).toBe(tab[1]);
    expect(component.is3).toBe(tab[2]);
    expect(component.is4).toBe(tab[3]);
    expect(component.isActivate).toBe(tab[4]);
    expect(component.previousNb).toBe(tab[5]);
    expect(component.isValidate).toBe(tab[6]);
    expect(component.colorQ1).toBe(tab[7]);
    expect(component.colorQ2).toBe(tab[7]);
    expect(component.colorQ3).toBe(tab[7]);
    expect(component.colorQ4).toBe(tab[7]);
    expect(component.nbRepJuste).toBe(6);
    expect(component.nbQuestion).toBe(tab[9]);
    expect(component.isFinish).toBe(tab[10]);
    expect(component.isSauvegarde).toBe(true);
    expect(component.isMenu).toBe(false);
    expect(component.colorTimer).toBe('textVert');
  });

  it('should go to next question', ()=>{
    component.questionSuivante();
    let service = component.getService();
    let tab = service.questionSuivante(0, true, 1);
    expect(component.is1).toBe(tab[2]);
    expect(component.is2).toBe(tab[3]);
    expect(component.is3).toBe(tab[4]);
    expect(component.is4).toBe(tab[5]);
    expect(component.previousNb).toBe(tab[7]);
    expect(component.isValidate).toBe(tab[8]);
    expect(component.colorQ1).toBe(tab[9]);
    expect(component.colorQ2).toBe(tab[10]);
    expect(component.colorQ3).toBe(tab[11]);
    expect(component.colorQ4).toBe(tab[12]);
  });


  it('should save', ()=>{
    component.sauvegarder();
    expect(localStorage.getItem('isValidate-J3')).toBe(component.isValidate.toString());
    expect(localStorage.getItem('colorQ1-J3')).toBe(component.colorQ1);
    expect(localStorage.getItem('colorQ2-J3')).toBe(component.colorQ2);
    expect(localStorage.getItem('colorQ3-J3')).toBe(component.colorQ3);
    expect(localStorage.getItem('colorQ4-J3')).toBe(component.colorQ4);
    expect(localStorage.getItem('nbRepJuste-J3')).toBe(component.nbRepJuste.toString());
    expect(localStorage.getItem('nbQuestion-J3')).toBe(component.nbQuestion.toString());
    expect(localStorage.getItem('isFinish-J3')).toBe(component.isFinish.toString());
    expect(localStorage.getItem('isValidate-J3')).toBe(component.isValidate.toString());
  });

  it('should start timer', () => {
    component.startTimer(10);
    expect(component.isStart).toBe(true);
    expect(component.colorTimer).toEqual('textRouge');
  });

  it('should load', ()=>{
    component.chargerPartie();
    expect(component.isMenu).toBe(false);
  });

  it('should quit', ()=>{
    component.quitter();
    expect(component.isMenu).toBe(true);
  });

  it('should generate question', () => {
    component.genererQuestion(2);
    if(component.currentQuestionsList){
      expect( component.currentQuestion).toBe(component.currentQuestionsList[2]);
    }
    expect(component.typeQuestion).toBe(component.currentQuestion.questionType);

    if(component.currentQuestion?.answers != undefined){
      expect(component.textRep1).toBe(component.currentQuestion?.answers[0]);
      expect(component.textRep2).toBe(component.currentQuestion?.answers[1]);
      expect(component.textRep3).toBe(component.currentQuestion?.answers[2]);
      expect(component.textRep4).toBe(component.currentQuestion?.answers[3]);
      expect(component.isRep4).toBe((component.currentQuestion?.answers[3] != null));
    }

    if(component.currentQuestion?.answerValue != undefined){
      expect(component.q1).toBe(component.currentQuestion?.answerValue[0]);
      expect(component.q2).toBe(component.currentQuestion?.answerValue[1]);
      expect(component.q3).toBe(component.currentQuestion?.answerValue[2]);
      expect(component.q4).toBe(component.currentQuestion?.answerValue[3]);
    }

    if(component.currentQuestion?.feedback != undefined){
      expect(component.feedback).toBe(component.currentQuestion?.feedback);
    }
  });

  it('should validate', () => {
    component.isValidate = true;
    component.valider();
    let service = component.getService();
    let tab = service.valider(component.is1, component.is2, component.is3, component.is4, component.q1, component.q2, component.q3, component.q4, component.isActivate, component.nbRepJuste, component.colorQ1, component.colorQ2, component.colorQ3, component.colorQ4, 0, true, false);
    //expect(component.colorQ1).toBe(tab[0]);
    expect(component.colorQ2).toBe(tab[1]);
    expect(component.colorQ3).toBe(tab[2]);
    expect(component.colorQ4).toBe(tab[3]);
   // expect(component.isValidate).toBe(tab[4]);
    expect(component.nbRepJuste).toBe(tab[5]);
    expect(component.is1).toBe(tab[6]);
    expect(component.is2).toBe(tab[7]);
    expect(component.is3).toBe(tab[8]);
    expect(component.is4).toBe(tab[9]);
    expect(component.isActivate).toBe(tab[10]);
    expect(component.previousNb).toBe(tab[11]);

  });
});
