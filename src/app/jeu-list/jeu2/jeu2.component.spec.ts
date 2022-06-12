import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Jeu2Component } from './jeu2.component';

describe('Jeu2Component', () => {
  let component: Jeu2Component;
  let fixture: ComponentFixture<Jeu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule ],
      declarations: [ Jeu2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Jeu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.plateau = new Array(component.width_lvl1) ;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go forward',() => {
    let i = component.levelCounter;
    component.next();
    expect(component.levelCounter).toBe(i+1);
    expect(localStorage.getItem('levelCounter-J2')).toBe(JSON.stringify(component.levelCounter));
  })

  it('should go back', () => {
    let i = component.levelCounter
    component.previous();
    expect(component.levelCounter).toBe(i-1);
    expect(localStorage.getItem('levelCounter-J2')).toBe(JSON.stringify(component.levelCounter));
  });

  it('should calculate sum', () => {
    let i = component.sum([2,2]);
    expect(i).toBe(4);
  })

  it('should restart', (done) => {
    spyOn(component, 'genererNiveau');
    spyOn(component, 'nouvellePartie');
    component.restart();
    expect(localStorage.getItem('niveaux-J2')).toBe(JSON.stringify(component.niveaux));
    expect(localStorage.getItem('exit-J2')).toBe(JSON.stringify(component.exit));
    expect(localStorage.getItem('score-J2')).toBe(JSON.stringify(component.scores));
    fixture.whenStable().then(() => {
      expect(component.genererNiveau).toHaveBeenCalled();
      expect(component.nouvellePartie).toHaveBeenCalled();
      done();
    });
  });

  it('should continue', (done) => {
    spyOn(component, 'questionSuivante');
    component.countinue();
    expect(component.typeQuestion).toBe(component.currentQuestion.questionType);
    fixture.whenStable().then(() => {
      expect(component.questionSuivante).toHaveBeenCalled();
      done();
    });
  });
  
/* it('should validate', () => {
    component.isValidate = true;
    component.genererNiveau();
    component.correctAnswer = true;
    component.valider();
    let tab = component.questionService.valider(component.is1, component.is2, component.is3, component.is4, component.q1, component.q2, component.q3, component.q4, component.isActivate, component.scores[component.levelCounter], component.colorQ1, component.colorQ2, component.colorQ3, component.colorQ4, 0, true, false);
    expect(component.colorQ1).toBe(tab[0]);
    expect(component.colorQ2).toBe(tab[1]);
    expect(component.colorQ3).toBe(tab[2]);
    expect(component.colorQ4).toBe(tab[3]);
    expect(component.isValidate).toBe(tab[4]);
    expect(component.scores[component.levelCounter]).toBe(tab[5]);
    expect(component.is1).toBe(tab[6]);
    expect(component.is2).toBe(tab[7]);
    expect(component.is3).toBe(tab[8]);
    expect(component.is4).toBe(tab[9]);
    expect(component.isActivate).toBe(tab[10]);
    expect(component.previousNb).toBe(tab[11]);
    expect(component.correctAnswer).toBe(tab[12]);

  });*/


  it('should click', () => {
    component.click(1,2);
    expect(component.currentPosition).toEqual([1,2]);
  })

  it('should reset', () => {
    component.reset();
    let tab = component.questionService.reset();
    expect(component.is1).toBe(tab[0]);
    expect(component.is2).toBe(tab[1]);
    expect(component.is3).toBe(tab[2]);
    expect(component.is4).toBe(tab[3]);
    expect(component.isActivate).toBe(tab[4]);
    expect(component.previousNb).toBe(tab[5]);
  });

  it('should respond', () => {
    component.clickReponse(0);
    let tab = component.questionService.clickReponse(0, component.previousNb, component.is1, component.is2, component.is3, component.is4, component.isValidate, component.isActivate);
    expect(component.is1).toBe(tab[0]);
    expect(component.is2).toBe(tab[1]);
    expect(component.is3).toBe(tab[2]);
    expect(component.is4).toBe(tab[3]);
    expect(component.isActivate).toBe(tab[4]);
    expect(component.previousNb).toBe(tab[5]);
  });

  it('should respondM', () => {
    component.clickReponseM(0);
    let tab = component.questionService.clickReponseM(0, component.previousNb, component.is1, component.is2, component.is3, component.is4, component.isValidate, component.isActivate);
    expect(component.is1).toBe(tab[0]);
    expect(component.is2).toBe(tab[1]);
    expect(component.is3).toBe(tab[2]);
    expect(component.is4).toBe(tab[3]);
  });

  it('should go to next question', (done)=>{
    spyOn(component, 'sauvegarder');
    component.questionSuivante();
    let tab = component.questionService.questionSuivante(0, true, 1);
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
    fixture.whenStable().then(() => {
      expect(component.sauvegarder).toHaveBeenCalled();
      done();
    });
  });

  it('should start a new session', (done) =>{
    spyOn(component, 'sauvegarder');
    component.nouvellePartie();
    let tab = component.questionService.nouvellePartie();

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
    expect(component.nbRepJuste).toBe(tab[8]);
    expect(component.nbQuestion).toBe(tab[9]);
    expect(component.isFinish).toBe(tab[10]);
    fixture.whenStable().then(() => {
      expect(component.sauvegarder).toHaveBeenCalled();
      done();
    });
  });

  it('should save', ()=>{
    component.sauvegarder();
    expect(localStorage.getItem('isValidate-J2')).toBe(component.isValidate.toString());
    expect(localStorage.getItem('colorQ1-J2')).toBe(component.colorQ1);
    expect(localStorage.getItem('colorQ2-J2')).toBe(component.colorQ2);
    expect(localStorage.getItem('colorQ3-J2')).toBe(component.colorQ3);
    expect(localStorage.getItem('colorQ4-J2')).toBe(component.colorQ4);
    expect(localStorage.getItem('nbRepJuste-J2')).toBe(component.nbRepJuste.toString());
    expect(localStorage.getItem('nbQuestion-J2')).toBe(component.nbQuestion.toString());
    expect(localStorage.getItem('isFinish-J2')).toBe(component.isFinish.toString());
    expect(localStorage.getItem('isValidate-J2')).toBe(component.isValidate.toString());
  });

  it('should load', () =>{
    component.charger();
    expect(component.isActivate).toBe(false);
    expect(component.isValidate).toBe(false);
    expect(component.isFinish).toBe(false);
    expect(component.colorQ1).toBe('nothing');
    expect(component.colorQ2).toBe('nothing');
    expect(component.colorQ3).toBe('nothing');
    expect(component.colorQ4).toBe('nothing');
    expect(component.previousNb).toBe(0);
    expect(component.nbQuestion).toBe(1);
    expect(component.nbRepJuste).toBe(0);
  });

  it('should generate level', () => {
    component.genererNiveau();
    expect(component.exit).toEqual([false,false,false,false]);

    expect(component.width_lvl1).toBe(5);
    expect(component.hight_lvl1).toBe(11) ;
    expect(component.plateau).toEqual([ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                                        [ 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0 ],
                                        [ 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0 ],
                                        [ 0, 2, 0, 2, 0, 2, 2, 2, 0, 2, 0 ],
                                        [ 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0 ] ,
                                        [ 5, 0, 0, 2, 0, 1, 0, 2, 0, 0, 0 ] ,
                                        [ 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0 ] ,
                                        [ 0, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0 ] ,
                                        [ 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0 ] ,
                                        [ 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0 ] ,
                                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ]) ;

  })
});
